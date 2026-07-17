import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {

    const { searchParams } = req.nextUrl;
    const searchQuery = searchParams.get("search") || "";

    // 2. Build a dynamic conditional where block based on the search query
    const whereCondition = searchQuery.trim()
      ? {
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" as const } },
            { category: { contains: searchQuery, mode: "insensitive" as const } },
          ],
        }
      : {};  

    
    const articles = await db.article.findMany({
      where: whereCondition,
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
    console.error("Database search query execution failure:", error);
    return NextResponse.json({ error: "Failed to run search process" }, { status: 500 });
  }
}