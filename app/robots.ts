import { MetadataRoute } from "next";

export default function (): MetadataRoute.Robots {
  return {
    rules: { allow: "/", userAgent: "*", disallow: ["/my/", "/magic/", "/api/", "/wp_admin/", "/wordpress/"] },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
