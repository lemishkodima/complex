import { z } from "zod";

export const formSchema = z
  .object({
    name: z.string().min(1, "Вкажіть імʼя"),
    email: z.string().email("Некоректний email"),
    phone: z.string().min(7, "Некоректний номер"),
    projectDetails: z.string().optional(),
    howFind: z.string().optional(),
    interest: z.array(z.string()).default([]),

    // Дата+час — використовуємо тільки для паделу
    preferredDateTime: z.date().nullable().optional(),

    // Тривалість для паделу у хвилинах (як string "30", "60"...)
    padelDurationMinutes: z.string().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    const interests = Array.isArray(data.interest) ? data.interest : [];

    const isPadel = interests.some(
      (item) =>
        typeof item === "string" &&
        (item.toLowerCase().includes("padel") || item.includes("Паддл"))
    );

    if (isPadel) {
      // обовʼязково має бути дата+час
      if (
        !data.preferredDateTime ||
        !(data.preferredDateTime instanceof Date) ||
        isNaN(data.preferredDateTime.getTime())
      ) {
        ctx.addIssue({
          path: ["preferredDateTime"],
          code: z.ZodIssueCode.custom,
          message: "Оберіть дату та час для паделу",
        });
      }

      // обовʼязково має бути тривалість
      const durStr = data.padelDurationMinutes;
      const durNum = durStr ? Number(durStr) : NaN;

      if (!durStr || !durNum || Number.isNaN(durNum)) {
        ctx.addIssue({
          path: ["padelDurationMinutes"],
          code: z.ZodIssueCode.custom,
          message: "Оберіть тривалість бронювання",
        });
      }
    }
  });

export type FormSchema = z.infer<typeof formSchema>;
