"use client";

import React, { useState, useEffect } from "react";
import { Send, BookOpen } from "lucide-react";
 import { createComment, getCommentsByArticle } from "@/actions/comment"; 

interface CommentSectionProps {
  articleId: string;
  currentUser?: {
    name?: string | null;
    image?: string | null;
  };
}

export default function Comment({ articleId, currentUser }: CommentSectionProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ⚡ FETCH COMMENTS USING ACTION
  useEffect(() => {
    if (!articleId) return;
    
    const loadComments = async () => {
      setCommentsLoading(true);
      const result = await getCommentsByArticle(articleId);
      if (result.success && result.data) {
        setComments(result.data);
      }
      setCommentsLoading(false);
    };

    loadComments();
  }, [articleId]);

    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;

    try {
      setSubmitting(true);
      // Call your server action directly
      const result = await createComment({
        articleId,
        text: newComment.trim()
      });

      if (result.success && result.data) {
        // Prepend the new comment to the state layout instantly
        setComments((prev) => [result.data, ...prev]);
        setNewComment("");
      } else {
        alert(result.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-purple-900/40 bg-purple-950/20 p-6 md:p-8 backdrop-blur-md">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-purple-200">
        <BookOpen className="w-5 h-5 text-purple-400" /> Thread Discussion
      </h3>

      {/* Input Field Form */}
      <form onSubmit={handleCommentSubmit} className="mb-8">
        <div className="relative rounded-xl border border-purple-800/40 bg-purple-950/40 p-2 focus-within:border-purple-500/60 transition-colors">
          <div className="flex items-center gap-2 px-3 pt-2 pb-1 text-xs text-purple-400/70">
            <img 
              src={currentUser?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser?.name || 'Anon'}`} 
              alt="" 
              className="w-5 h-5 rounded-full object-cover"
            />
            <span>Posting as <strong className="text-purple-300">{currentUser?.name || "Guest"}</strong></span>
          </div>

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={currentUser ? "Share your thoughts or technical edits..." : "Please log in to post a comment."}
            disabled={!currentUser || submitting}
            className="w-full bg-transparent border-0 outline-0 text-purple-100 placeholder-purple-400/40 p-3 text-sm resize-none min-h-[80px]"
          />
          
          <div className="flex justify-end pt-2 border-t border-purple-900/20 px-2">
            <button 
              type="submit" 
              disabled={!currentUser || !newComment.trim() || submitting}
              className="rounded-lg bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900/40 disabled:text-purple-400/40 text-white px-4 py-2 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Send className="w-3 h-3" /> {submitting ? "Saving..." : "Push Comment"}
            </button>
          </div>
        </div>
      </form>

      {/* Render Thread Feed */}
      {commentsLoading ? (
        <div className="text-center py-6 text-sm text-purple-400/40 animate-pulse font-mono">Syncing thread messages...</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-10 text-sm text-purple-400/30 border border-dashed border-purple-900/30 rounded-xl">
          No replies written yet. Be the first to start the conversation!
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-4 rounded-xl border border-purple-900/20 bg-purple-950/10">
              <img 
                src={comment.author?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${comment.author?.name || 'User'}`} 
                alt="" 
                className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-800/40 object-cover shrink-0" 
              />
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-purple-200">{comment.author?.name || "Anonymous"}</h4>
                  <span className="text-xs text-purple-400/50">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-purple-200/70 leading-relaxed">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}