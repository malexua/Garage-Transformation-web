import { site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    url: site.url,
    image: `${site.url}/gallery/midnight-bay-after.jpg`,
    areaServed: site.serviceArea,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ontario",
      addressRegion: "CA",
      addressCountry: "US",
    },
    openingHours: "Sun-Fri",
    priceRange: "$$–$$$",
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
