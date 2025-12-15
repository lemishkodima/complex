// app/api/testimonials/route.ts
import { NextRequest, NextResponse } from "next/server";

type StrapiImage = {
  url?: string;
  alternativeText?: string | null;
  data?: {
    attributes?: {
      url?: string;
      alternativeText?: string | null;
    };
  } | null;
};

type StrapiTestimonialItem = {
  id: number;

  // 🔹 Для Strapi v4 (через attributes)
  attributes?: {
    name?: string;
    role?: string;
    text?: string;
    order?: number | null;
    avatar?: StrapiImage;
  };

  // 🔹 Для Strapi v5 / плоского формату (як у тебе)
  name?: string;
  role?: string;
  text?: string;
  order?: number | null;
  avatar?: StrapiImage;
};

export type TestimonialDTO = {
  id: number;
  name: string;
  role: string;
  text: string;
  order: number;
  avatarUrl: string;
  alt: string;
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const localeRaw = searchParams.get("locale") || "uk";

  // ua -> uk
  const locale = localeRaw === "ua" ? "uk" : localeRaw;

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token =
    process.env.NEXT_PUBLIC_STRAPI_TOKEN || process.env.STRAPI_API_TOKEN;

  console.log("🔥 [API /testimonials] called");
  console.log("   👉 locale:", locale);
  console.log("   🌍 STRAPI_URL:", baseUrl);
  console.log(
    "   🔑 STRAPI token defined:",
    !!token,
    token ? token.slice(0, 10) + "..." : "NO TOKEN"
  );

  if (!baseUrl || !token) {
    console.error("❌ [API /testimonials] Missing STRAPI config");
    return NextResponse.json([], { status: 500 });
  }

  const url = `${baseUrl}/api/testimonials?populate=avatar&locale=${locale}&sort=order:asc`;
  console.log("   ➡️ Fetching Strapi:", url);

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  console.log("   ⬅️ Strapi status:", res.status);

  if (!res.ok) {
    return NextResponse.json([], { status: 500 });
  }

  const json = await res.json();
  const items: StrapiTestimonialItem[] = Array.isArray(json?.data)
    ? json.data
    : [];

  console.log("   ✅ Strapi items count:", items.length);

  const testimonials: TestimonialDTO[] = items
    .map((item) => {
      // 🔑 ГОЛОВНЕ ВИПРАВЛЕННЯ:
      // Якщо є attributes — беремо звідти, якщо ні — беремо сам item
      const src = item.attributes ?? item;

      if (!src?.name || !src?.text) {
        console.log(
          "   ⚠️ Skipping item id=",
          item.id,
          " — missing name or text"
        );
        return null;
      }

      const avatar = src.avatar;
      let imgPath = "";

      if (avatar?.url) {
        imgPath = avatar.url;
      } else if (avatar?.data?.attributes?.url) {
        imgPath = avatar.data.attributes.url;
      }

      const avatarUrl = imgPath
        ? imgPath.startsWith("http")
          ? imgPath
          : `${baseUrl}${imgPath}`
        : "/assets/images/person.png";

      const alt =
        avatar?.data?.attributes?.alternativeText ??
        avatar?.alternativeText ??
        src.name ??
        "Guest photo";

      return {
        id: item.id,
        name: src.name,
        role: src.role || "",
        text: src.text,
        order: src.order ?? 0,
        avatarUrl,
        alt,
      } satisfies TestimonialDTO;
    })
    .filter(Boolean) as TestimonialDTO[];

  console.log("   ✅ Mapped testimonials:", testimonials.length);
  console.log("   🧾 Testimonials:", testimonials);

  return NextResponse.json(testimonials);
}
