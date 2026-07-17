import React from 'react';
import AllArticles from '@/components/main compo/hero/allArticles';
import HeroSection from '@/components/main compo/hero/HeroSecction';

function Home() {
  return (
    // 💡 Main container structured completely with Grid layout for seamless scaling
    <div className="grid grid-cols-1 w-full min-h-screen bg-white text-slate-900 transition-colors duration-200">
      
      {/* 1. Top Section */}
      <section className="w-full">
        <HeroSection />
      </section>

      
      <main >
        <div className="border-t border-slate-100 ">
          <AllArticles />
        </div>
      </main>

    </div>
  );
}

export default Home;