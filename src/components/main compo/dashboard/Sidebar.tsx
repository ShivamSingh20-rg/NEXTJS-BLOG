"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/dashboard" },
  { label: "Articles", href: "/dashboard/articlepage" },
   
  { label: "Comments", href: "/dashboard/comments" },
  
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleCreateArticle = () => {
    alert("Open create article modal or navigate to /dashboard/new");
  };

  return (
    <aside className="bg-slate-800  border-gray-200 grid grid-rows-[auto_1fr_auto] p-6 h-full">
      {/* Brand / Logo */}
      <div className="text-xl font-bold text-violet-600 dark:text-violet-400 group-hover:text-purple-600 transition-colors mb-8">
        BlogConsole
      </div>

      {/* Navigation Links Grid */}
      <nav className="grid  gap-y-2 content-start">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-white hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Action Button */}
      <div className="mt-auto">
        <button
          onClick={handleCreateArticle}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-sm shadow-sm transition-colors duration-200"
        >
          + New Article
        </button>
      </div>
    </aside>
  );
}