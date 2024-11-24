import { MetadataRoute } from "next";

export default function (): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL!,
      priority: 1,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL!}/signup`,
      priority: 0.5,
      changeFrequency: "yearly",
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL!}/login`,
      priority: 0.2,
      changeFrequency: "yearly",
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL!}/search`,
      priority: 0.3,
      changeFrequency: "yearly",
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL!}/blog`,
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: new Date(),
    },
  ];
}
