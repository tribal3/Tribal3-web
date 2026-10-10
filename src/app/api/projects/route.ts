import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin";

export async function GET() {
  try {
    const { connectDB } = await import("@/lib/mongodb");
    const { Project } = await import("@/lib/models/Project");
    await connectDB();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json({ projects: [] });
  }
}

export async function POST(req: NextRequest) {
  const unauth = verifyAdmin(req);
  if (unauth) return unauth;

  try {
    const { connectDB } = await import("@/lib/mongodb");
    const { Project } = await import("@/lib/models/Project");
    await connectDB();
    const body = await req.json();

    const project = await Project.create({
      title: body.title,
      description: body.description,
      url: body.url,
      imageUrl: body.imageUrl || "",
      techStack: body.techStack || [],
      category: body.category || "standard",
      ownerHighlight: body.ownerHighlight || null,
      order: body.order || 0,
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }
}
