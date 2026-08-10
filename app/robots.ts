import type { MetadataRoute } from "next";

const BASE_URL = "https://zoenexstudios.in";

/**
 * /robots.txt previously 404'd. Google assumes "allow" when it is missing, so
 * this is not what was blocking indexing — but it is the standard place to
 * declare the sitemap, and a 404 here is one more thing for a crawler to trip
 * over on a domain that is still establishing itself.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
