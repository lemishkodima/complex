"use client";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { useTranslation } from "react-i18next";

type Availability = {
  ok: boolean;
  date: string;
  courtId: string;
  slotMinutes: number;
  busy: string[];
  available: string[];
};

export default function AvailabilityPicker({
  courtId = "1",
  selectedDate,
  selectedTime,
  onPick,
}: {
  courtId?: string | number;
  selectedDate: Date | null;
  selectedTime: string | null;
  onPick: (timeHHmm: string) => void;
}) {
  const { t } = useTranslation("contact");
  const [data, setData] = useState<Availability | null>(null);
  const [loading, setLoading] = useState(false);

  const dateStr = useMemo(
    () => (selectedDate ? format(selectedDate, "yyyy-MM-dd") : null),
    [selectedDate]
  );

  useEffect(() => {
    if (!dateStr) {
      console.log("[AvailabilityPicker] No date selected, reset data");
      setData(null);
      return;
    }

    const courtIdStr = String(courtId ?? "1");
    console.log("[AvailabilityPicker] Fetching availability:", {
      dateStr,
      courtId: courtIdStr,
    });

    setLoading(true);
    fetch(`/api/availability?date=${dateStr}&courtId=${courtIdStr}`)
      .then(async (r) => {
        const text = await r.text();
        console.log(
          "[AvailabilityPicker] /api/availability raw response:",
          r.status,
          text
        );
        try {
          const json = JSON.parse(text);
          console.log("[AvailabilityPicker] Parsed availability JSON:", json);
          setData(json);
        } catch (e) {
          console.error(
            "[AvailabilityPicker] JSON parse error for /api/availability:",
            e
          );
          setData(null);
        }
      })
      .catch((e) => {
        console.error(
          "[AvailabilityPicker] Network error while fetching availability:",
          e
        );
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [dateStr, courtId]);

  if (!selectedDate)
    return <p className="text-sm text-gray-400">{t("contact.form.select.time")}</p>;
  if (loading) return <p className="text-sm">{t("contact.form.loading.availability")}</p>;
  if (!data?.ok)
    return (
      <p className="text-sm text-red-500">
        {t("contact.form.unable.date")}
      </p>
    );

  const label = format(selectedDate, "d MMMM yyyy (EEEE)", { locale: uk });

  return (
    <div className="mt-3">
      <div className="mb-2 font-medium">{t("contact.form.available.time")} {label}:</div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
        {data.available.map((time) => {
          const isActive = selectedTime === time;
          return (
            <button
              key={time}
              className={`px-3 py-2 rounded-xl border hover:shadow-sm ${
                isActive ? "border-black" : ""
              }`}
              onClick={() => onPick(time)}
            >
              {time}
            </button>
          );
        })}
        {data.busy.map((time) => (
          <button
            key={time}
            className="px-3 py-2 rounded-xl border bg-gray-100"
            disabled
          >
            {time} {t("contact.form.busy.time")}
          </button>
        ))}
      </div>
    </div>
  );
}
