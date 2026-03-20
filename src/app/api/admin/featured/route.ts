import { NextRequest, NextResponse } from "next/server";
import { readFeatured, writeFeatured } from "@/lib/featured";

export async function GET() {
  const featured = await readFeatured();
  return NextResponse.json({ featured });
}

export async function POST(req: NextRequest) {
  const { featured } = await req.json();

  if (!Array.isArray(featured)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await writeFeatured(featured);
  return NextResponse.json({ success: true, featured });
}
