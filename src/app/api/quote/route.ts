import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { quoteServiceOptions } from "@/lib/site";

export const dynamic = "force-dynamic";

const allowed = new Set<string>(quoteServiceOptions.map((s) => s.value));

export async function POST(request: Request) {
  try {
    await ensureSeeded();
    const body = (await request.json()) as Record<string, unknown>;

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const garageType = String(body.garageType ?? "").trim();
    const timeline = String(body.timeline ?? "").trim();
    const rawServices = Array.isArray(body.services) ? body.services.map(String) : [];
    const selected = rawServices.filter((s) => allowed.has(s));

    if (name.length < 2) {
      return Response.json({ ok: false, error: "Name is required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ ok: false, error: "Valid email is required." }, { status: 400 });
    }
    if (phone.replace(/\D/g, "").length < 10) {
      return Response.json({ ok: false, error: "Phone is required." }, { status: 400 });
    }
    if (!garageType) {
      return Response.json({ ok: false, error: "Garage type is required." }, { status: 400 });
    }
    if (selected.length === 0) {
      return Response.json({ ok: false, error: "Pick at least one service." }, { status: 400 });
    }

    const squareFeetRaw = body.squareFeet;
    const squareFeet =
      typeof squareFeetRaw === "number"
        ? squareFeetRaw
        : typeof squareFeetRaw === "string" && squareFeetRaw
          ? Number(squareFeetRaw)
          : null;

    await db.insert(inquiries).values({
      name,
      email,
      phone,
      address: String(body.address ?? "").trim() || null,
      city: String(body.city ?? "").trim() || null,
      zip: String(body.zip ?? "").trim() || null,
      garageType,
      squareFeet: Number.isFinite(squareFeet) ? squareFeet : null,
      services: JSON.stringify(selected),
      timeline: timeline || "Just researching for now",
      budgetRange: String(body.budgetRange ?? "").trim() || null,
      message: String(body.message ?? "").trim() || null,
      status: "new",
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Could not save the request." }, { status: 500 });
  }
}
