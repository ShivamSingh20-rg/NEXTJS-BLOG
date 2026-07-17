"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import CommentSection from "@/components/main compo/hero/Comment";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (!id) return;
    
    const fetchArticleData = async () => {
      try {
        const response = await axios.get(`/api/articles/detail/${id}`);
        setArticle(response.data);
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setPageLoading(false);
      }
    };
    
    fetchArticleData();
  }, [id]);

  // ── LOADING STATE ──
  if (pageLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0D0117" }}
      >
        <div
          aria-hidden
          className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(109,40,217,0.18) 0%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "rgba(167,139,250,0.4)", borderTopColor: "#a855f7" }}
          />
          <p
            className="text-sm font-semibold tracking-widest uppercase animate-pulse"
            style={{ color: "#7c3aed" }}
          >
            Loading article…
          </p>
        </div>
      </div>
    );
  }

  // ── NOT FOUND STATE ──
  if (!article) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0D0117" }}
      >
        <div className="text-center">
          <p className="text-5xl font-extrabold mb-3" style={{ color: "#a855f7" }}>
            404
          </p>
          <p className="text-lg mb-6" style={{ color: "#7c6b9e" }}>
            Article not found.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2.5 rounded-full text-sm font-bold transition-colors cursor-pointer"
            style={{
              background: "rgba(109,40,217,0.2)",
              border: "1px solid rgba(167,139,250,0.3)",
              color: "#c4b5fd",
            }}
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  // ── ARTICLE DISPLAY RENDER ──
  return (
    <div className="min-h-screen relative" style={{ background: "#0D0117", color: "#ede9fe" }}>
      {/* Fixed ambient orb */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(109,40,217,0.16) 0%, rgba(76,29,149,0.06) 55%, transparent 75%)",
          filter: "blur(70px)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-28">
        {/* Back button */}
        <button
          onClick={() => router.push("/")}
          className="group mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
          style={{ color: "#7c3aed" }}
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="group-hover:text-purple-400 transition-colors">Back to Feed</span>
        </button>

        {/* Hero Image */}
        {article.imageUrl && (
          <div
            className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10"
            style={{ border: "1px solid rgba(109,40,217,0.2)" }}
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        )}

        {/* Category Badge */}
        {article.category && (
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-3 h-3" style={{ color: "#a855f7" }} />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: "#a855f7" }}
            >
              {article.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className="text-3xl md:text-5xl font-extrabold leading-tight mb-8"
          style={{
            background: "linear-gradient(135deg, #f5f3ff 0%, #c4b5fd 60%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {article.title}
        </h1>

        {/* Meta Author & Date Row */}
        <div
          className="flex flex-wrap items-center gap-6 text-sm mb-12 py-4"
          style={{
            borderTop: "1px solid rgba(109,40,217,0.2)",
            borderBottom: "1px solid rgba(109,40,217,0.2)",
          }}
        >
          {/* Author info */}
          <div className="flex items-center gap-2.5">
            {article.author?.image ? (
              <img
                src={article.author.image}
                alt={article.author.name || "Author"}
                className="w-7 h-7 rounded-full object-cover"
                style={{ border: "2px solid rgba(139,92,246,0.4)" }}
              />
            ) : (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "rgba(109,40,217,0.3)" }}
              >
                <User className="w-3.5 h-3.5" style={{ color: "#a78bfa" }} />
              </div>
            )}
            <span style={{ color: "#a78bfa" }}>{article.author?.name || "Anonymous"}</span>
          </div>

          {/* Published date */}
          <div className="flex items-center gap-2" style={{ color: "#7c6b9e" }}>
            <Calendar className="w-4 h-4" style={{ color: "#7c3aed" }} />
            <span>
              {article.createdAt 
                ? new Date(article.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Recent Post"}
            </span>
          </div>
        </div>

        {/* Article Body Content */}
        <article
          className="prose prose-invert max-w-none mb-20 leading-[1.85] text-base"
          style={{
            color: "rgba(237,233,254,0.75)",
            "--tw-prose-headings": "#c4b5fd",
            "--tw-prose-links": "#a855f7",
            "--tw-prose-bold": "#ede9fe",
            "--tw-prose-code": "#c4b5fd",
            "--tw-prose-quotes": "#7c6b9e",
            "--tw-prose-hr": "rgba(109,40,217,0.25)",
          } as React.CSSProperties}
        >
          {article.content}
        </article>

        {/* Visual Line Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div
            className="flex-1 h-px"
            style={{ background: "linear-gradient(to right, rgba(109,40,217,0.4), transparent)" }}
          />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.3em]"
            style={{ color: "#7c3aed" }}
          >
            Comments
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "linear-gradient(to left, rgba(109,40,217,0.4), transparent)" }}
          />
        </div>

        {/* Comments section component wrapper */}
        <CommentSection 
          articleId={id as string} 
          currentUser={session?.user} 
        />
      </div>
    </div>
  );
}