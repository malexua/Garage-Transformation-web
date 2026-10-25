export const site = {
  name: "Blackline Garage Co.",
  short: "Blackline",
  legal: "Blackline Garage Co. LLC",
  tagline: "Slick floors. Designed walls. A garage that looks finished.",
  description:
    "Blackline Garage Co. designs and installs decorative epoxy floors, custom painted walls, slatwall organization, and architectural LED lighting for residential garages across the Phoenix metro.",
  url: "https://blacklinegarage.co",
  phone: "(480) 319-4470",
  phoneHref: "tel:+14803194470",
  email: "hello@blacklinegarage.co",
  hours: "Mon–Sat, 7:00am–6:00pm",
  serviceArea:
    "Phoenix, Scottsdale, Paradise Valley, Mesa, Gilbert, Chandler, Tempe & the East Valley",
  instagram: "https://instagram.com/blacklinegarage",
  facebook: "https://facebook.com/blacklinegarage",
  addressLine: "Mobile design studio",
  city: "Phoenix, AZ",
};

export const nav = [
  { href: "/gallery", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "Studio" },
  { href: "/faq", label: "FAQ" },
];

export const garageTypes = [
  { value: "1-car", label: "1-car", sqft: 240 },
  { value: "2-car", label: "2-car", sqft: 420 },
  { value: "3-car", label: "3-car", sqft: 650 },
  { value: "4-car", label: "4-car+", sqft: 850 },
  { value: "workshop", label: "Workshop / other", sqft: 500 },
] as const;

export const quoteServiceOptions = [
  { value: "epoxy", label: "Decorative epoxy floors" },
  { value: "walls", label: "Custom wall design & paint" },
  { value: "slatwall", label: "Slatwall & storage" },
  { value: "lighting", label: "Architectural LED lighting" },
  { value: "full", label: "Full bay transformation" },
] as const;

export const timelines = [
  "As soon as you can schedule",
  "In the next 2–4 weeks",
  "In the next 1–3 months",
  "Just researching for now",
] as const;

export const budgetRanges = [
  "Under $4,000",
  "$4,000 – $8,000",
  "$8,000 – $15,000",
  "$15,000+",
  "Not sure yet",
] as const;

export const inquiryStatuses = ["new", "contacted", "quoted", "booked", "closed"] as const;

export function parseFeatureList(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string");
    }
  } catch {
    /* ignore */
  }
  return [];
}

export function parseServiceList(raw: string): string[] {
  return parseFeatureList(raw);
}

export function estimateRange(input: {
  garageType: string;
  squareFeet: number;
  selected: string[];
}): { low: number; high: number } | null {
  const sqft = Math.max(120, Math.min(2000, input.squareFeet || 0));
  if (!sqft || input.selected.length === 0) return null;

  const full = input.selected.includes("full");
  const wants = new Set(full ? ["epoxy", "walls", "slatwall", "lighting"] : input.selected);

  let low = 0;
  let high = 0;

  if (wants.has("epoxy")) {
    low += sqft * 6;
    high += sqft * 11;
  }
  if (wants.has("walls")) {
    low += 1400 + sqft * 1.4;
    high += 2800 + sqft * 2.4;
  }
  if (wants.has("slatwall")) {
    low += 1200;
    high += 3200;
  }
  if (wants.has("lighting")) {
    low += 650;
    high += 1800;
  }

  if (full) {
    low = Math.round(low * 0.9);
    high = Math.round(high * 0.95);
  }

  return { low: Math.round(low / 50) * 50, high: Math.round(high / 50) * 50 };
}

export function money(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
