import { db } from "@/lib/db";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) { 
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
     const { id } = await params;

    const article = await db.article.findUnique({
      where: {
        id: id,                  
        authorId: session.user.id,
      },
      
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Dynamic GET Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // 1. Typed params as a Promise
) {
 
  const { id } = await params;

  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, category, imageUrl, content } = body;

    if (!title || !category || !imageUrl || !content) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const updatedArticle = await db.article.update({
      where: {
        id: id, // 3. Used the awaited id here
        authorId: session.user.id,
      },
      data: { title, category, imageUrl, content },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error("API Update Error:", error);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}
 
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {  const session = await auth();
    // Check authentication middleware here...
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 1 });
    }

    // 2. 💡 CRITICAL: You MUST await the params object before destructuring 'id'
    const { id } = await params; 

    await db.article.delete({
      where: {
        id: id, // Now this will perfectly evaluate!
        authorId: session.user.id, 
      },
    });

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("API Delete Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

 