import type { MetadataRoute } from "next";

const siteUrl = "https://rimello.ai";

const staticPaths = [
  "",
  "/about",
  "/brands",
  "/compare",
  "/models",
  "/recommendation",
  "/suggestions",
  "/trims",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
