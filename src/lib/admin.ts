import { NextRequest, NextResponse } from "next/server";

export const ADMIN_DEFAULT_SECRET = "admin2tribal";

export function getAdminSecret(): string {
  return process.env.ADMIN_SECRET_KEY || ADMIN_DEFAULT_SECRET;
}

export function isAdminSecret(secret: string | null): boolean {
  return secret === getAdminSecret();
}

export function verifyAdmin(req: NextRequest) {
  if (!isAdminSecret(req.headers.get("x-admin-secret"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
