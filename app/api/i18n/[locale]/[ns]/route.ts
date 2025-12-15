// app/api/i18n/[locale]/[ns]/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";          // потрібен для fs
export const dynamic = "force-dynamic";   // щоб завжди читати свіжі файли

const LOCALES_DIR = path.join(process.cwd(), "public", "locales");

function getFilePath(locale: string, ns: string): string {
  return path.join(LOCALES_DIR, locale, `${ns}.json`);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { locale: string; ns: string } }
) {
  const { locale, ns } = params;
  const filePath = getFilePath(locale, ns);

  try {
    const content = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(content);
    return NextResponse.json(json);
  } catch (error: any) {
    console.error(
      `❌ Error reading i18n file "${locale}/${ns}.json":`,
      error?.message || error
    );

    return NextResponse.json(
      {
        error: `File not found or cannot be read: ${locale}/${ns}.json`,
      },
      { status: 404 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { locale: string; ns: string } }
) {
  const { locale, ns } = params;
  const filePath = getFilePath(locale, ns);

  let body: unknown;

  try {
    body = await req.json();
  } catch (error: any) {
    console.error("❌ Invalid JSON body for i18n POST:", error?.message || error);
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Body must be a plain JSON object" },
      { status: 400 }
    );
  }

  try {
    // гарантуємо, що директорія існує (наприклад, public/locales/ua)
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    await fs.writeFile(
      filePath,
      JSON.stringify(body, null, 2),
      "utf-8"
    );

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error(
      `❌ Error writing i18n file "${locale}/${ns}.json":`,
      error?.message || error
    );

    return NextResponse.json(
      {
        error: "Cannot write file",
        detail: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
