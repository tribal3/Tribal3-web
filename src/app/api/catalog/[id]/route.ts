import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin";
import { updateCatalogItem, deleteCatalogItem } from "@/lib/catalog";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauth = verifyAdmin(req);
  if (unauth) return unauth;

  try {
    const { id } = await params;
    const body = await req.json();

    if (!body.title?.trim() || !body.description?.trim()) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const item = await updateCatalogItem(id, {
      type: body.type,
      title: body.title.trim(),
      description: body.description.trim(),
      imageUrl: body.imageUrl,
      url: body.url,
      order: body.order,
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch {
    return NextResponse.json({ error: "Could not update item" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauth = verifyAdmin(req);
  if (unauth) return unauth;

  try {
    const { id } = await params;
    const deleted = await deleteCatalogItem(id);

    if (!deleted) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Could not delete item" }, { status: 500 });
  }
}
