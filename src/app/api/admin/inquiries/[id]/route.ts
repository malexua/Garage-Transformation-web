import { eq } from "drizzle-orm";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { inquiryStatuses } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin())) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const { id } = await params;
  const inquiryId = Number(id);
  if (!Number.isFinite(inquiryId)) {
    return Response.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  const body = (await request.json()) as { status?: string; notes?: string };
  const status = body.status;
  if (status && !inquiryStatuses.includes(status as (typeof inquiryStatuses)[number])) {
    return Response.json({ ok: false, error: "Invalid status" }, { status: 400 });
  }

  await db
    .update(inquiries)
    .set({
      ...(status ? { status } : {}),
      ...(typeof body.notes === "string" ? { notes: body.notes } : {}),
    })
    .where(eq(inquiries.id, inquiryId));

  return Response.json({ ok: true });
}
