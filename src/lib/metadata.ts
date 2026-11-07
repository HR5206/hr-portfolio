import type { Metadata } from "next";
import { hrProfile } from "@/data/hr-portfolio";

export const siteTitle = "Harish Raghav | Software Developer & SASTRA CSE Student";
export const siteDescription = "Harish Raghav, SASTRA computer science student graduating in 2028. Explore backend and developer-tool projects, source code, experience, and résumé.";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = new URL(path, hrProfile.siteUrl).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, type: "website", locale: "en_IN",
      siteName: "Harish Raghav — Personal computer",
      images: [{ url: "/social-card.png", width: 1200, height: 630, alt: "Harish Raghav — software projects, SASTRA CSE, class of 2028" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/social-card.png"] },
  };
}
