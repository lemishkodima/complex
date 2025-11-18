import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs"; // на всякий

const LOCALES_DIR = path.join(process.cwd(), "public", "locales");

function getFilePath(locale: string, ns: string) {
  return path.join(LOCALES_DIR, locale, `${ns}.json`);
}

export async function GET(
  _req: Request,
  { params }: { params: { locale: string; ns: string } }
) {
  const { locale, ns } = params;
  const filePath = getFilePath(locale, ns);

  try {
    const content = await fs.readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(content));
  } catch (e) {
    return NextResponse.json(
      {
        error: `File not found or cannot read: ${locale}/${ns}.json`,
      },
      { status: 404 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { locale: string; ns: string } }
) {
  const { locale, ns } = params;
  const filePath = getFilePath(locale, ns);
  const body = await req.json();

  try {
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Cannot write file", detail: e.message },
      { status: 500 }
    );
  }
}
