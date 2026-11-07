import { hrProfile } from "@/data/hr-portfolio";

export default function ProfileSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": hrProfile.siteUrl + "/#profile",
    url: hrProfile.siteUrl + "/",
    name: hrProfile.name + " — Portfolio",
    mainEntity: {
      "@type": "Person",
      "@id": hrProfile.siteUrl + "/#person",
      name: hrProfile.name,
      alternateName: hrProfile.fullName,
      url: hrProfile.siteUrl + "/",
      description: "Computer science student at SASTRA, graduating in 2028, interested in backend systems and developer tools.",
      sameAs: [hrProfile.github, hrProfile.linkedin],
      affiliation: { "@type": "CollegeOrUniversity", name: "SASTRA Deemed University" },
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
