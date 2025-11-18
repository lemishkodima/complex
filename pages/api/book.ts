// pages/api/book.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const r = await fetch(`${process.env.GS_WEBAPP_URL}?action=book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body), // очікуємо { date, startTime, courtId, name, phone, email, notes }
    });
    const data = await r.json();
    return res.status(r.ok ? 200 : r.status || 500).json(data);
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
}
