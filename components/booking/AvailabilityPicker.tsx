"use client";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

type Availability = {
  ok: boolean;
  date: string;        // YYYY-MM-DD
  courtId: string;
  slotMinutes: number;
  busy: string[];      // ["08:00", ...]
  available: string[]; // ["09:00", ...]
};

export default function AvailabilityPicker({
  courtId = "1",
  selectedDate,
  selectedTime,                 // ← ДОДАНО: поточно обраний час ("HH:mm") або null
  onPick,                       // ← ТЕПЕР: (timeHHmm: string) => void
}: {
  courtId?: string | number;
  selectedDate: Date | null;
  selectedTime: string | null;
  onPick: (timeHHmm: string) => void;
}) {
  const [data, setData] = useState<Availability | null>(null);
  const [loading, setLoading] = useState(false);

  const dateStr = useMemo(
    () => (selectedDate ? format(selectedDate, "yyyy-MM-dd") : null),
    [selectedDate]
  );

  useEffect(() => {
    if (!dateStr) { setData(null); return; }
    setLoading(true);
    fetch(`/api/availability?date=${dateStr}&courtId=${courtId}`)
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
    // Скинути вибір часу при зміні дати — це краще робити в батьку (форма)
    // Тут лише підвантажуємо слоти.
  }, [dateStr, courtId]);

  if (!selectedDate) return <p className="text-sm text-gray-400">Оберіть дату…</p>;
  if (loading) return <p className="text-sm">Завантаження доступності…</p>;
  if (!data?.ok) return <p className="text-sm text-red-500">Не вдалося отримати доступність.</p>;

  const label = format(selectedDate, "d MMMM yyyy (EEEE)", { locale: uk });

  return (
    <div className="mt-3">
      <div className="mb-2 font-medium">Вільні години на {label}:</div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
        {data.available.map((time) => {
          const isActive = selectedTime === time;
          return (
            <button
              key={time}
              className={`px-3 py-2 rounded-xl border hover:shadow-sm ${isActive ? "border-black" : ""}`}
              onClick={() => onPick(time)}
            >
              {time}
            </button>
          );
        })}
        {data.busy.map((time) => (
          <button key={time} className="px-3 py-2 rounded-xl border bg-gray-100" disabled>
            {time} зайнято
          </button>
        ))}
      </div>
    </div>
  );
}