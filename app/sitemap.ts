import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";
import { LOCATIONS } from "@/lib/locations-data";

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zoenexstudios.in";
const BASE_URL = rawUrl.replace(/^http:\/\//, "https://").replace(/\/+$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const locationEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/locations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...LOCATIONS.map((loc) => ({
      url: `${BASE_URL}/locations/${loc.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: loc.slug === "mumbai" ? 0.9 : 0.85,
    })),
  ];

  const demoEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/demos/aerum/index.html`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/demos/dinerly/index.html`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/demos/dental/index.html`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/demos/astronomia/index.html`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/services/websites`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/ai-automation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/audit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...demoEntries,
    ...locationEntries,
    ...blogEntries,
    {
      url: `${BASE_URL}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
