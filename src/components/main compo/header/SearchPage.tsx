"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface Article {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  createdAt: string;
  author?: { name: string; image: string };
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchDataFromDB = async () => {
      if (!searchQuery.trim()) return;
      setLoading(true);
      try {
        const response = await axios.get(`/api/articles/search?search=${encodeURIComponent(searchQuery)}`);
        setArticles(response.data);
      } catch (err) {
        console.error("Failed executing backend search request:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchDataFromDB();
  }, [searchQuery]); // Runs every time the user submits a new search query from the navbar

  if (loading) {
    return (
      <div className="text-center py-20 text-purple-600 font-semibold text-sm">
        Querying database rows...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:px-12 lg:px-16 min-h-screen text-slate-900">
      <header className="mb-12 border-b border-purple-100 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
          Search Results
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Showing matching database records for: <strong className="text-purple-700">"{searchQuery}"</strong>
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="py-20 text-center text-slate-400 text-sm">
          No articles match your keyword inside our database records.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-start items-start">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-purple-200 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img src={article.imageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643"} alt="" className="h-full w-full object-cover" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-purple-700 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border border-purple-100">
                  {article.category || "General"}
                </span>
              </div>
              <div className="flex flex-col flex-1 p-5 gap-y-2">
                <h2 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-purple-700 transition-colors">
                  {article.title}
                </h2>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-2.5">
                  <img src={article.author?.image || `https://api.dicebear.com/7.x/initials/svg?seed=Anonymous`} alt="" className="w-7 h-7 rounded-full" />
                  <p className="text-xs font-semibold text-slate-600 truncate">{article.author?.name || "Anonymous"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-sm text-slate-400">Loading components...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}