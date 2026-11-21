import type { MetadataRoute } from "next";

const SITE_URL = "https://testriseacademy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // ── Main Pages ─────────────────────────────────
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/apply`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/refer`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    // ── Course Pages ───────────────────────────────
    {
      url: `${SITE_URL}/courses/software-testing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/courses/api-testing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/courses/etl-testing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/courses/python-automation`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/courses/java-selenium`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/courses/teamcenter-plm`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
  ];
}
