"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import{auth} from '@/auth'
export async function createNewArticle(formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const content = formData.get("content") as string;


  const session = await auth();
 
if (!session || !session.user?.id) {
  throw new Error("You must be logged in to perform this action.");
}


const loggedInUserId = session.user.id;
  
  // 1. Basic Backend Validation
  if (!title || !category || !imageUrl || !content) {
    throw new Error("All fields (Title, Category, Image URL, Content) are required.");
  }

  try {
   
    await db.article.create({
      data: {
        title,
        category,
        imageUrl,
        content,
      authorId: loggedInUserId,
    
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to save the article to the database.");
  }

  // 3. Clear cache layout and send the user home
  revalidatePath("/dashboard");
  redirect("/dashboard");
}