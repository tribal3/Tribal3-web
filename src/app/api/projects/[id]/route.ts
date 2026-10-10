import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauth = await verifyAdmin(req);
  if (unauth) return unauth;

  try {
    const { connectDB } = await import("@/lib/mongodb");
    const { Project } = await import("@/lib/models/Project");
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const project = await Project.findByIdAndUpdate(
      id,
      {
        title: body.title,
        description: body.description,
        url: body.url,
        imageUrl: body.imageUrl || "",
        techStack: body.techStack || [],
        category: body.category || "standard",
        ownerHighlight: body.ownerHighlight || null,
        order: body.order ?? 0,
      },
      { new: true }
    );

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauth = await verifyAdmin(req);
  if (unauth) return unauth;

  try {
    const { connectDB } = await import("@/lib/mongodb");
    const { Project } = await import("@/lib/models/Project");
    await connectDB();
    const { id } = await params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }
}
