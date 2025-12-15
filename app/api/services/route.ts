// app/api/services/route.ts
import { NextResponse } from "next/server";

export type ServiceCategory = string;

export type Service = {
  id: number;
  name: string;
  category: ServiceCategory;
  href: string;
  imageUrl: string;
};

type StrapiImageFlat = {
  url?: string;
  alternativeText?: string | null;
  data?: {
    attributes?: {
      url?: string;
      alternativeText?: string | null;
    };
  } | null;
};

type StrapiServiceItem = {
  id: number;
  attributes?: {
    title?: string;
    slug?: string;
    category?: ServiceCategory;
    href?: string | null;
    order?: number | null;
    image?: StrapiImageFlat;
  };
  // підтримуємо ще й плоский формат:
  title?: string;
  slug?: string;
  category?: ServiceCategory;
  href?: string | null;
  order?: number | null;
  image?: StrapiImageFlat;
};

export async function GET(req: Request) {
  const url = new URL(req.url);

  const rawLocale = url.searchParams.get("locale") ?? "uk";
  const locale = rawLocale === "ua" ? "uk" : rawLocale;

  console.log("🔥 [API /services] called");
  console.log("   👉 locale (raw):", rawLocale);
  console.log("   👉 locale (used):", locale);

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token =
    process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  console.log("   🌍 NEXT_PUBLIC_STRAPI_URL:", baseUrl);
  console.log(
    "   🔑 STRAPI token defined:",
    Boolean(token),
    token ? token.slice(0, 10) + "..." : "NO TOKEN"
  );

  if (!baseUrl || !token) {
    console.error("❌ [API /services] Missing STRAPI config");
    return NextResponse.json<Service[]>([]);
  }

  const strapiUrl = `${baseUrl}/api/services?populate=image&locale=${locale}&sort=order:asc`;
  console.log("   ➡️ Fetching Strapi:", strapiUrl);

  let res: Response;
  try {
    res = await fetch(strapiUrl, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  } catch (err) {
    console.error("💥 [API /services] Network error to Strapi:", err);
    return NextResponse.json<Service[]>([]);
  }

  console.log("   ⬅️ Strapi status:", res.status);

  const rawBody = await res.text();
  console.log(
    "   📦 Strapi raw body (first 300):",
    rawBody.slice(0, 300)
  );

  if (!res.ok) {
    console.error("❌ [API /services] Strapi returned not OK");
    return NextResponse.json<Service[]>([]);
  }

  let json: any;
  try {
    json = JSON.parse(rawBody);
  } catch (e) {
    console.error("❌ [API /services] JSON parse error:", e);
    return NextResponse.json<Service[]>([]);
  }

  const items: StrapiServiceItem[] = Array.isArray(json?.data)
    ? json.data
    : [];

  console.log("   ✅ Strapi items count:", items.length);
  if (items[0]) {
    console.log(
      "   🧩 First raw item:",
      JSON.stringify(items[0], null, 2)
    );
  }

  const services: Service[] = items
    .map((item) => {
      // 🔹 Підтримуємо обидва варіанти: з attributes і без
      const src: any = (item as any).attributes ?? item;

      console.log(
        "   🔍 Mapping item id=",
        item.id,
        " src.title=",
        src?.title,
        " src.category=",
        src?.category
      );

      if (!src?.title) {
        console.warn("   ⚠️ Skipping item without title:", item.id);
        return null;
      }

      const category: ServiceCategory = src.category ?? "Service";
      const href = src.href || "/contact";

      let imgPath = "";
      const image: StrapiImageFlat | undefined = src.image;

      if (image?.url) {
        imgPath = image.url;
      } else if (image?.data?.attributes?.url) {
        imgPath = image.data.attributes.url;
      }

      const imageUrl = imgPath
        ? imgPath.startsWith("http")
          ? imgPath
          : `${baseUrl}${imgPath}`
        : "/assets/images/projects/Residence/preview.png";

      return {
        id: item.id,
        name: src.title,
        category,
        href,
        imageUrl,
      } satisfies Service;
    })
    .filter(Boolean) as Service[];

  console.log("   ✅ Mapped services:", services.length);
  console.log("   🧾 Services:", services);

  return NextResponse.json<Service[]>(services);
}
