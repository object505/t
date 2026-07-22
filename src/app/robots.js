const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tz.mk";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
