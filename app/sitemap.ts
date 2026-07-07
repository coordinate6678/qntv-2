import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.quontive.com/",
      lastModified: "2026-07-05",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
