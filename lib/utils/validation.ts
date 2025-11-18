// lib/utils/validation.ts
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Вкажіть імʼя"),
  email: z.string().email("Некоректний email"),
  phone: z.string().min(7, "Некоректний номер"),
  projectDetails: z.string().optional(),
  howFind: z.string().optional(),
  interest: z.array(z.string()).default([]),

  // Загальний бажаний час для інших послуг (якщо використовуєте)
  preferredDateTime: z.date().nullable().optional(),

  // Падел
  padelDate: z.date().nullable().optional(),
  padelTime: z.string().nullable().optional(), // ← ДОДАНО ("HH:mm")
  // padelPreferredDateTime при такому підході не потрібний
})
.superRefine((data, ctx) => {
  const isPadel = data.interest?.includes("Паддл теніс"); // або "Padel"

  if (isPadel) {
    if (!data.padelDate) {
      ctx.addIssue({ path: ["padelDate"], code: z.ZodIssueCode.custom, message: "Оберіть дату для паделу" });
    }
    if (!data.padelTime) {
      ctx.addIssue({ path: ["padelTime"], code: z.ZodIssueCode.custom, message: "Оберіть час для паделу" });
    } else if (!/^\d{2}:\d{2}$/.test(data.padelTime)) {
      ctx.addIssue({ path: ["padelTime"], code: z.ZodIssueCode.custom, message: "Невірний формат часу (очікується HH:mm)" });
    }
  }
});

export type FormSchema = z.infer<typeof formSchema>;
