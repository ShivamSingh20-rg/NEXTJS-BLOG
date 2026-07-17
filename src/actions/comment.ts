"use server"; // 💡 Forces this entire file to execute ONLY on the server safely

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

interface PostCommentArgs {
  articleId: string;
  text: string;
}

/**
 * 1. ACTION: Save a new comment to the database
 */
export async function createComment({ articleId, text }: PostCommentArgs) {
  // Check authorization securely on the backend server
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("You must be logged in to post comments.");
  }

  if (!text.trim()) {
    throw new Error("Comment text cannot be empty.");
  }

  try {
    const comment = await db.comment.create({
      data: {
        text: text.trim(),
        articleId: articleId,
        authorId: session.user.id,  
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

    // Refresh the client-side cache for this specific article page instantly
    revalidatePath(`/articles/detail/${articleId}`);
    
    return { success: true, data: comment };
  } catch (error) {
    console.error("Failed to create comment action:", error);
    return { success: false, error: "Database failed to save comment." };
  }
}

/**
 * 2. ACTION: Fetch all comments for a specific article
 */
export async function getCommentsByArticle(articleId: string) {
  try {
    const comments = await db.comment.findMany({
      where: {
        articleId: articleId,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Newest comments appear at the top
      },
    });

    return { success: true, data: comments };
  } catch (error) {
    console.error("Failed to fetch comments action:", error);
    return { success: false, error: "Failed to retrieve comment history." };
  }
}