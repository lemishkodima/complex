// app/api/banners/route.ts
import { NextRequest, NextResponse } from "next/server";

export type BannerDTO = {
  key: string;
  imageUrl: string;
  alt: string;
};

type StrapiBannerRaw = {
  id: number;
  key?: string;
  image?: any;
  attributes?: {
    key?: string;
    image?: any;
  };
};

// GET /api/banners?key=home-about&locale=uk
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const key = searchParams.get("key") || "";
  const localeRaw = searchParams.get("locale") || "uk";

  const locale = localeRaw === "ua" ? "uk" : localeRaw;

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token =
    process.env.NEXT_PUBLIC_STRAPI_TOKEN || process.env.STRAPI_API_TOKEN;

  console.log("🔥 [API /banner] called");
  console.log("   👉 key:", key);
  console.log("   👉 locale:", locale);
  console.log("   🌍 STRAPI_URL:", baseUrl);
  console.log(
    "   🔑 STRAPI token defined:",
    !!token,
    token ? token.slice(0, 10) + "..." : "NO TOKEN"
  );

  if (!baseUrl || !token || !key) {
    console.error("❌ [API /banners] Missing config or key");
    return NextResponse.json([], { status: 500 });
  }

  const url = `${baseUrl}/api/banners?filters[key][$eq]=${encodeURIComponent(
    key
  )}&populate=image&locale=${locale}`;

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

  try {
    console.log(
      "   📦 Raw banners body (first 400):",
      JSON.stringify(json).slice(0, 400)
    );
  } catch {
    console.log("   ⚠️ Cannot stringify Strapi banners JSON");
  }

  const items: StrapiBannerRaw[] = Array.isArray(json?.data)
    ? json.data
    : [];

  console.log("   ✅ Strapi items count:", items.length);
  if (items[0]) {
    console.log(
      "   🧩 First item keys:",
      Object.keys(items[0] as Record<string, unknown>)
    );
  }

  const banners: BannerDTO[] = items
    .map((item) => {
      const src = (item.attributes ?? item) as { key?: string; image?: any };

      const rawImage = src.image;
      if (!rawImage) {
        console.log("   ⚠️ Item without image, id=", item.id);
        return null;
      }

      // 🔑 тут головне: image може бути масивом, об'єктом або об'єктом з data.attributes
      let img: any;

      if (Array.isArray(rawImage)) {
        img = rawImage[0]; // беремо перше з масиву
        console.log("   🔎 Using first image from array for banner id=", item.id);
      } else if (rawImage?.data?.attributes) {
        img = rawImage.data.attributes;
        console.log("   🔎 Using image.data.attributes for banner id=", item.id);
      } else {
        img = rawImage;
        console.log("   🔎 Using raw image object for banner id=", item.id);
      }

      const imgPath: string | undefined = img?.url;

      if (!imgPath) {
        console.log("   ⚠️ Empty imgPath for banner id=", item.id, "img=", img);
        return null;
      }

      const imageUrl = imgPath.startsWith("http")
        ? imgPath
        : `${baseUrl}${imgPath}`;

      const alt: string =
        img?.alternativeText ??
        src.key ??
        "";

      return {
        key: src.key || "",
        imageUrl,
        alt,
      } satisfies BannerDTO;
    })
    .filter((b): b is BannerDTO => !!b);

  console.log("   ✅ Mapped banners:", banners.length);
  if (banners[0]) {
    console.log("   🧾 First banner DTO:", banners[0]);
  }

  return NextResponse.json(banners);
}
