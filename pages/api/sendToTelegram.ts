import type { NextApiRequest, NextApiResponse } from "next";
import { Files, IncomingForm, File } from "formidable";
import FormData from "form-data";
import fetch from "node-fetch";
import fs from "fs";

// Мапування технічних ключів форми на читабельні українські назви для Telegram
const FIELD_NAMES_UK: Record<string, string> = {
    name: "Ім'я",
    email: "Email",
    phone: "Номер телефону",
    projectDetails: "Додаткові побажання",
    howFind: "Звідки дізнались",
    interest: "Послуги",
    preferredDateTime: "Бажана дата/час",
};

export const config = {
  api: {
    // Вказуємо Next.js, що ми будемо парсити тіло запиту самостійно (formidable)
    bodyParser: false,
  },
};

type FormFields = Record<string, any>;

/**
 * Допоміжна функція для форматування ISO-рядка дати та часу у читабельний формат.
 */
function formatDateTimeForTelegram(isoString: string | string[]): string {
    const value = Array.isArray(isoString) ? isoString[0] : isoString;
    if (!value || typeof value !== 'string') return '';
    try {
        const date = new Date(value);
        if (isNaN(date.getTime())) return value;
        
        // Форматування: ДД.ММ.РРРР ГГ:ХХ
        return date.toLocaleString('uk-UA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, 
            timeZone: 'UTC', // Припускаємо, що ISO-рядок є UTC
        });
    } catch (e) {
        console.error("Помилка форматування дати:", e);
        return value; 
    }
}

/**
 * Створює відформатоване повідомлення/підпис для Telegram, використовуючи українські назви.
 */
function createTelegramMessage(fields: FormFields): string {
    let message = '';

    // Встановлюємо порядок полів у повідомленні
    const ORDERED_KEYS = ["name", "phone", "email", "preferredDateTime", "howFind", "interest", "projectDetails"];
    const processedKeys = new Set<string>();
    
    // 1. Обробка полів у заданому порядку
    for (const key of ORDERED_KEYS) {
        const value = fields[key];
        if (value == null) continue;
        
        const readableKey = FIELD_NAMES_UK[key] || key;
        
        // Спеціальна обробка "preferredDateTime"
        if (key === 'preferredDateTime') {
            const formattedDate = formatDateTimeForTelegram(value);
            if (formattedDate) {
                message += `*${readableKey}*: ${formattedDate}\n`;
            }
        
        // Спеціальна обробка "interest" (може бути масивом)
        } else {
            const displayValue = Array.isArray(value) ? value.join(', ') : value;
            message += `*${readableKey}*: ${displayValue}\n`;
        }
        processedKeys.add(key);
    }
    
    // 2. Обробка решти полів (якщо такі є, крім company)
    Object.entries(fields).forEach(([key, value]) => {
        if (processedKeys.has(key) || value == null || key === 'company' || key === 'file') return;

        const readableKey = FIELD_NAMES_UK[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        const displayValue = Array.isArray(value) ? value.join(', ') : value;
        
        message += `*${readableKey}*: ${displayValue}\n`;
    });
    
    return message.trim();
}

/**
 * Готує дані форми у форматі JSON для відправки до Google Sheets.
 */
function prepareDataForSheet(fields: FormFields): Record<string, any> {
    const data: Record<string, any> = {};

    Object.entries(fields).forEach(([key, value]) => {
        // Ігноруємо службові поля
        if (key === 'file' || key === 'company') return;

        let finalValue = value;
        
        // Якщо поле приходить як масив (наприклад, interest), залишаємо його масивом
        if (Array.isArray(value)) {
             // App Script у більшості випадків об'єднає елементи масиву в один рядок
             finalValue = value.join(', ');
        } else if (typeof finalValue === 'string') {
             finalValue = finalValue.trim();
        }

        data[key] = finalValue;
    });
    
    // Додаємо часову мітку відправки (корисно, якщо Apps Script не додає її сам)
    data.timestamp = new Date().toISOString(); 

    return data;
}

/**
 * Відправляє дані форми у Google Таблицю через Apps Script Webhook.
 */
async function sendToGoogleSheet(data: Record<string, any>) {
    const WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!WEBHOOK_URL) {
        console.warn("Змінна GOOGLE_SHEET_WEBHOOK_URL не встановлена. Пропуск відправки в Google Sheets.");
        return { ok: true }; 
    }
    
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        
        const responseText = await response.text();
        // Перевіряємо статус відповіді та тіло на помилки від Apps Script
        if (!response.ok || responseText.includes('"result":"error"')) {
            console.error("Помилка відправки в Google Sheet:", response.status, responseText);
            return { ok: false, error: responseText };
        }
        
        console.log("Дані успішно відправлені в Google Sheet.");
        return { ok: true };
    } catch (error) {
        console.error("Мережева помилка при відправці в Google Sheet:", error);
        return { ok: false, error: error };
    }
}

// ---
// TELEGRAM SENDER FUNCTIONS
// ---

async function sendToTelegram(fields: FormFields) {
  const message = createTelegramMessage(fields);
  
  const telegramApi = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  return fetch(telegramApi, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    }),
  });
}

async function sendFileToTelegram(file: File, fields: FormFields) {
  const formData = new FormData();
  formData.append("chat_id", process.env.TELEGRAM_CHAT_ID);
  
  formData.append("document", fs.createReadStream(file.filepath));

  const caption = createTelegramMessage(fields);
  formData.append("caption", caption);
  formData.append("parse_mode", 'Markdown');

  const telegramApi = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`;

  return fetch(telegramApi, {
    method: "POST",
    body: formData,
    headers: formData.getHeaders(),
  });
}


// ---
// MAIN HANDLER
// ---

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const form = new IncomingForm();
  form.parse(req, async (err, fields: FormFields, files: Files) => {
    if (err) {
      console.error("Помилка парсингу форми (Formidable):", err);
      res.status(500).json({ message: "Error parsing form data" });
      return;
    }

    try {
      // 1. Підготовка даних та відправка до Google Sheets
      const sheetData = prepareDataForSheet(fields);
      // Запускаємо відправку в Sheets. Чекаємо відповіді, але її помилка не блокуватиме Telegram.
      const sheetResponse = await sendToGoogleSheet(sheetData);
      
      // Логуємо отримані поля для налагодження
      console.log("Поля, отримані від Formidable:", fields);

      // 2. Відправка до Telegram
      const fileToSend =
        files.file instanceof Array ? files.file[0] : files.file;

      const telegramResponse =
        fileToSend && fileToSend.filepath
          ? await sendFileToTelegram(fileToSend, fields)
          : await sendToTelegram(fields);

      // 3. Відповідь клієнту
      if (telegramResponse.ok) {
        if (!sheetResponse.ok) {
            console.warn("Telegram успішно, але Google Sheet провалився. Перевірте логи.");
        }
        res.status(200).json({ message: "Дані успішно відправлено" });
      } else {
        const errorText = await telegramResponse.text().catch(() => "Невідома помилка Telegram");
        console.error("Помилка API Telegram:", telegramResponse.status, errorText);
        res.status(500).json({ message: "Помилка відправки в Telegram", details: errorText });
      }
    } catch (error) {
      console.error("Серверна помилка при відправці:", error);
      res.status(500).json({ message: "Серверна помилка", error });
    }
  });
}
