import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://cms:1337";

const STRAPI_TOKEN =
  process.env.STRAPI_TOKEN || process.env.NEXT_PUBLIC_STRAPI_TOKEN;

export const dynamic = "force-dynamic"; // щоб не було кешу Next'ом

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);

    // 🔹 читаємо locale з query (?locale=en)
    const rawLocale = searchParams.get("locale") || "en";
    const strapiLocale = rawLocale === "ua" ? "uk" : rawLocale;

    // гарантуємо, що в запит до Strapi піде коректний locale
    searchParams.set("locale", strapiLocale);

    // дефолтний ліміт, якщо не переданий
    if (!searchParams.has("pagination[limit]")) {
      searchParams.set("pagination[limit]", "1000");
    }

    const upstreamUrl = `${STRAPI_URL}/api/translations?${searchParams.toString()}`;

    console.log("[API /translations] Incoming request", {
      rawLocale,
      strapiLocale,
      searchParams: Object.fromEntries(searchParams.entries()),
      upstreamUrl,
      hasToken: !!STRAPI_TOKEN,
    });

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (STRAPI_TOKEN) {
      headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
    }

    const res = await fetch(upstreamUrl, {
      method: "GET",
      headers,
      // 🧠 важливо: щоб не кешувався Strapi-відповідь на рівні fetch
      cache: "no-store",
    });

    const text = await res.text();

    console.log("[API /translations] Strapi response meta", {
      status: res.status,
      ok: res.ok,
      textPreview: text.slice(0, 200),
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch translations from Strapi",
          status: res.status,
          bodyPreview: text.slice(0, 500),
        },
        { status: res.status }
      );
    }

    // ⚠️ ВАЖЛИВО: i18next-http-backend очікує JSON,
    // де є `data: [...]`, а ти вже в parse() це розбираєш
    let json: any;
    try {
      json = JSON.parse(text);
    } catch (e) {
      console.error("[API /translations] JSON parse error from Strapi:", e);
      return NextResponse.json(
        {
          error: "Invalid JSON from Strapi in /translations",
        },
        { status: 500 }
      );
    }

    // Можемо ще раз логнути перший елемент
    const first = Array.isArray(json?.data) ? json.data[0] : null;
    console.log("[API /translations] Parsed JSON", {
      itemsCount: Array.isArray(json?.data) ? json.data.length : 0,
      firstItemPreview: first
        ? {
            id: first.id,
            key: first.key,
            valuePreview:
              typeof first.value === "string"
                ? first.value.slice(0, 40)
                : typeof first.value,
          }
        : null,
    });

    return NextResponse.json(json);
  } catch (e: any) {
    console.error("[API /translations] Unexpected error:", e);
    return NextResponse.json(
      {
        error: "Unexpected error in /api/translations",
        detail: e?.message,
      },
      { status: 500 }
    );
  }
}
