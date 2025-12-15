"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./form.scss";
import { formSchema } from "@/lib/utils/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input/Input";
import SelectComponent from "@/components/ui/select-component/SelectComponent";
import SelectList from "../select-list/SelectList";
import RoundedButton from "@/components/ui/rounded-btn2/RoundedButton";
import { useTranslation } from "react-i18next";
import NavLink from "@/components/ui/nav-link/NavLink";
import { scrollTo } from "@/lib/utils/scrollTo";
import DateTimeSelector from "@/components/ui/date-time-selector/DateTimeSelector";

type FormData = z.infer<typeof formSchema>;

const Form = () => {
  const { t } = useTranslation("contact");

  // Лейбл паделу (щоб по ньому визначати вибір)
  const padelLabel = t("contact.interests.padelTennis");

  const interestsOptions = [
    t("contact.interests.accommodation"),
    t("contact.interests.tennisCourt"),
    padelLabel,
    t("contact.interests.gym"),
    t("contact.interests.spa"),
    t("contact.interests.other"),
  ];

  // опції тривалості (в хвилинах) з локалізацією
  const padelDurationOptions = [
    { value: "30", label: t("contact.form.padelDuration.30") },
    { value: "60", label: t("contact.form.padelDuration.60") },
    { value: "90", label: t("contact.form.padelDuration.90") },
    { value: "120", label: t("contact.form.padelDuration.120") },
    { value: "150", label: t("contact.form.padelDuration.150") },
    { value: "180", label: t("contact.form.padelDuration.180") },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectDetails: "",
      preferredDateTime: null,
      howFind: undefined,
      interest: [],
      padelDurationMinutes: null,
    },
  });

  // Інтереси з форми (для UI — показати/сховати календар + селект тривалості)
  const selectedInterests = watch("interest") || [];
  const isPadelSelectedUI =
    Array.isArray(selectedInterests) && selectedInterests.includes(padelLabel);

  const submit: SubmitHandler<FormData> = async (values) => {
    console.log("=== SUBMIT START ===");
    console.log("RHF raw values:", values);

    setIsSubmitting(true);

    // Для payload окремо рахуємо, щоб не залежати від watch
    const isPadelSelectedPayload =
      Array.isArray(values.interest) &&
      values.interest.some(
        (item) =>
          typeof item === "string" &&
          (item.toLowerCase().includes("padel") || item.includes("Паддл"))
      );

    console.log("isPadelSelected UI:", isPadelSelectedUI);
    console.log("isPadelSelected payload:", isPadelSelectedPayload);

    let bookingOk = true;
    let bookingErrorMessage: string | null = null;
    let durationMinutes: number | null = null;

    // 🔹 Якщо падел — потрібні дата/час + тривалість → бронюємо слот через /api/book
    if (isPadelSelectedPayload) {
      const dt =
        values.preferredDateTime instanceof Date
          ? values.preferredDateTime
          : null;
      const durStr = values.padelDurationMinutes ?? null;
      const durNum = durStr ? Number(durStr) : NaN;

      console.log(
        "Padel selected. preferredDateTime:",
        values.preferredDateTime
      );
      console.log("Padel Date object:", dt);
      console.log("Padel duration raw:", durStr, "parsed:", durNum);

      if (!dt) {
        console.warn(
          "Padel selected, але preferredDateTime відсутній/невалідний. Перериваємо сабміт."
        );
        setIsSubmitting(false);
        return;
      }

      if (!durStr || !durNum || Number.isNaN(durNum)) {
        console.warn(
          "Padel selected, але тривалість не валідна. Перериваємо сабміт."
        );
        setIsSubmitting(false);
        return;
      }

      durationMinutes = durNum;

      // Формуємо date, startTime, endTime
      const start = dt;
      const startYear = start.getFullYear();
      const startMonth = String(start.getMonth() + 1).padStart(2, "0");
      const startDay = String(start.getDate()).padStart(2, "0");
      const startHours = String(start.getHours()).padStart(2, "0");
      const startMinutes = String(start.getMinutes()).padStart(2, "0");

      const date = `${startYear}-${startMonth}-${startDay}`; // YYYY-MM-DD
      const startTime = `${startHours}:${startMinutes}`; // HH:mm

      const end = new Date(start.getTime() + durNum * 60_000);
      const endHours = String(end.getHours()).padStart(2, "0");
      const endMinutes = String(end.getMinutes()).padStart(2, "0");
      const endTime = `${endHours}:${endMinutes}`; // HH:mm

      console.log("Booking padel with payload:", {
        date,
        startTime,
        endTime,
        durationMinutes: durNum,
        courtId: "1",
        name: values.name,
        phone: values.phone,
        email: values.email,
        notes: values.projectDetails,
      });

      try {
        const bookRes = await fetch("/api/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date,
            startTime,
            endTime,
            durationMinutes: durNum,
            courtId: "1",
            name: values.name,
            phone: values.phone,
            email: values.email,
            notes: values.projectDetails,
          }),
        });

        console.log("Response from /api/book status:", bookRes.status);

        let rawText: string | null = null;
        try {
          rawText = await bookRes.text();
          console.log("Raw /api/book response text:", rawText);
        } catch (e) {
          console.error("Не вдалося прочитати текст відповіді /api/book:", e);
        }

        let bookJson: any = null;
        if (rawText) {
          try {
            bookJson = JSON.parse(rawText);
          } catch (e) {
            console.error("Не вдалося розпарсити JSON від /api/book:", e);
          }
        }

        console.log("Parsed /api/book JSON:", bookJson);

        if (!bookRes.ok || bookJson?.ok === false) {
          bookingOk = false;
          bookingErrorMessage =
            bookJson?.error ??
            `HTTP ${bookRes.status} ${bookRes.statusText || ""}`.trim();
          console.error("Помилка бронювання паделу:", bookingErrorMessage);
          // ❗️НЕ робимо return – форму все одно шлемо в Telegram/Sheets
        }
      } catch (e: any) {
        bookingOk = false;
        bookingErrorMessage = String(e);
        console.error("Помилка мережі при бронюванні паделу:", e);
        // ❗️Теж не return – форму все одно шлемо
      }
    } else {
      // Для інших послуг дата/час і тривалість не потрібні
      console.log(
        "Padel НЕ обраний. Очищаємо preferredDateTime та padelDurationMinutes."
      );
      values.preferredDateTime = null;
      values.padelDurationMinutes = null;
    }

    console.log("Values перед формуванням FormData:", values);

    // --- Формуємо FormData для /api/sendToTelegram ---
    const formDataToSend = new FormData();

    // 1) preferredDateTime + похідні (тільки якщо є)
    if (values.preferredDateTime instanceof Date) {
      const dt = values.preferredDateTime;
      const iso = dt.toISOString();
      console.log("Appending preferredDateTime ISO to FormData:", iso);
      formDataToSend.append("preferredDateTime", iso);

      const year = dt.getFullYear();
      const month = String(dt.getMonth() + 1).padStart(2, "0");
      const day = String(dt.getDate()).padStart(2, "0");
      const hours = String(dt.getHours()).padStart(2, "0");
      const minutes = String(dt.getMinutes()).padStart(2, "0");

      const padelDate = `${year}-${month}-${day}`;
      const padelTimeFrom = `${hours}:${minutes}`;

      let padelTimeTo = padelTimeFrom;
      if (durationMinutes != null) {
        const end = new Date(dt.getTime() + durationMinutes * 60_000);
        const eh = String(end.getHours()).padStart(2, "0");
        const em = String(end.getMinutes()).padStart(2, "0");
        padelTimeTo = `${eh}:${em}`;
      }

      console.log("Appending padelDate / padelTimeFrom / padelTimeTo:", {
        padelDate,
        padelTimeFrom,
        padelTimeTo,
        durationMinutes,
      });

      formDataToSend.append("padelDate", padelDate);
      formDataToSend.append("padelTimeFrom", padelTimeFrom);
      formDataToSend.append("padelTimeTo", padelTimeTo);

      if (durationMinutes != null) {
        formDataToSend.append(
          "padelDurationMinutes",
          String(durationMinutes)
        );
      }
    }

    // 2) Інші поля (без службових)
    const IGNORED_KEYS = new Set([
      "company",
      "preferredDateTime", // вже додали окремо
      "padelDurationMinutes", // теж додаємо окремо вище
    ]);

    Object.entries(values).forEach(([key, value]) => {
      if (IGNORED_KEYS.has(key) || value == null || value === undefined) {
        return;
      }

      if (key === "interest" && Array.isArray(value)) {
        console.log("Appending interest array to FormData:", value);
        value.forEach((item) =>
          formDataToSend.append("interest", String(item))
        );
      } else {
        console.log(`Appending field ${key} to FormData:`, value);
        formDataToSend.append(key, String(value));
      }
    });

    // Debug: показати всі ключі FormData
    const formDataDebug: Record<string, any> = {};
    formDataToSend.forEach((value, key) => {
      formDataDebug[key] = value;
    });
    console.log("Final FormData snapshot:", formDataDebug);

    try {
      console.log("Sending POST /api/sendToTelegram ...");
      const response = await fetch("/api/sendToTelegram", {
        method: "POST",
        body: formDataToSend,
      });

      console.log("Response from /api/sendToTelegram status:", response.status);

      if (response.ok) {
        let respText: string | null = null;
        try {
          respText = await response.text();
        } catch (e) {
          console.error(
            "Не вдалося прочитати текст відповіді /api/sendToTelegram:",
            e
          );
        }
        console.log(
          "Success response body from /api/sendToTelegram:",
          respText
        );

        scrollTo("form-id");
        setIsSend(true);

        // Очищення форми після успішної відправки
        reset({
          name: "",
          email: "",
          phone: "",
          projectDetails: "",
          howFind: undefined,
          interest: [],
          preferredDateTime: null,
          padelDurationMinutes: null,
        });

        if (!bookingOk && bookingErrorMessage) {
          console.warn(
            "Форму відправлено, але бронювання паделу не вдалося:",
            bookingErrorMessage
          );
        }
      } else {
        const errorText = await response.text().catch(() => "");
        console.error(
          "Помилка при відправленні даних у /api/sendToTelegram. Статус:",
          response.status,
          "Тіло відповіді:",
          errorText
        );
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(
        "Помилка мережі при відправці у /api/sendToTelegram:",
        error
      );
      setIsSubmitting(false);
    }

    if (!isSend) {
      setIsSubmitting(false);
    }

    console.log("=== SUBMIT END ===");
  };

  return (
    <>
      {!isSend ? (
        <form onSubmit={handleSubmit(submit)} className="relative">
          <div className="form" id="form-id">
            <div className="form__firstContainer">
              <Input
                placeholder={t("contact.form.fullName.placeholder").replace(
                  "*",
                  ""
                )}
                label={t("contact.form.fullName.label")}
                name="name"
                error={errors?.name}
                register={register}
              />
            </div>

            <div className="form__firstContainer">
              <Input
                placeholder={t("contact.form.email.placeholder").replace(
                  "*",
                  ""
                )}
                label={t("contact.form.email.label")}
                name="email"
                error={errors?.email}
                register={register}
              />
              <Input
                placeholder={t("contact.form.phone.placeholder").replace(
                  "*",
                  ""
                )}
                label={t("contact.form.phone.label")}
                name="phone"
                error={errors?.phone}
                register={register}
              />
            </div>

            <SelectComponent control={control} name="howFind" />

            <SelectList
              name="interest"
              control={control}
              title={t("contact.form.interest.label")}
              values={interestsOptions}
              selectMany
            />

            {/* Календар + тривалість показуємо ТІЛЬКИ для паделу */}
            {isPadelSelectedUI && (
              <>
                <div className="date-time-row">
                  {/* Ліва частина — дата+час */}
                  <DateTimeSelector
                    control={control}
                    name="preferredDateTime"
                    title={t("contact.form.duration.label")}
                  />

                  {/* Права частина — тривалість у тому ж стилі */}
                  <div className="date-time-selector date-time-selector--duration">
                    <label className="date-time-selector__title">
                      {t("contact.form.duration.reservation")}
                    </label>
                    <select
                      className="date-time-selector__input date-time-selector__input--select"
                      {...register("padelDurationMinutes")}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        {t("contact.form.duration.select")}
                      </option>
                      {padelDurationOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Помилки під блоком */}
                {errors?.preferredDateTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {String(errors.preferredDateTime.message)}
                  </p>
                )}
                {errors?.padelDurationMinutes && (
                  <p className="text-red-500 text-sm mt-1">
                    {String(errors.padelDurationMinutes.message)}
                  </p>
                )}
              </>
            )}

            <Input
              placeholder={t("contact.form.message.placeholder").replace(
                "*",
                ""
              )}
              label={t("contact.form.message.label")}
              name="projectDetails"
              register={register}
              asTextAria
            />
          </div>

          <div>
            <button type="submit" disabled={isSubmitting} className="pt-5">
              <RoundedButton>
                <p>
                  {!isSubmitting
                    ? t("contact.form.submit.label")
                    : t("contact.form.submit.loading")}
                </p>
              </RoundedButton>
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-gold min-h-80 p-10 text-center text-dark flex-center flex-col">
          <p className="mb-5 text__medium-20 text-dark text-center">
            {t("contact.success.title")} <br />
            {t("contact.success.subtitle")}
          </p>
          <NavLink classes="!text-dark">
            {t("contact.success.backHomeCta")}
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Form;
