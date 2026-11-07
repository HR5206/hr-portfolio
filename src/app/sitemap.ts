import type { MetadataRoute } from "next";
import { hrProfile, hrProjects } from "@/data/hr-portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit lastModified rather than inventing a fresh content date at every build.
  return ["/", "/overview/", ...hrProjects.map((project) => "/projects/" + project.id + "/")]
    .map((path) => ({ url: new URL(path, hrProfile.siteUrl).href }));
}
