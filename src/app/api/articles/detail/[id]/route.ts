import { NextRequest, NextResponse } from "next/server";
 import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. Check user session/authentication
 
 

  try {
    // 2. Await the dynamic parameters safely
    const { id } = await params;
console.log('id is',id)
     const article = await db.article.findUnique({
      where: {
        id: id,  
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    // 4. Send 404 if the record doesn't exist
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error) {
    console.error("Dynamic GET Article Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}