import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Fetch all articles without offset boundaries, sorted by latest
    const articles = await db.article.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error("Public Fetch All Error:", error);
    return NextResponse.json({ error: "Failed to load articles Feed" }, { status: 500 });
  }
}

