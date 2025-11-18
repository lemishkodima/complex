"use client";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import "./form.scss";
import { formSchema } from "@/lib/utils/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input/Input";
import SelectComponent from "@/components/ui/select-component/SelectComponent";
import SelectList from "../select-list/SelectList";
import FileUpload from "../file-upload/FileUpload";
import { useEffect, useState } from "react";
import RoundedButton from "@/components/ui/rounded-btn2/RoundedButton";
import { useTranslation } from "react-i18next";
import NavLink from "@/components/ui/nav-link/NavLink";
import { scrollTo } from "@/lib/utils/scrollTo";
import DateTimeSelector from "@/components/ui/date-time-selector/DateTimeSelector";

// ↓↓↓ ДОДАНО ТІЛЬКИ ДЛЯ ПАДЕЛУ ↓↓↓
import DateOnlySelector from "@/components/ui/date-time-selector/DateOnlySelector";
import AvailabilityPicker from "@/components/booking/AvailabilityPicker";
// ↑↑↑ ДОДАНО ТІЛЬКИ ДЛЯ ПАДЕЛУ ↑↑↑

// Тип даних форми, виведений з вашої Zod-схеми
type FormData = z.infer<typeof formSchema>;

const Form = () => {
  const { t } = useTranslation("contact");

  // Опції для SelectList (НЕ плутати з обраними interest з форми)
  const interestsOptions = [
    t("Branding"),
    t("E-Commerce"),
    t("UI/UX Design"),
    t("Web Design"),
    t("Web Development"),
    t("Other"),
    "Паддл теніс", // ← ДОДАЙТЕ цю опцію, якщо її немає в i18n
  ];

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
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
      // ↓↓↓ ДОДАНО ТІЛЬКИ ДЛЯ ПАДЕЛУ ↓↓↓
      padelDate: null,
      padelTime: null, // "HH:mm"
      // ↑↑↑ ДОДАНО ТІЛЬКИ ДЛЯ ПАДЕЛУ ↑↑↑
    },
  });

  // ↓↓↓ ДОДАНО ТІЛЬКИ ДЛЯ ПАДЕЛУ ↓↓↓
  const selectedInterests = watch("interest") || [];
  const isPadelSelected =
    Array.isArray(selectedInterests) &&
    (selectedInterests.includes("Паддл теніс") || selectedInterests.includes("Padel"));

  const padelDate = watch("padelDate");
  // При зміні дати скидаємо час, щоб уникати невалідної комбінації
  useEffect(() => {
    setValue("padelTime", null, { shouldValidate: true });
  }, [padelDate, setValue]);
  // ↑↑↑ ДОДАНО ТІЛЬКИ ДЛЯ ПАДЕЛУ ↑↑↑

  const submit: SubmitHandler<FormData> = async (values) => {
    setIsSubmitting(true);

    // 1) Логування даних, отриманих з RHF (для налагодження)
    console.log("RHF values before submit:", values, values.preferredDateTime);

    // ↓↓↓ ДОДАНО ТІЛЬКИ ДЛЯ ПАДЕЛУ (бронювання перед надсиланням) ↓↓↓
    if (isPadelSelected) {
      const d = values.padelDate instanceof Date ? values.padelDate : null;
      const time = values.padelTime; // "HH:mm"

      if (!d || !time) {
        // Zod підсвітить помилки, просто зупиняємо сабміт
        setIsSubmitting(false);
        return;
      }

      const date = d.toISOString().slice(0, 10); // YYYY-MM-DD
      const startTime = time; // "HH:mm"

      try {
        const bookRes = await fetch("/api/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date,
            startTime,
            courtId: "1",
            name: values.name,
            phone: values.phone,
            email: values.email,
            notes: values.projectDetails,
          }),
        });
        const bookJson = await bookRes.json();
        if (!bookRes.ok || !bookJson.ok) {
          console.error("Помилка бронювання паделу:", bookJson.error);
          setIsSubmitting(false);
          return;
        }
      } catch (e) {
        console.error("Помилка мережі при бронюванні паделу:", e);
        setIsSubmitting(false);
        return;
      }
    }
    // ↑↑↑ ДОДАНО ТІЛЬКИ ДЛЯ ПАДЕЛУ ↑↑↑

    const formDataToSend = new FormData();

    // 2) Обробка поля 'preferredDateTime' (загальний випадок)
    if (values.preferredDateTime instanceof Date) {
      formDataToSend.append(
        "preferredDateTime",
        values.preferredDateTime.toISOString()
      );
    }

    // 3) Обробка інших полів
    // company, preferredDateTime ігноруємо, оскільки вони або оброблені вище, або не потрібні.
    // ↓↓↓ ДОДАЛИ padelDate/padelTime у IGNORED_KEYS, щоб додати їх окремо в зрозумілому форматі ↓↓↓
    const IGNORED_KEYS = new Set([
      "company",
      "preferredDateTime",
      "padelDate",
      "padelTime",
    ]);

    Object.entries(values).forEach(([key, value]) => {
      if (IGNORED_KEYS.has(key) || value == null || value === undefined) {
        return;
      }

      if (key === "interest" && Array.isArray(value)) {
        value.forEach((item) =>
          formDataToSend.append("interest", String(item))
        );
      } else {
        formDataToSend.append(key, String(value));
      }
    });

    // ↓↓↓ ДОДАНО ТІЛЬКИ ДЛЯ ПАДЕЛУ (додаємо акуратно у FormData) ↓↓↓
    if (values.padelDate instanceof Date) {
      formDataToSend.append("padelDate", values.padelDate.toISOString().slice(0, 10)); // YYYY-MM-DD
    }
    if (typeof values.padelTime === "string" && values.padelTime) {
      formDataToSend.append("padelTime", values.padelTime); // "HH:mm"
    }
    // ↑↑↑ ДОДАНО ТІЛЬКИ ДЛЯ ПАДЕЛУ ↑↑↑

    // 4) Обробка файлу
    if (selectedFile) {
      formDataToSend.append("file", selectedFile);
    }

    // 5) Фінальна перевірка FormData (debug)
    console.log("FormData keys:", Array.from(formDataToSend.keys()));
    console.log(
      "preferredDateTime value in FormData (ISO string):",
      formDataToSend.get("preferredDateTime")
    );

    try {
      const response = await fetch("/api/sendToTelegram", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
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
          // ↓↓↓ ДОДАНО ТІЛЬКИ ДЛЯ ПАДЕЛУ ↓↓↓
          padelDate: null,
          padelTime: null,
          // ↑↑↑ ДОДАНО ТІЛЬКИ ДЛЯ ПАДЕЛУ ↑↑↑
        });
      } else {
        console.error(
          "Помилка при відправленні даних. Статус:",
          response.status,
          await response.text().catch(() => "")
        );
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Помилка мережі:", error);
      setIsSubmitting(false);
    }

    if (!isSend) setIsSubmitting(false);
  };

  return (
    <>
      {!isSend ? (
        <form onSubmit={handleSubmit(submit)} className="relative">
          <div className="form" id="form-id">
            <div className="form__firstContainer">
              <Input
                placeholder={t("form.Full Name Placeholder").replace("*", "")}
                label={t("form.Full Name")}
                name="name"
                error={errors?.name}
                register={register}
              />
              <Input
                placeholder={t("form.Email Placeholder").replace("*", "")}
                label={t("form.Email")}
                name="email"
                error={errors?.email}
                register={register}
              />
              <Input
                placeholder={t("form.Phone Placeholder").replace("*", "")}
                label={t("form.Phone")}
                name="phone"
                error={errors?.phone}
                register={register}
              />
            </div>

            <SelectComponent control={control} name="howFind" />

            <SelectList
              name="interest"
              control={control}
              title={t("form.You are interested in")}
              values={interestsOptions}
              selectMany
            />

            {/* Компонент вибору дати та часу (загальний випадок) */}
            <DateTimeSelector
              control={control}
              name="preferredDateTime"
              title={t("form.Date and time")}
            />

            {/* ↓↓↓ ДОДАНО ТІЛЬКИ ДЛЯ ПАДЕЛУ ↓↓↓ */}
            {isPadelSelected && (
              <div className="mt-6 rounded-2xl border p-4">
                <h4 className="font-semibold mb-2">Бронювання Падел-корту</h4>

                {/* Дата для паделу */}
                <DateOnlySelector
                  control={control}
                  name="padelDate"
                  title="Дата для паделу"
                />
                {errors?.padelDate && (
                  <p className="text-red-500 text-sm">
                    {String(errors.padelDate.message)}
                  </p>
                )}

                {/* Час для паделу зі сітки доступних слотів */}
                <Controller
                  control={control}
                  name="padelTime"
                  render={({ field }) => (
                    <AvailabilityPicker
                      courtId="1"
                      selectedDate={
                        padelDate instanceof Date ? (padelDate as Date) : null
                      }
                      selectedTime={
                        typeof field.value === "string" ? field.value : null
                      }
                      onPick={(hhmm) => field.onChange(hhmm)}
                    />
                  )}
                />
                {errors?.padelTime && (
                  <p className="text-red-500 text-sm">
                    {String(errors.padelTime.message)}
                  </p>
                )}
              </div>
            )}
            {/* ↑↑↑ ДОДАНО ТІЛЬКИ ДЛЯ ПАДЕЛУ ↑↑↑ */}

            <Input
              placeholder={t("form.Message Placeholder").replace("*", "")}
              label={t("form.Message")}
              name="projectDetails"
              register={register}
              asTextAria
            />

            <FileUpload
              onFileChange={setSelectedFile}
              selectedFile={selectedFile}
            />
          </div>

          <div>
            <button type="submit" disabled={isSubmitting} className="pt-5">
              <RoundedButton>
                <p>
                  {!isSubmitting
                    ? t("form.Send Request")
                    : t("form.Sending Request")}
                </p>
              </RoundedButton>
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-gold min-h-80 p-10 text-center  text-dark  flex-center flex-col">
          <p className="mb-5 text__medium-20 text-dark text-center">
            {t("Thanks for request")} <br />
            {t("we will contact you")}
          </p>
          <NavLink classes="!text-dark">{t("Back home")}</NavLink>
        </div>
      )}
    </>
  );
};

export default Form;
