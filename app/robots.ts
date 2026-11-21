import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/lms/mentor/", "/lms/dashboard/", "/lms/course/"],
      },
      {
        // Allow AI crawlers (ChatGPT, Perplexity, etc.)
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/lms/mentor/", "/lms/dashboard/", "/lms/course/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/lms/mentor/", "/lms/dashboard/", "/lms/course/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
    ],
    sitemap: "https://testriseacademy.com/sitemap.xml",
  };
}
