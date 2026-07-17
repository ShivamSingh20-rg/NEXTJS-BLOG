"use client";

 
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, FileText } from "lucide-react";



export default function Blogdashboard() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const handleCreateArticle = () => {
  redirect('/dashboard/new-article');

  };
  
useEffect(() => {
    if (status === "loading" || !session) return;

    const fetchDashboardMetrics = async () => {
      try {
        const response = await axios.get("/api/articles/overview");
        if (response.data.success) {
          setData(response.data);
        }
      } catch (err) {
        console.error("Dashboard overview pipeline broken:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardMetrics();
    console.log('data is ')
  }, [session, status]);

  if (loading) return <div className="text-purple-400 font-mono text-xs">Syncing grid metrics...</div>;
  return (
    <div className="grid gap-y-8">
      
      {/* Top Header Grid Area */}
      <header className="grid grid-cols-[1fr_auto] items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-950 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Here is what's happening with your blogs today.
          </p>
        </div>
        
         <button
          onClick={handleCreateArticle}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-sm shadow-sm transition-colors duration-200"
        >
          + Write New Article
        </button>
      </header>

      {/* Analytics Info Cards Grid */}
      <section className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 grid gap-y-2 shadow-sm">
          <h3 className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Total Articles</h3>
          <p className="text-3xl font-bold text-gray-900">{data?.metrics?.totalArticles}</p>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 grid gap-y-2 shadow-sm">
          <h3 className="text-xs font-semibold text-gray-400 tracking-wider uppercase text-xs font-semibold text-gray-400 tracking-wider uppercase">Total Reads</h3>
          <p className="text-3xl font-bold text-gray-900">12.4k</p>
        </div>
        
        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 grid gap-y-2 shadow-sm">
          <h3 className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Comments</h3>
          <p className="text-3xl font-bold text-gray-900">{data?.metrics?.totalComments}</p>
        </div>
      </section>

    <section className="p-6 rounded-2xl border border-purple-900/40 bg-purple-950/20 backdrop-blur-md shadow-[0_4px_30px_rgba(13,1,23,0.5)]">
  <div className="space-y-4">
    <h4 
      className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400/80 font-mono"
      style={{ textShadow: "0 0 10px rgba(168,85,247,0.2)" }}
    >
      Recent Publications
    </h4>

    {!data?.recentArticles || data.recentArticles.length === 0 ? (
      <div className="text-center py-12 rounded-2xl border border-dashed border-purple-900/40 bg-purple-950/5 text-sm font-mono text-purple-400/40">
        No dynamic content modules published yet.
      </div>
    ) : (
      /* Stack layout using CSS Grid */
      <div className="grid grid-cols-1 gap-4">
        {data.recentArticles.map((article: any) => (
          <div 
            key={article.id}
            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-purple-500/20 bg-purple-950/10 backdrop-blur-sm transition-all duration-300 gap-4 hover:border-purple-500/50 hover:bg-purple-950/30"
            style={{
              boxShadow: "inset 0 1px 1px 0 rgba(168, 85, 247, 0.05)"
            }}
          >
            {/* Left metadata layout info */}
            <div className="flex items-center gap-4">
              {article.imageUrl ? (
                <img 
                  src={article.imageUrl} 
                  alt="" 
                  className="w-12 h-12 rounded-lg object-cover border border-purple-500/30 group-hover:border-purple-400 transition-colors shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-purple-900/20 border border-purple-500/20 flex items-center justify-center shrink-0 text-purple-400 group-hover:text-purple-300 transition-colors">
                  <FileText className="w-4 h-4" />
                </div>
              )}
              
              <div className="space-y-1.5">
                <h5 className="text-sm font-bold text-purple-100 group-hover:text-purple-300 transition-colors line-clamp-1">
                  {article.title}
                </h5>
                <div className="flex items-center gap-3 text-xs text-purple-300/40 font-mono">
                  <span className="text-[10px] font-bold uppercase bg-purple-500/10 px-2 py-0.5 rounded text-white border border-purple-500/20 tracking-wider">
                    {article.category || "General"}
                  </span>
                  <span className="flex text-purple-900 items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-purple-800" />
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action Trigger Link Button */}
            
          </div>
        ))}
      </div>
    )}
  </div>
</section>

    </div>
  );
}