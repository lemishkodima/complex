"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next"


import "react-datepicker/dist/react-datepicker.css";
import "./DateTimeSelector.scss";

type Availability = {
  ok: boolean;
  date: string;        // YYYY-MM-DD
  courtId: string;
  slotMinutes: number;
  busy: string[];      // ["09:00", "09:30", ...]
  available: string[]; // ["08:00", "08:30", ...]
};

interface DateTimeSelectorProps {
  control: any;
  name: string;
  title: string;
  courtId?: string | number;
  /**
   * Тривалість у хвилинах (30, 60, 90...) — використовується,
   * щоб дозволити тільки ті стартові часи, куди повністю влазить інтервал
   */
  durationMinutes?: number | null;
}

/** hh:mm -> хвилини від початку дня */
function hhmmToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** хвилини -> hh:mm */
function minutesToHhmm(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Дата -> hh:mm (локальний час) */
function dateToHhmm(date: Date): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  control,
  name,
  title,
  courtId = "1",
  durationMinutes,
}) => {
  const [selectedDateISO, setSelectedDateISO] = useState<string | null>(null);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("contact");

  // коли змінюється дата (без часу) — тягнемо доступність
  useEffect(() => {
    if (!selectedDateISO) {
      setAvailability(null);
      return;
    }

    const fetchAvailability = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/availability?date=${encodeURIComponent(
            selectedDateISO
          )}&courtId=${encodeURIComponent(String(courtId))}`
        );
        const data = (await res.json()) as Availability;
        console.log(
          "[DateTimeSelector] availability for",
          selectedDateISO,
          data
        );
        if (!res.ok || !data || data.ok === false) {
          setAvailability(null);
        } else {
          setAvailability(data);
        }
      } catch (e) {
        console.error("[DateTimeSelector] error loading availability:", e);
        setAvailability(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [selectedDateISO, courtId]);

  // множина зайнятих слотів
  const busySet = useMemo(() => {
    if (!availability?.ok) return new Set<string>();
    return new Set(availability.busy ?? []);
  }, [availability]);

  /**
   * множина ДОЗВОЛЕНИХ стартових слотів:
   * якщо durationMinutes не заданий -> всі вільні (available)
   * якщо заданий -> тільки ті, для яких весь інтервал [start, start+duration) не перетинається з busy
   */
  const allowedStartSet = useMemo(() => {
    if (!availability?.ok) return new Set<string>();

    const slotMin = availability.slotMinutes || 30;
    const freeSlots = availability.available ?? [];
    const freeSet = new Set(freeSlots);
    const busy = new Set(availability.busy ?? []);

    // без тривалості — просто всі вільні
    if (!durationMinutes || durationMinutes <= 0) {
      return new Set(freeSlots);
    }

    const steps = Math.max(1, Math.ceil(durationMinutes / slotMin));
    const result: string[] = [];

    for (const startSlot of freeSlots) {
      const startMin = hhmmToMinutes(startSlot);
      let ok = true;

      for (let step = 0; step < steps; step++) {
        const t = startMin + step * slotMin;
        const slot = minutesToHhmm(t);

        // слот не повинен бути зайнятим і має бути серед вільних
        if (busy.has(slot) || !freeSet.has(slot)) {
          ok = false;
          break;
        }
      }

      if (ok) {
        result.push(startSlot);
      }
    }

    console.log(
      "[DateTimeSelector] allowed start slots (with duration):",
      durationMinutes,
      result
    );

    return new Set(result);
  }, [availability, durationMinutes]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value: Date | null =
          field.value instanceof Date && !isNaN(field.value.getTime())
            ? field.value
            : null;

        const handleChange = (date: Date | null) => {
          field.onChange(date);

          if (date) {
            // вираховуємо ISO-день для запиту доступності
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, "0");
            const d = String(date.getDate()).padStart(2, "0");
            const iso = `${y}-${m}-${d}`;
            setSelectedDateISO(iso);
          } else {
            setSelectedDateISO(null);
          }
        };

        return (
          <div className="date-time-selector">
            <label className="date-time-selector__title">{title}</label>

            <DatePicker
              selected={value}
              onChange={handleChange}
              showTimeSelect
              timeIntervals={30}
              dateFormat="dd.MM.yyyy HH:mm"
              placeholderText={t("contact.form.duration.select_time")}
              className="date-time-selector__input"
              calendarClassName="svr-dtp__calendar"
              popperClassName="svr-dtp__popper"
              // дизейблимо часу:
              filterTime={(date) => {
                if (!availability?.ok) return true; // поки не завантажилось — не блокуємо
                const hhmm = dateToHhmm(date);

                // Якщо тривалість не задана — просто не даємо вибрати зайняті слоти
                if (!durationMinutes || durationMinutes <= 0) {
                  return !busySet.has(hhmm);
                }

                // Якщо тривалість є — дозволяємо тільки allowedStartSet
                return allowedStartSet.has(hhmm);
              }}
              // даємо класи для стилізації "вільний/зайнятий"
              timeClassName={(date) => {
                const base = "svr-dtp__time-item";
                if (!availability?.ok) return base;
                const hhmm = dateToHhmm(date);

                if (busySet.has(hhmm)) {
                  return `${base} svr-dtp__time-item--busy`;
                }
                if (allowedStartSet.has(hhmm)) {
                  return `${base} svr-dtp__time-item--available`;
                }
                // слот формально вільний, але не підходить за тривалістю
                return `${base} svr-dtp__time-item--disabled`;
              }}
            />

            {loading && (
              <p className="date-time-selector__hint">
                {t("contact.form.loading.available.slots")}
              </p>
            )}
            {!loading && selectedDateISO && availability && !availability.ok && (
              <p className="date-time-selector__hint date-time-selector__hint--error">
                {t("contact.form.loading.failed.slots")}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default DateTimeSelector;
