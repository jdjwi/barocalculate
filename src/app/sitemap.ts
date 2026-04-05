import type { MetadataRoute } from "next";
import { calculators } from "@/lib/calculators";

const BASE_URL = "https://barogyesan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const calculatorPages = calculators.map((calc) => ({
    url: `${BASE_URL}/calculators/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...calculatorPages,
  ];
}
