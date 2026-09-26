import { NextRequest, NextResponse } from "next/server";

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
  try {
    const secret = req.headers.get("x-admin-secret");
    if (secret !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
