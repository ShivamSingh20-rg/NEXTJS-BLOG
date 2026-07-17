"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function EditArticlePage() {
  const router = useRouter();
  const { id } = useParams(); 

  const [form, setForm] = useState({ title: "", category: "", imageUrl: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load the initial article content
  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        setForm(response.data);
      } catch (err) {
        console.error("Failed to load article configurations", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadArticle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 💡 Submit data objects directly as a JSON payload body using Axios
      await axios.put(`/api/articles/${id}`, form);
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to update article");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-sm">Loading entry content data...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 grid gap-y-6">
      <header className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-950 tracking-tight">Edit Blog Post (Axios API)</h1>
      </header>

      <form onSubmit={handleSubmit} className="grid gap-y-6 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid gap-y-2">
          <label htmlFor="title" className="text-sm font-semibold text-gray-700">Article Title</label>
          <input
            id="title"
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 text-gray-900 rounded-md text-sm outline-none"
          />
        </div>

        <div className="grid gap-y-2">
          <label htmlFor="category" className="text-sm font-semibold text-gray-700">Category</label>
          <input
            id="category"
            type="text"
            required
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 text-gray-900 rounded-md text-sm outline-none"
          />
        </div>

        <div className="grid gap-y-2">
          <label htmlFor="imageUrl" className="text-sm font-semibold text-gray-700">Image Cover URL</label>
          <input
            id="imageUrl"
            type="url"
            required
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 text-gray-900 rounded-md text-sm outline-none"
          />
        </div>

        <div className="grid gap-y-2">
          <label htmlFor="content" className="text-sm font-semibold text-gray-700">Blog Content</label>
          <textarea
            id="content"
            rows={10}
            required
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-md text-sm outline-none resize-y"
          />
        </div>

        <div className="flex gap-4 justify-end">
          <Link href="/dashboard" className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-md text-sm font-medium">
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-md text-sm transition-colors"
          >
            {isSubmitting ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}