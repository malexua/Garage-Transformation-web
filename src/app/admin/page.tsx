import { getInquiries } from "@/lib/data";
import { isAdmin } from "@/lib/admin";
import { AdminGate } from "@/components/AdminGate";
import { AdminInbox } from "@/components/AdminInbox";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdmin();
  if (!authed) {
    return (
      <main className="pt-28 pb-24">
        <AdminGate />
      </main>
    );
  }

  const rows = await getInquiries();
  return (
    <main className="pt-28 pb-24">
      <AdminInbox inquiries={rows} />
    </main>
  );
}
