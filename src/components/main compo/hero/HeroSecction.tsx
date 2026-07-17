"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-900 py-20 lg:py-32 transition-colors duration-200">
      
      {/* 💡 TWO-TONE PURPLE GRADIENT BACKGROUND MESH */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] rounded-full bg-purple-300 blur-[120px] dark:bg-purple-900/50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50rem] h-[50rem] rounded-full bg-violet-300 blur-[120px] dark:bg-violet-900/50" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Left Block: Text Content */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <span className="inline-flex items-center justify-center lg:justify-start gap-2 text-sm font-semibold tracking-wider text-purple-600 dark:text-purple-400 uppercase mb-4">
              ✨ Welcome to the Future of Blogging
            </span>
            
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl max-w-2xl leading-none">
              Stories that shape ideas,{" "}
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-violet-400">
                written for developers.
              </span>
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
              Explore deep dives into Next.js, full-stack database management with Neon, Prisma, and modern clean architecture. Elevate your engineering craft today.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 font-medium text-sm">
              <Link
                href="/articles"
                className="w-full sm:w-auto text-center rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3.5 text-white shadow-md hover:from-purple-700 hover:to-violet-700 transition-all duration-200 hover:-translate-y-0.5"
              >
                Read Articles
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto text-center rounded-xl border border-purple-200 dark:border-slate-700 bg-purple-50/40 dark:bg-slate-800/50 px-6 py-3.5 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 transition-all duration-200"
              >
                Create a Post &rarr;
              </Link>
            </div>
          </div>

          {/* Right Block: Image / Graphic Box */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-xl aspect-square rounded-3xl p-4 bg-gradient-to-tr from-purple-100 to-violet-100 dark:from-slate-800 dark:to-purple-950/40 shadow-xl ring-1 ring-purple-100 dark:ring-slate-800">
              
              {/* Core Image Graphic Frame using the Two-Tone Purples */}
              <div className="w-full h-full overflow-hidden rounded-2xl   relative group flex items-center justify-center">
                
                 
                <Image
                  src="https://img.magnific.com/free-photo/teamwork-making-online-blog_53876-94868.jpg?semt=ais_hybrid&w=740&q=80" // 👈 Drop your image file in the 'public/' directory and update this path
                  alt="Developer analytics dashboard illustration"
                  fill
                  priority
                  sizes="(max-w-7xl) 50vw, 100vw"
                  className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                />

                {/* Text overlay overlaying the background image subtly */}
                <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 rounded-xl p-4 text-center">
                  <span className="font-mono text-xs text-white opacity-90 tracking-widest">
                    &lt;code, create, inspire /&gt;
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}