import { NextRequest, NextResponse } from "next/server";
import { isAdminSecret } from "@/lib/admin";

export async function POST(req: NextRequest) {
  if (isAdminSecret(req.headers.get("x-admin-secret"))) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
