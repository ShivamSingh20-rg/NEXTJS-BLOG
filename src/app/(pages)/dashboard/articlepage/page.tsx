"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Article {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  createdAt: Date | string;
}

export default function articleDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 💡 Fetching data with Axios inside useEffect
  useEffect(() => {
    const fetchArticlesData = async () => {
      try {
        const response = await axios.get("/api/articles");
        setArticles(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to load dashboard workspace records.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticlesData();
  }, []);

   
  const handleDeleteClick = async (articleId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this article?");
    if (!confirmDelete) return;

    try {
   
      await axios.delete(`/api/articles/${articleId}`);
      
       
      setArticles((prev) => prev.filter((item) => item.id !== articleId));
    } catch (err: any) {
      alert(err.response?.data?.error || "An error occurred while attempting to delete.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-sm font-medium text-purple-600">
        Loading dashboard workspace metrics...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 grid gap-y-8 bg-slate-50 min-h-screen">
      
      {/* Workspace Summary Header section */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-purple-100 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Workspace Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your posts via Axios endpoint handlers.
          </p>
        </div>
        <Link
          href="/dashboard/new-article"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-md text-sm font-semibold shadow-xs transition-colors self-start sm:self-center"
        >
          + Create New Post
        </Link>
      </header>

      {/* Error Alert Display Box */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      {/* Metric Counters Analytics row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-purple-100 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Publications
          </p>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            {articles.length}
          </p>
        </div>
      </div>

      {/* Primary Articles Management Container Table */}
      <div className="bg-white rounded-lg border border-purple-100 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-purple-100 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-900">Your Recent Articles</h2>
        </div>

        {articles.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            You haven't posted any articles yet. Click "+ Create New Post" to publish your first idea!
          </div>
        ) : (
          <div className="divide-y divide-purple-50">
            {articles.map((article) => (
              <div
                key={article.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-purple-50/20 transition-colors"
              >
                {/* Media and Metadata Grid Box */}
                <div className="flex gap-4 items-center min-w-0">
                  <img
                    src={article.imageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643"}
                    alt=""
                    className="w-16 h-16 object-cover rounded-md bg-slate-100 border border-purple-100 hidden sm:block"
                  />
                  <div className="min-w-0">
                    <span className="inline-block bg-purple-50 text-purple-700 text-xs px-2 py-0.5 rounded-md font-semibold mb-1">
                      {article.category}
                    </span>
                    <h3 className="font-semibold text-slate-950 truncate max-w-md sm:max-w-lg text-base">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Published on {new Date(article.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Control Action Buttons Wrapper */}
                <div className="flex items-center gap-x-2 self-end sm:self-center">
                  <Link
                    href={`/dashboard/edit/${article.id}`}
                    className="text-sm font-semibold text-purple-600 hover:text-purple-700 px-3 py-2 rounded-md hover:bg-purple-50 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(article.id)}
                    type="button"
                    className="text-sm font-semibold text-red-600 hover:text-red-700 px-3 py-2 rounded-md hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}