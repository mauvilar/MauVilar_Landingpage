import type { MetadataRoute } from "next";
import { notebooks } from "@/lib/catalogo";
import { SITE_URL } from "@/lib/sitio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...notebooks.map((n) => ({
      url: `${SITE_URL}/projects/${n.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
