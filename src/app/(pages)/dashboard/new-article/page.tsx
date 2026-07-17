"use client";

import React, { useState } from "react";
import { createNewArticle } from "@/actions/blog";

export default function NewArticlePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    try {
      await createNewArticle(formData);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-y-6 max-w-4xl mx-auto p-4">
      {/* Header Layout */}
      <header className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-950 tracking-tight">
          Create New Blog Post
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Draft your details securely using direct framework server actions.
        </p>
      </header>

      {/* Error Panel banner */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      {/* Main Form Fields Layout */}
      <form onSubmit={handleSubmit} className="grid gap-y-6 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        
        {/* Title Field Grid */}
        <div className="grid gap-y-2">
          <label htmlFor="title" className="text-sm font-semibold text-gray-700">
            Article Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="e.g., Understanding MERN Stack Performance Optimization"
            className="w-full px-4 py-2.5 border border-gray-300 text-gray-900 bg-white rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition-all"
          />
        </div>

        {/* Category Field Grid */}
        <div className="grid gap-y-2">
          <label htmlFor="category" className="text-sm font-semibold text-gray-700">
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            required
            placeholder="e.g., Web Development, Tutorials, Database"
            className="w-full px-4 py-2.5 border border-gray-300 text-gray-900 bg-white rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition-all"
          />
        </div>

        {/* Image URL Field Grid */}
        <div className="grid gap-y-2">
          <label htmlFor="imageUrl" className="text-sm font-semibold text-gray-700">
            Image Cover URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            required
            placeholder="https://images.unsplash.com/your-photo-link"
            className="w-full px-4 py-2.5 border border-gray-300 text-gray-900 bg-white rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition-all"
          />
        </div>

        {/* Content Box Text Area Grid */}
        <div className="grid gap-y-2">
          <label htmlFor="content" className="text-sm font-semibold text-gray-700">
            Blog Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={10}
            required
            placeholder="Type down the layout contents here..."
            className="w-full px-4 py-3 border border-gray-300 text-gray-900 bg-white rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition-all resize-y"
          />
        </div>

        {/* Dynamic Submission Buttons Group */}
        <div className="grid grid-cols-2 gap-4 justify-end md:w-1/2 md:ml-auto">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-md text-sm shadow-sm transition-colors"
          >
            {isSubmitting ? "Publishing..." : "Publish Blog"}
          </button>
        </div>

      </form>
    </div>
  );
}