"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
 import Link from "next/link";
interface Article {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  createdAt: string;
  author?: {
    name: string;
    image: string;
  };
}
 
 function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <div 
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "linear-gradient(145deg, #1a0533 0%, #130220 100%)",
        border: "1px solid rgba(139, 92, 246, 0.15)",
        boxShadow: "0 4px 24px rgba(109, 40, 217, 0.08)",
        animationDelay: `${index * 60}ms`,
      }}
    > 
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          boxShadow: "0 0 0 1px rgba(167, 139, 250, 0.4), 0 8px 40px rgba(124, 58, 237, 0.25)",
        }}
      />

      {/* Image */}
      <div className="relative h-48 overflow-hidden" style={{ background: "#1e0842" }}>
        <img
          src={article.imageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643"}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        {/* Dark overlay fading to card bg */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(13,1,35,0.1) 50%, rgba(13,1,35,0.7) 100%)",
          }}
        />
        <span
          className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{
            background: "rgba(109,40,217,0.75)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(167,139,250,0.3)",
            color: "#e9d5ff",
          }}
        >
          {article.category || "General"}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-y-2">
        <h2
          className="text-base font-bold leading-snug line-clamp-2 transition-colors duration-200"
          style={{ color: "#ede9fe" }}
        >
          {article.title}
        </h2>

        <p className="text-[11px] mt-0.5" style={{ color: "#7c6b9e" }}>
          {new Date(article.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>

        {/* Author */}
        <div
          className="mt-auto pt-4 flex items-center gap-2.5"
          style={{ borderTop: "1px solid rgba(109,40,217,0.2)" }}
        >
         <img
  src={ article.author?.image ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${article.author?.name || "Anonymous"}`}
  alt={article.author?.name || "Author"}
  className="w-7 h-7 rounded-full object-cover shrink-0 ring-2 ring-violet-500/40" // <-- Added ring utilities here
/>
          <p className="text-xs font-semibold truncate" style={{ color: "#a78bfa" }}>
            {article.author?.name || "Anonymous Writer"}
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{
          background: "linear-gradient(to right, #7c3aed, #a855f7, #c084fc)",
        }}
      />
    </div>
  );
}

function SkeletonCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #1a0533, #130220)",
        border: "1px solid rgba(109,40,217,0.12)",
      }}
    >
      <div className="h-48 animate-pulse" style={{ background: "#1e0842" }} />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-2.5 w-16 rounded-full animate-pulse" style={{ background: "#2e1065" }} />
        <div className="h-4 rounded-full w-3/4 animate-pulse" style={{ background: "#2e1065" }} />
        <div className="h-4 rounded-full w-1/2 animate-pulse" style={{ background: "#2e1065" }} />
        <div
          className="mt-4 pt-4 flex items-center gap-2.5"
          style={{ borderTop: "1px solid rgba(109,40,217,0.15)" }}
        >
          <div className="w-7 h-7 rounded-full animate-pulse" style={{ background: "#2e1065" }} />
          <div className="h-3 rounded-full w-24 animate-pulse" style={{ background: "#2e1065" }} />
        </div>
      </div>
    </div>
  );
}

export default function AllArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        const response = await axios.get("/api/articles/all");
        setArticles(response.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllArticles();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0D0117", color: "#ede9fe" }}
    >
      {/* Ambient orb — signature element */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(109,40,217,0.18) 0%, rgba(76,29,149,0.08) 50%, transparent 75%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        {/* Header */}
        <header className="mb-14 text-center">
          <p
            className="text-[10px] uppercase tracking-[0.35em] font-bold mb-4"
            style={{ color: "#7c3aed" }}
          >
            The blog
          </p>
          <h1
            className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none mb-4"
            style={{
              background: "linear-gradient(135deg, #c4b5fd 0%, #a855f7 50%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            All Articles
          </h1>
          <div
            className="mx-auto w-16 h-[2px] rounded-full mb-5"
            style={{ background: "linear-gradient(to right, #7c3aed, #a855f7)" }}
          />
          <p className="text-base max-w-md mx-auto" style={{ color: "#7c6b9e" }}>
            Browse through all available articles instantly.
          </p>
        </header>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div
            className="py-28 text-center rounded-2xl"
            style={{
              background: "rgba(109,40,217,0.05)",
              border: "1px dashed rgba(109,40,217,0.25)",
              color: "#7c6b9e",
            }}
          >
            <p className="text-lg font-semibold mb-2" style={{ color: "#a78bfa" }}>
              Nothing here yet
            </p>
            <p className="text-sm">Check back soon — articles are on their way.</p>
          </div>
        ) : (


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
            <Link href={`/articledetail/${article.id}`} key={article.id} className="block">
  <ArticleCard article={article} index={i} />
</Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}