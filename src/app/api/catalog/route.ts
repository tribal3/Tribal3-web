import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin";
import { getCatalogItems, createCatalogItem, CATALOG_TYPES } from "@/lib/catalog";
import type { CatalogType } from "@/lib/catalog";

export async function GET(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get("type");
    const items = await getCatalogItems(
      type && CATALOG_TYPES.includes(type as CatalogType) ? (type as CatalogType) : undefined
    );
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}

export async function POST(req: NextRequest) {
  const unauth = verifyAdmin(req);
  if (unauth) return unauth;

  try {
    const body = await req.json();

    if (!CATALOG_TYPES.includes(body.type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    if (!body.title?.trim() || !body.description?.trim()) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const item = await createCatalogItem({
      type: body.type as CatalogType,
      title: body.title.trim(),
      description: body.description.trim(),
      imageUrl: body.imageUrl,
      url: body.url,
      order: body.order,
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not save item" }, { status: 500 });
  }
}
