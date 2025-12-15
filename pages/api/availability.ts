// pages/api/availability.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  const { date, courtId = "1" } = req.query as { date?: string; courtId?: string };

  console.log("[/api/availability] Incoming request:", { date, courtId });

  if (!date) {
    console.warn("[/api/availability] Missing date param");
    return res.status(400).json({ ok: false, error: "Missing date" });
  }

  const url = `${process.env.GS_WEBAPP_URL}?action=availability&date=${encodeURIComponent(
    date
  )}&courtId=${encodeURIComponent(courtId!)}`;

  console.log("[/api/availability] Calling Apps Script URL:", url);

  try {
    const r = await fetch(url);
    const text = await r.text();

    console.log(
      "[/api/availability] Apps Script response status:",
      r.status,
      "body:",
      text
    );

    let data: any;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("[/api/availability] JSON parse error:", e);
      return res
        .status(500)
        .json({ ok: false, error: "Invalid JSON from Apps Script", raw: text });
    }

    return res.status(r.ok ? 200 : 500).json(data);
  } catch (e) {
    console.error("[/api/availability] Network error:", e);
    return res.status(500).json({ ok: false, error: String(e) });
  }
}
