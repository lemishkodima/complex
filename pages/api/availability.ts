// pages/api/availability.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  const { date, courtId = "1" } = req.query as { date?: string; courtId?: string };
  if (!date) return res.status(400).json({ ok: false, error: "Missing date" });

  const url = `${process.env.GS_WEBAPP_URL}?action=availability&date=${encodeURIComponent(date)}&courtId=${encodeURIComponent(courtId!)}`;
  const r = await fetch(url);
  const data = await r.json();
  return res.status(r.ok ? 200 : 500).json(data);
}
