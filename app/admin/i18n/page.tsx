"use client";

import { useEffect, useState } from "react";

const LOCALES = ["ua", "en"];
// під твої файли:
const NAMESPACES = [
  "home",
  "about",
  "contact",
  "projects",
  "pricacy", // саме так у тебе в public/locales/...
  "not-found",
  "translation",
];

export default function I18nAdminPage() {
  const [locale, setLocale] = useState("ua");
  const [ns, setNs] = useState("home");
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const res = await fetch(`/api/i18n/${locale}/${ns}`);
        if (!res.ok) {
          const errJson = await res.json().catch(() => ({}));
          throw new Error(
            errJson?.error || `HTTP ${res.status} while loading ${locale}/${ns}`
          );
        }
        const json = await res.json();
        setData(json);
      } catch (e: any) {
        console.error(e);
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [locale, ns]);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/i18n/${locale}/${ns}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson?.error || "Cannot save");
      }
      alert("Збережено ✅");
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Save error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 space-y-4 max-w-5xl">
      <h1 className="text-2xl font-bold">Редагування перекладів</h1>

      <div className="flex gap-4 items-center">
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {LOCALES.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        <select
          value={ns}
          onChange={(e) => setNs(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {NAMESPACES.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <button
          onClick={handleSave}
          disabled={saving || !data}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {saving ? "Збереження…" : "Зберегти"}
        </button>
      </div>

      {loading && <p>Завантаження…</p>}

      {error && (
        <p className="text-red-600 bg-red-50 border border-red-200 p-2 rounded">
          {error}
        </p>
      )}

      {!loading && !error && data && (
        <div className="space-y-3">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="flex gap-3 items-start">
              <label className="w-64 text-sm font-mono break-words">
                {key}
              </label>
              <input
                className="flex-1 border rounded px-2 py-1"
                value={typeof value === "string" ? value : JSON.stringify(value)}
                onChange={(e) => {
                  const v = e.target.value;
                  setData((prev) => (prev ? { ...prev, [key]: v } : prev));
                }}
              />
            </div>
          ))}
        </div>
      )}

      {!loading && !error && !data && (
        <p className="text-gray-500">Немає даних у файлі</p>
      )}
    </div>
  );
}
