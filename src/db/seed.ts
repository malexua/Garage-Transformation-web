import { db } from "@/db";
import {
  faqs,
  inquiries,
  projectImages,
  projects,
  services,
  testimonials,
} from "@/db/schema";

let seeded = false;

export async function ensureSeeded() {
  if (seeded) return;

  const existing = await db.select({ id: services.id }).from(services).limit(1);
  if (existing.length > 0) {
    seeded = true;
    return;
  }

  await db.insert(services).values([
    {
      slug: "epoxy-floors",
      name: "Decorative Epoxy Floors",
      tagline: "A floor that looks wet, wears hard, and wipes clean.",
      description:
        "We grind, repair, flake, and seal residential garage slabs into a high-gloss, chemical-resistant surface — the foundation of every Blackline bay.",
      details:
        "Most garages fail at the floor. Oil shadows, tire marks, dust that never quite leaves. Our flake epoxy system starts with a diamond grind so the coating actually bonds, then a pigmented base, a broadcast of blended vinyl flakes, and a UV-stable clear topcoat.\n\nThe result is the speckled, showroom finish you see in our Midnight Bay project: silver, charcoal, and warm stone chips locked under a glass-like seal. It resists hot tires, brake fluid, and the Arizona sun, and it rinses off with a hose.\n\nChoose classic flake, quartz sand for extra grip, or metallic for a liquid-metal look. We mask walls, drains, and the water heater line so the edge work looks intentional — not like a coating that ran out of patience.",
      priceFrom: "From $6 / sq ft",
      duration: "2–3 days in a typical 2-car bay",
      image: "/images/epoxy-detail.jpg",
      features: JSON.stringify([
        "Diamond grind + crack repair included",
        "Custom flake blends (stone, graphite, bronze)",
        "Hot-tire and chemical resistant topcoat",
        "Optional metallic and quartz systems",
        "5-year residential workmanship warranty",
      ]),
      sortOrder: 1,
    },
    {
      slug: "wall-design",
      name: "Custom Wall Design",
      tagline: "Paint is the cheapest way to make a garage feel designed.",
      description:
        "Matte black fields, botanical borders, taped reveals, and accent frames — we treat garage walls like interiors, not leftover drywall.",
      details:
        "A gray box with white doors is a storage unit. A garage with a considered wall is a room. Our wall program covers full-field paint, two-tone schemes, wallpaper or stencil borders, and the kind of framed motif you see on the back wall of Midnight Bay.\n\nWe spec coatings that actually belong in a garage: washable, low-sheen, and formulated for temperature swings. Trim, man-doors, and the water-heater alcove get masked like a furniture finish. If you want the Blackline signature — deep ink walls with a black-and-white botanical frieze — we will build a sample board before a drop of paint hits the slab.",
      priceFrom: "From $1,800 / bay",
      duration: "1–2 days after floors cure",
      image: "/images/wall-paint.jpg",
      features: JSON.stringify([
        "Full-field paint in custom colors",
        "Botanical borders, frames, and taped reveals",
        "Garage-grade washable coatings",
        "Doors, trim, and mechanicals masked clean",
        "On-site sample board before we roll",
      ]),
      sortOrder: 2,
    },
    {
      slug: "slatwall-storage",
      name: "Slatwall & Storage",
      tagline: "If it does not have a home, it ends up on the floor.",
      description:
        "Horizontal slatwall, hooks, cabinets, and shoe towers planned around how you actually live — bikes, coolers, tools, and the stuff that kills a clean bay.",
      details:
        "Organization is a design problem, not a shopping list. We map the walls after the floor color is chosen so slatwall, cabinets, and open hooks feel like millwork instead of afterthoughts.\n\nOur go-to is a warm taupe slatwall field on the lower third of the back wall — the same language as Midnight Bay — with vertical tool walls beside the man-door. We can add cube towers for shoes, overhead racks, and a single hero cabinet for chemicals. Everything hangs off the wall so the epoxy can do what it does: stay empty and reflective.",
      priceFrom: "From $1,200 installed",
      duration: "1 day",
      image: "/images/slatwall.jpg",
      features: JSON.stringify([
        "Custom slatwall fields in warm or black finishes",
        "Hook, basket, and cabinet packages",
        "Shoe / gear towers and overhead racks",
        "Layout planned around water heaters and doors",
        "Install after coatings so nothing gets overspray",
      ]),
      sortOrder: 3,
    },
    {
      slug: "led-lighting",
      name: "Architectural LED Lighting",
      tagline: "The garage should look as good at 9pm as it does at noon.",
      description:
        "Cool-white LED outlines on man-doors, baseboard runs, and ceiling coves — the detail that turns a painted bay into a night photograph.",
      details:
        "Daylight is honest. Night is when the design either dies or becomes the thing people text their group chat. We install low-profile LED tape in aluminum channels: door perimeters, the botanical wainscot line, and optional ceiling coves.\n\nColor temperature is 4000–5000K so the epoxy flake reads silver, not yellow. Drivers hide. Corners are soldered, not pinched. The Midnight Bay doors are the reference — a thin halo that makes black walls feel expensive instead of cave-like.",
      priceFrom: "From $650 / door",
      duration: "Same day as walls or storage",
      image: "/images/led-bay.jpg",
      features: JSON.stringify([
        "Door-frame halos and baseboard light lines",
        "4000–5000K architectural white",
        "Aluminum channels, hidden drivers",
        "Dimmer and smart-switch compatible",
        "Designed to graze flake floors at night",
      ]),
      sortOrder: 4,
    },
    {
      slug: "full-transformation",
      name: "Full Bay Transformations",
      tagline: "One crew. One design. Floor, walls, storage, light.",
      description:
        "The Blackline signature package: epoxy, custom walls, slatwall, and LED — sequenced so you get a finished room, not four separate invoices.",
      details:
        "This is the job we built the studio for. We measure, pull a design board (floor blend, wall color, border, slatwall finish, lighting runs), then run a four-to-six-day sequence: empty and grind, coat, cure, paint, hang, light, walkthrough.\n\nYou get one project lead, one schedule, and a garage that photographs like a product shot. Most 2-car bays land between $8,500 and $16,000 depending on flake vs metallic, how much wall we treat, and how aggressive the storage is. We will tell you the number before we grind a single inch.",
      priceFrom: "From $8,500 / 2-car",
      duration: "4–6 days on site",
      image: "/gallery/midnight-bay-after.jpg",
      features: JSON.stringify([
        "Single design board for floor, wall, storage, light",
        "Sequenced so coatings never fight the millwork",
        "One project lead from walkthrough to reveal",
        "Typical 2-car: 4–6 days, cars back on day 5–7",
        "Package pricing vs. stacking trades",
      ]),
      sortOrder: 5,
    },
  ]);

  const insertedProjects = await db
    .insert(projects)
    .values([
      {
        slug: "midnight-bay",
        title: "Midnight Bay",
        location: "North Scottsdale",
        summary:
          "A 2-car bay recast as a night studio: ink walls, botanical frames, taupe slatwall, flake epoxy, and LED door halos.",
        description:
          "The homeowners had a perfectly serviceable garage that still felt like a leftover. Stained slab, builder-beige drywall, tools leaning where they landed. They wanted it to feel like the rest of the house — considered, a little dramatic, and easy to keep clean.\n\nWe specified a graphite-and-stone flake floor, then committed to matte black walls with a black-and-white botanical frieze at the ceiling and a framed motif on the back wall. Lower slatwall in warm taupe keeps the black from swallowing the room. Cool-white LED tape outlines both man-doors and traces the wainscot so the bay holds up after sunset.\n\nThe water heater stayed. The floor drain stayed. The junk left. Four days on site, cars back on day six.",
        category: "Full transformation",
        squareFeet: 420,
        durationDays: 4,
        completedOn: "March 2026",
        coverImage: "/gallery/midnight-bay-after.jpg",
        beforeImage: "/gallery/midnight-bay-during.jpg",
        afterImage: "/gallery/midnight-bay-after.jpg",
        featured: true,
      },
      {
        slug: "collectors-bay",
        title: "Collector's Bay",
        location: "Paradise Valley",
        summary:
          "A dark metallic epoxy slab built to reflect a black sports sedan like a showroom, with quiet walls and gallery lighting.",
        description:
          "This bay had one job: make the car look expensive. We skipped busy flake in favor of a charcoal metallic pour that moves under the lights, then kept the walls quiet so the hood line could do the talking.\n\nPrep was the entire project — oil extraction, crack chase, and a longer grind than a typical flake job. The payoff is a floor that reads like wet stone. Recessed lighting and a single LED cove keep the reflections linear instead of chaotic.",
        category: "Epoxy + lighting",
        squareFeet: 480,
        durationDays: 3,
        completedOn: "January 2026",
        coverImage: "/gallery/collector-bay.jpg",
        beforeImage: "/stock/workshop.jpg",
        afterImage: "/gallery/collector-bay.jpg",
        featured: true,
      },
      {
        slug: "family-command",
        title: "Family Command Center",
        location: "Gilbert",
        summary:
          "Light flake epoxy, oak-and-white cabinetry, and a slatwall sports wall for a household that actually uses the garage every day.",
        description:
          "Not every bay wants to go dark. This family needed bikes, gear, a workbench, and a floor that could take soccer cleats without looking tired by October.\n\nWe ran a pale stone flake, then built a storage wall that behaves like a mudroom: closed cabinets for chemicals, open slatwall for bikes, and a bench that is actually used. Daylight does most of the lighting. The room reads calm instead of tactical.",
        category: "Organization + epoxy",
        squareFeet: 440,
        durationDays: 5,
        completedOn: "November 2025",
        coverImage: "/gallery/family-command.jpg",
        beforeImage: "/stock/workshop.jpg",
        afterImage: "/gallery/family-command.jpg",
        featured: true,
      },
      {
        slug: "ink-wall",
        title: "Ink Wall Studio",
        location: "Tempe",
        summary:
          "A paint-forward bay: full-field black, botanical border, and a taped reveal — proof that walls can carry a garage even before storage arrives.",
        description:
          "The floor was already decent. The walls were not. We treated this as an interiors job: prime, two coats of ink, a botanical wainscot, and crisp tape work around the man-door and water-heater chase.\n\nIt is the fastest way to change how a garage feels, and it is the layer most coating-only shops skip. When the owners add slatwall later, the paint is already the backdrop.",
        category: "Wall design",
        squareFeet: 400,
        durationDays: 2,
        completedOn: "October 2025",
        coverImage: "/images/wall-paint.jpg",
        beforeImage: "/stock/paint-prep.jpg",
        afterImage: "/images/wall-paint.jpg",
        featured: false,
      },
    ])
    .returning({ id: projects.id, slug: projects.slug });

  const bySlug = Object.fromEntries(insertedProjects.map((p) => [p.slug, p.id]));

  await db.insert(projectImages).values([
    {
      projectId: bySlug["midnight-bay"],
      src: "/gallery/midnight-bay-during.jpg",
      alt: "Midnight Bay during prep, sun on the back wall",
      caption: "Day one — grind, clean, and the first wall field.",
      kind: "before",
      sortOrder: 1,
    },
    {
      projectId: bySlug["midnight-bay"],
      src: "/gallery/midnight-bay-after.jpg",
      alt: "Midnight Bay finished at night with LED door halos",
      caption: "Reveal — LED, slatwall, freezer wall, empty floor.",
      kind: "after",
      sortOrder: 2,
    },
    {
      projectId: bySlug["midnight-bay"],
      src: "/images/led-bay.jpg",
      alt: "LED strip outlining a white man-door on black walls",
      caption: "Door halo at 4000K, channeled, not stuck-on tape.",
      kind: "detail",
      sortOrder: 3,
    },
    {
      projectId: bySlug["midnight-bay"],
      src: "/images/slatwall.jpg",
      alt: "Taupe slatwall with hanging tools",
      caption: "Lower slatwall field in warm taupe against ink paint.",
      kind: "detail",
      sortOrder: 4,
    },
    {
      projectId: bySlug["midnight-bay"],
      src: "/images/epoxy-detail.jpg",
      alt: "Close-up of flake epoxy floor",
      caption: "Graphite, silver, and stone flake under clear coat.",
      kind: "detail",
      sortOrder: 5,
    },
    {
      projectId: bySlug["collectors-bay"],
      src: "/gallery/collector-bay.jpg",
      alt: "Black sports car on metallic epoxy",
      caption: "Charcoal metallic, long reflections, quiet walls.",
      kind: "after",
      sortOrder: 1,
    },
    {
      projectId: bySlug["collectors-bay"],
      src: "/stock/black-car.jpg",
      alt: "Black car under garage lighting",
      caption: "Lighting aimed at the belt line, not the ceiling only.",
      kind: "detail",
      sortOrder: 2,
    },
    {
      projectId: bySlug["collectors-bay"],
      src: "/stock/sports-garage.jpg",
      alt: "Sports car on a polished garage floor",
      caption: "The floor is the display case.",
      kind: "detail",
      sortOrder: 3,
    },
    {
      projectId: bySlug["family-command"],
      src: "/gallery/family-command.jpg",
      alt: "Bright organized family garage with cabinets",
      caption: "Closed storage for the ugly stuff, slatwall for the daily stuff.",
      kind: "after",
      sortOrder: 1,
    },
    {
      projectId: bySlug["family-command"],
      src: "/images/consult.jpg",
      alt: "Design consult with samples",
      caption: "Palettes decided on site, not from a PDF.",
      kind: "detail",
      sortOrder: 2,
    },
    {
      projectId: bySlug["ink-wall"],
      src: "/images/wall-paint.jpg",
      alt: "Painter rolling matte black on garage walls",
      caption: "Garage-grade matte, two coats, taped like millwork.",
      kind: "after",
      sortOrder: 1,
    },
    {
      projectId: bySlug["ink-wall"],
      src: "/stock/painting-crew.jpg",
      alt: "Crew painting interior walls",
      caption: "Walls get a real prime-and-paint spec, not leftover house paint.",
      kind: "detail",
      sortOrder: 2,
    },
  ]);

  await db.insert(testimonials).values([
    {
      name: "Elena V.",
      neighborhood: "North Scottsdale",
      quote:
        "We used to close the garage before anyone came over. Now it is the first door we open. The LEDs at night still surprise me.",
      rating: 5,
      projectSlug: "midnight-bay",
      featured: true,
    },
    {
      name: "James & Priya R.",
      neighborhood: "Gilbert",
      quote:
        "They treated it like a kitchen remodel, not a coating job. The floor is the easy part — the walls and the storage are why it actually stays clean.",
      rating: 5,
      projectSlug: "family-command",
      featured: true,
    },
    {
      name: "Marcus T.",
      neighborhood: "Paradise Valley",
      quote:
        "I wanted the car to look like it was sitting in a gallery. They nailed the floor. Reflections are ridiculous in the best way.",
      rating: 5,
      projectSlug: "collectors-bay",
      featured: true,
    },
    {
      name: "Dana S.",
      neighborhood: "Chandler",
      quote:
        "On time, no tire marks after a week of 110° parking, and they masked the water heater like they were painting a piano.",
      rating: 5,
      projectSlug: null,
      featured: true,
    },
  ]);

  await db.insert(faqs).values([
    {
      question: "How long before we can park again?",
      answer:
        "For a standard flake system, light foot traffic is usually the next morning and vehicles return 48–72 hours after the topcoat, weather depending. Full transformations add paint and storage after the floor is walkable, so plan on cars living in the driveway for 5–7 days.",
      sortOrder: 1,
    },
    {
      question: "Do we have to empty the garage?",
      answer:
        "Yes — a clear slab is the whole game. We send a prep checklist a week out. If you need a day-labor assist or a PODS-style hold, we will coordinate it. Water heaters, man-doors, and built-in mechanicals stay; everything else leaves.",
      sortOrder: 2,
    },
    {
      question: "What does a typical 2-car transformation cost?",
      answer:
        "A flake floor alone on a 400–440 sq ft bay usually lands between $2,500 and $4,800. A full Blackline package — floor, ink walls, slatwall, LED — is typically $8,500 to $16,000. Metallic, extra cabinets, and three-car bays push higher. The quote form gives a ballpark; a measured visit locks the number.",
      sortOrder: 3,
    },
    {
      question: "Will epoxy peel in Phoenix heat?",
      answer:
        "Peel is almost always a prep problem, not a temperature problem. We diamond-grind to a real profile, degrease oil, and use systems rated for hot tires. The 5-year residential warranty covers delamination from workmanship. Direct west-facing slabs get an extra conversation about UV-stable topcoats.",
      sortOrder: 4,
    },
    {
      question: "Flake, quartz, or metallic?",
      answer:
        "Flake is the Blackline default — hides dust, hides the slab’s sins, and matches the Midnight Bay look. Quartz adds tooth if you wrench on the floor. Metallic is a showpiece: high movement, less camouflage, more prep. We bring sample boards to the walkthrough.",
      sortOrder: 5,
    },
    {
      question: "Can you work around a tankless water heater and existing doors?",
      answer:
        "That is normal, not a change order. We mask, flash, and terminate coatings at mechanicals so they look framed. Man-doors stay. We do not paint your garage door panels unless you ask.",
      sortOrder: 6,
    },
    {
      question: "Do you move into the house?",
      answer:
        "No. We work from the driveway and the bay. Bathrooms by request only. Crews are background-checked, and we leave the slab broom-clean at the end of every day.",
      sortOrder: 7,
    },
    {
      question: "Are you licensed and insured?",
      answer:
        "Yes. ROC licensed for residential remodeling, general liability and workers’ comp on every job. We will send certificates to your HOA if they ask.",
      sortOrder: 8,
    },
  ]);

  await db.insert(inquiries).values([
    {
      name: "Alicia Nguyen",
      email: "alicia.n@example.com",
      phone: "(480) 555-0148",
      address: "8820 E. Palomino Rd",
      city: "Scottsdale",
      zip: "85255",
      garageType: "2-car",
      squareFeet: 420,
      services: JSON.stringify(["full"]),
      timeline: "In the next 2–4 weeks",
      budgetRange: "$8,000 – $15,000",
      message: "Want the Midnight Bay look — black walls, LEDs, flake floor. Water heater stays.",
      status: "new",
    },
    {
      name: "Chris Patel",
      email: "cpatel@example.com",
      phone: "(602) 555-0194",
      address: "414 W. Maplewood",
      city: "Gilbert",
      zip: "85233",
      garageType: "3-car",
      squareFeet: 680,
      services: JSON.stringify(["epoxy", "slatwall"]),
      timeline: "In the next 1–3 months",
      budgetRange: "$4,000 – $8,000",
      message: "Kids' bikes and a freezer wall. Prefer a lighter floor.",
      status: "contacted",
    },
  ]);

  seeded = true;
}
