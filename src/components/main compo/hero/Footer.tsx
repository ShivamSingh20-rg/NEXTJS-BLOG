"use client";

import React from "react";
import Link from "next/link";
import { Terminal, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer 
      className="relative w-full border-t border-purple-900/30 overflow-hidden" 
      style={{ background: "#0D0117" }}
    >
      {/* Structural Layout Wrapper - Using CSS Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        
        {/* Brand column */}
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 font-mono tracking-widest text-sm font-extrabold uppercase text-purple-200">
            <Terminal className="w-4 h-4 text-purple-500" />
            <span>Dev<span style={{ color: "#a855f7" }}>Blog</span></span>
          </Link>
          <p className="text-xs leading-relaxed max-w-[280px]" style={{ color: "#7c6b9e" }}>
            Exploring modern web architectures, backend systems, and frontend optimizations. 
          </p>
        </div>

        {/* Quick Links Column - Structured using CSS Grid */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#a855f7" }}>
            Navigation
          </h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-semibold">
            <li>
              <Link href="/" className="text-purple-300/70 hover:text-purple-200 transition-colors inline-flex items-center gap-0.5 group">
                Feed <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-purple-500" />
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-purple-300/70 hover:text-purple-200 transition-colors inline-flex items-center gap-0.5 group">
                Write <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-purple-500" />
              </Link>
            </li>
            <li>
              <Link href="/profile" className="text-purple-300/70 hover:text-purple-200 transition-colors inline-flex items-center gap-0.5 group">
                Profile <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-purple-500" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Social / Connect Column */}
        <div className="space-y-4 md:justify-self-end">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#a855f7" }}>
            Connect
          </h4>
          <div className="flex items-center gap-4">
            {/* Custom GitHub SVG */}
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg border border-purple-900/30 bg-purple-950/10 hover:border-purple-500/40 text-purple-400 hover:text-purple-200 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </a>
            {/* Custom X/Twitter SVG */}
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg border border-purple-900/30 bg-purple-950/10 hover:border-purple-500/40 text-purple-400 hover:text-purple-200 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            {/* Custom LinkedIn SVG */}
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg border border-purple-900/30 bg-purple-950/10 hover:border-purple-500/40 text-purple-400 hover:text-purple-200 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>

      </div>

      {/* Sub-Footer Copyright Bar */}
      <div className="border-t border-purple-950/40 relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono" style={{ color: "#5c4d7d" }}>
          <span>© {new Date().getFullYear()} Shivam Singh. All rights reserved.</span>
          <span>Built with Next.js & Prisma</span>
        </div>
      </div>

      {/* Subtle bottom background glow effect */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(168,85,247,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />
    </footer>
  );
}