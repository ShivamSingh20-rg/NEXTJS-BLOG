import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
   const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // 2. Parallelize queries to hit the database concurrently (much faster execution)
    const [totalArticles, totalComments, recentArticles] = await Promise.all([
      // Count total articles published by this specific user
      db.article.count({
        where: { authorId: userId },
      }),

      // Count total comments written by this specific user across the platform
      db.comment.count({
        where: { authorId: userId },
      }),

       
      db.article.findMany({
        where: { authorId: userId },
        select: {
          id: true,
          title: true,
          category: true,
          createdAt: true,
          imageUrl: true,
        },
        orderBy: {
          createdAt: "desc", // Newest first
        },
        take: 3, // Limit database payload size
      }),
    ]);

    // 3. Return payload structure
    return NextResponse.json({
      success: true,
      metrics: {
        totalArticles,
        totalComments,
      },
      recentArticles,
    });

  } catch (error) {
    console.error("Overview Aggregation Metric Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error failed to sync metrics" },
      { status: 500 }
    );
  }
}

