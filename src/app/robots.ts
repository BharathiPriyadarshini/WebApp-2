import type { MetadataRoute } from "next";

const siteUrl = "https://rimello.ai";

const publicDisallow: string[] = ["/profile"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: publicDisallow,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: publicDisallow,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: publicDisallow,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: publicDisallow,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: publicDisallow,
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: publicDisallow,
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: publicDisallow,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: publicDisallow,
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: publicDisallow,
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: publicDisallow,
      },
    ],
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
