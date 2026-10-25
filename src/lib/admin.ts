import { cookies } from "next/headers";

export const ADMIN_COOKIE = "blackline_admin";

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "blackline-studio";
}

export function adminToken() {
  return `ok:${adminPassword()}`;
}

export async function isAdmin() {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === adminToken();
}
