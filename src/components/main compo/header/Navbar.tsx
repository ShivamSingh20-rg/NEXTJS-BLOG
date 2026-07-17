"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Searchbar from "./Searchbar";
import ToggleMode from "./ToggleMode";

// 💡 Strictly type incoming session parameters passed down from layout.tsx
interface NavbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
console.log(user);

  
  
  const linkStyles = (path: string) =>
    `transition-colors duration-200 rounded-md px-2 py-1 font-medium ${
      pathname === path 
        ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 font-semibold" 
        : "text-gray-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-purple-50/50 dark:hover:bg-purple-950/20"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-purple-100 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo / Brand */}
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="text-xl font-bold tracking-tight hover:text-purple-600 group">
              <span className="text-violet-600 dark:text-violet-400 group-hover:text-purple-600 transition-colors">My</span>
              <span className="text-purple-600 dark:text-purple-400 group-hover:text-violet-600 transition-colors">Blog</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <Link href="/" className={linkStyles("/")}>Home</Link>
            <Link href="/about" className={linkStyles("/about")}>About</Link>
            <Link href="/allArticles" className={linkStyles("/articles")}>Articles</Link>
            {user && <Link href="/dashboard" className={linkStyles("/dashboard")}>Dashboard</Link>}
          </div>
          <div className="hidden sm:block flex-1 max-w-xs">
            <Searchbar />
          </div>

          
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center justify-center min-w-9 min-h-9 text-purple-600 dark:text-purple-400">
              <ToggleMode />
            </div>

            {user ? (
  <div className="flex items-center gap-3">
    
    <img
      src={user.image || "https://avatar.iran.liara.run/public"} 
      alt={user.name || "User Avatar"}
      referrerPolicy="no-referrer"
      className="w-8 h-8 rounded-full border border-purple-200 dark:border-slate-700 object-cover shadow-xs"
    />
    
    <span className="text-xs text-slate-500 max-w-[120px] truncate">
      Hi, {user.name?.split(" ")[0]}  
    </span>
    
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
    >
      Log out
    </button>
  </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className="rounded-md px-4 py-2 text-purple-700 dark:text-purple-300 transition-colors hover:bg-purple-50 dark:hover:bg-purple-950/30"
                >
                  Log in
                </Link>
                <Link
                  href="/login"
                  className="rounded-md bg-purple-600 px-4 py-2 text-white shadow-xs transition-all hover:bg-violet-700 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Layout Actions Row */}
          <div className="flex items-center gap-4 md:hidden">
            <div className="flex items-center justify-center min-w-9 min-h-9 text-purple-600 dark:text-purple-400">
              <ToggleMode />
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-600 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay Grid */}
      {isOpen && (
        <div className="md:hidden border-t border-purple-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-3 shadow-lg">
          <div className="space-y-1 px-2">
            <Link href="/" onClick={() => setIsOpen(false)} className={`block py-2 ${linkStyles("/")}`}>Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className={`block py-2 ${linkStyles("/about")}`}>About</Link>
            <Link href="/articles" onClick={() => setIsOpen(false)} className={`block py-2 ${linkStyles("/articles")}`}>Articles</Link>
            {user && <Link href="/dashboard" onClick={() => setIsOpen(false)} className={`block py-2 ${linkStyles("/dashboard")}`}>Dashboard</Link>}
          </div>
          
          <div className="px-2 pt-2 sm:hidden">
            <Searchbar />
          </div>

          <div className="flex items-center gap-3 px-2 pt-2 border-t border-purple-50 dark:border-slate-800 text-base font-medium">
            {user ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut({ redirectTo: "/" });
                }}
                className="w-full text-center rounded-md py-2 text-red-600 bg-red-50 dark:bg-red-950/20"
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center rounded-md py-2 text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40"
                >
                  Log in
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center rounded-md py-2 text-white bg-gradient-to-r from-purple-600 to-violet-600"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}