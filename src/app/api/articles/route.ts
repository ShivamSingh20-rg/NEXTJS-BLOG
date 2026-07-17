import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
 

// 1. DELETE ENDPOIN
// 2. PUT (EDIT) ENDPOINT

export const GET = auth(async function GET(req) {
  // Now you read 'req.auth' instead of waiting for a standalone auth() call!
  const session = req.auth;
console.log('session is',session)
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const articles = await db.article.findMany({
      where: { authorId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(articles);
  } catch (error) {
    console.error("API Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
});