"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Inquiry } from "@/db/schema";
import { inquiryStatuses, parseServiceList } from "@/lib/site";

export function AdminInbox({ inquiries }: { inquiries: Inquiry[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<number | null>(null);

  async function setStatus(id: number, status: string) {
    setBusy(id);
    await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusy(null);
    router.refresh();
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="kicker">Studio</p>
          <h1 className="display mt-3 text-4xl tracking-[0.1em]">Leads</h1>
        </div>
        <button type="button" className="btn-ghost !py-3" onClick={logout}>
          Log out
        </button>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="display text-[0.68rem] tracking-[0.2em] text-[#c4a574]">
            <tr className="border-b border-[rgba(196,165,116,0.2)]">
              <th className="py-3 pr-4">When</th>
              <th className="py-3 pr-4">Client</th>
              <th className="py-3 pr-4">Bay</th>
              <th className="py-3 pr-4">Want</th>
              <th className="py-3 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((row) => (
              <tr key={row.id} className="border-b border-[rgba(196,165,116,0.12)] align-top">
                <td className="py-4 pr-4 text-[#9b958c]">
                  {row.createdAt
                    ? new Date(row.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "—"}
                </td>
                <td className="py-4 pr-4">
                  <p className="text-[#f3eee6]">{row.name}</p>
                  <p className="text-xs text-[#9b958c]">{row.email}</p>
                  <p className="text-xs text-[#9b958c]">{row.phone}</p>
                  <p className="text-xs text-[#9b958c]">
                    {[row.city, row.zip].filter(Boolean).join(" ")}
                  </p>
                </td>
                <td className="py-4 pr-4">
                  {row.garageType}
                  {row.squareFeet ? ` · ${row.squareFeet} sf` : ""}
                  <div className="mt-1 text-xs text-[#9b958c]">{row.timeline}</div>
                  <div className="text-xs text-[#9b958c]">{row.budgetRange}</div>
                </td>
                <td className="py-4 pr-4">
                  <p>{parseServiceList(row.services).join(", ")}</p>
                  {row.message ? (
                    <p className="mt-2 max-w-xs text-xs leading-5 text-[#cfc6b8]">{row.message}</p>
                  ) : null}
                </td>
                <td className="py-4 pr-4">
                  <select
                    className="field !py-2"
                    value={row.status}
                    disabled={busy === row.id}
                    onChange={(e) => setStatus(row.id, e.target.value)}
                  >
                    {inquiryStatuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inquiries.length === 0 ? (
          <p className="py-10 text-sm text-[#9b958c]">No leads yet.</p>
        ) : null}
      </div>
    </div>
  );
}
