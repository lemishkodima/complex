import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Тут вже НЕ використовуємо STRAPI_URL / токен на фронті.
// Усе ходить через /api/translations на Next.

console.log("[i18n] Initializing i18next…");

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false, // додаткові логи все одно є нижче

    interpolation: {
      escapeValue: false,
    },

    backend: {
      // 👇 основне місце магії
      loadPath: (lngs: string | string[], namespaces: string | string[]) => {
        const lng = Array.isArray(lngs) ? lngs[0] : lngs;
        const ns = Array.isArray(namespaces) ? namespaces[0] : namespaces;

        // мапимо ua → uk для Strapi
        const strapiLocale = lng === "ua" ? "uk" : lng;

        const url = `/api/translations?locale=${strapiLocale}&pagination[limit]=1000`;

        console.log("[i18n] backend.loadPath called", {
          lng,
          ns,
          strapiLocale,
          url,
        });

        return url;
      },

      // залишаємо, але вже без токенів — /api/translations сам додасть хедери на сервері
      customHeaders: () => {
        console.log("[i18n] backend.customHeaders (client) – no auth headers");
        return {};
      },

      parse: (data: any) => {
        let json: any;

        try {
          json = typeof data === "string" ? JSON.parse(data) : data;
        } catch (e) {
          console.error("[i18n] backend.parse – JSON.parse error:", e);
          return {};
        }

        const items: any[] = Array.isArray(json?.data) ? json.data : [];

        console.log("[i18n] backend.parse – received items:", {
          count: items.length,
          sample: items[0]
            ? { id: items[0].id, key: items[0].key, valuePreview: String(items[0].value).slice(0, 40) }
            : null,
        });

        const resources: Record<string, string> = {};

        for (const item of items) {
          if (item?.key && typeof item.value === "string") {
            resources[item.key] = item.value;
          }
        }

        console.log("[i18n] backend.parse – mapped keys:", {
          count: Object.keys(resources).length,
          firstKeys: Object.keys(resources).slice(0, 5),
        });

        return resources;
      },
    },

    ns: ["home", "about", "contact", "projects", "translation"],
    defaultNS: "translation",
  });

export default i18n;
