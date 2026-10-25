"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  budgetRanges,
  estimateRange,
  garageTypes,
  money,
  quoteServiceOptions,
  timelines,
} from "@/lib/site";

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  garageType: string;
  squareFeet: string;
  services: string[];
  timeline: string;
  budgetRange: string;
  message: string;
};

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
  garageType: "2-car",
  squareFeet: "420",
  services: ["full"],
  timeline: timelines[1],
  budgetRange: budgetRanges[2],
  message: "",
};

export function QuoteForm() {
  const router = useRouter();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const sqft = Number(form.squareFeet) || 0;
  const estimate = useMemo(
    () => estimateRange({ garageType: form.garageType, squareFeet: sqft, selected: form.services }),
    [form.garageType, sqft, form.services],
  );

  function toggleService(value: string) {
    setForm((prev) => {
      const has = prev.services.includes(value);
      if (value === "full") {
        return { ...prev, services: has ? [] : ["full"] };
      }
      const next = prev.services.filter((s) => s !== "full");
      return {
        ...prev,
        services: has ? next.filter((s) => s !== value) : [...next, value],
      };
    });
  }

  function onGarage(value: string) {
    const match = garageTypes.find((g) => g.value === value);
    setForm((prev) => ({
      ...prev,
      garageType: value,
      squareFeet: match ? String(match.sqft) : prev.squareFeet,
    }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.name.trim().length < 2) {
      setError("Please add your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please add a valid email.");
      return;
    }
    if (form.phone.replace(/\D/g, "").length < 10) {
      setError("Please add a phone number we can actually call.");
      return;
    }
    if (form.services.length === 0) {
      setError("Pick at least one service.");
      return;
    }

    setPending(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          squareFeet: sqft || null,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Could not send the request. Try again or call the studio.");
        setPending(false);
        return;
      }
      router.push("/quote/success");
    } catch {
      setError("Network error. Call us if it keeps happening.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="field-label">Name</span>
          <input
            className="field"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            autoComplete="name"
            required
          />
        </label>
        <label className="block">
          <span className="field-label">Email</span>
          <input
            className="field"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            autoComplete="email"
            required
          />
        </label>
        <label className="block">
          <span className="field-label">Phone</span>
          <input
            className="field"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            autoComplete="tel"
            required
          />
        </label>
        <label className="block">
          <span className="field-label">City</span>
          <input
            className="field"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            placeholder="Scottsdale"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="field-label">Street address</span>
          <input
            className="field"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            autoComplete="street-address"
          />
        </label>
        <label className="block">
          <span className="field-label">ZIP</span>
          <input
            className="field"
            value={form.zip}
            onChange={(e) => setForm({ ...form, zip: e.target.value })}
            autoComplete="postal-code"
          />
        </label>
        <label className="block">
          <span className="field-label">Garage type</span>
          <select className="field" value={form.garageType} onChange={(e) => onGarage(e.target.value)}>
            {garageTypes.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="field-label">Approx. square feet</span>
          <input
            className="field"
            type="number"
            min={120}
            max={2000}
            value={form.squareFeet}
            onChange={(e) => setForm({ ...form, squareFeet: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="field-label">Timeline</span>
          <select
            className="field"
            value={form.timeline}
            onChange={(e) => setForm({ ...form, timeline: e.target.value })}
          >
            {timelines.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="field-label">Budget range</span>
          <select
            className="field"
            value={form.budgetRange}
            onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
          >
            {budgetRanges.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset>
        <legend className="field-label mb-3">What are we designing?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {quoteServiceOptions.map((opt) => {
            const on = form.services.includes(opt.value);
            return (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition ${
                  on ? "border-[#c4a574] bg-[rgba(196,165,116,0.08)]" : "border-[rgba(196,165,116,0.22)]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggleService(opt.value)}
                  className="accent-[#c4a574]"
                />
                {opt.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="block">
        <span className="field-label">Anything we should know?</span>
        <textarea
          className="field min-h-32"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Oil stains, a tankless water heater, HOA rules, a freezer that has to stay…"
        />
      </label>

      {estimate ? (
        <div className="border border-[rgba(196,165,116,0.28)] bg-[#101114] p-5">
          <p className="kicker">Ballpark</p>
          <p className="display mt-3 text-3xl tracking-[0.08em] text-[#e4d0ae]">
            {money(estimate.low)} – {money(estimate.high)}
          </p>
          <p className="mt-2 text-sm leading-6 text-[#cfc6b8]">
            A measured walkthrough locks the number. Hot-tire metallic, extra cabinets, and three-car
            bays sit toward the high end.
          </p>
        </div>
      ) : null}

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      <button type="submit" className="btn-gold w-full sm:w-auto" disabled={pending}>
        {pending ? "Sending…" : "Request a design quote"}
      </button>
    </form>
  );
}
