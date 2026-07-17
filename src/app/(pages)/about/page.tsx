// pages/about.tsx (or app/about/page.tsx)
import type { NextPage } from "next";
import Head from "next/head";

const values = [
  {
    label: "Clarity over noise",
    desc: "We prioritize clean formatting, markdown support, and readable typography. If a post is hard to read, we fix the layout.",
  },
  {
    label: "Dev-first execution",
    desc: "Built by developers, for developers. We treat technical writing like production code—clean, versioned, and modular.",
  },
  {
    label: "Knowledge compounds",
    desc: "Writing down what you learn transforms fleeting debug sessions into permanent digital assets for the community.",
  },
  {
    label: "Share in public",
    desc: "We believe the best insights are found in raw, unedited drafts and open iteration loops. Perfection is the enemy of sharing.",
  },
];

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Us | DevJournal</title>
        <meta name="description" content="The publishing ecosystem built for engineering minds." />
      </Head>

      <div className="min-h-screen bg-[#0D0117] text-white font-sans">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden pt-40 pb-32 px-6 text-center">
          {/* Signature orb — the one memorable element */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
          >
            <div
              className="w-[900px] h-[600px] rounded-full opacity-30 blur-[120px]"
              style={{
                background:
                  "radial-gradient(ellipse at center, #7C3AED 0%, #4C1D95 45%, transparent 75%)",
              }}
            />
          </div>

          <p className="relative text-xs uppercase tracking-[0.3em] text-purple-400 font-semibold mb-6">
            About the platform
          </p>
          <h1 className="relative text-5xl md:text-7xl font-extrabold leading-[1.08] tracking-tight max-w-4xl mx-auto">
            The publishing stack{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
              engineers deserve.
            </span>
          </h1>
          <p className="relative mt-8 text-lg md:text-xl text-purple-200/60 max-w-2xl mx-auto leading-relaxed">
            Founded in 2022, we started as a local scratchpad script and evolved into 
            a global publishing home for thousands of developers. Here's our story.
          </p>
        </section>

        {/* ── MISSION ── */}
        <section className="max-w-5xl mx-auto px-6 pb-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-purple-500 font-semibold mb-4">
              Our mission
            </p>
            <h2 className="text-4xl font-bold leading-snug mb-6">
              Less friction. Better articles.
            </h2>
            <p className="text-purple-200/60 leading-relaxed mb-4">
              The typical technical article is buried under cookie popups, heavy analytics scripts, 
              and clunky editors. We hate that. Our platform collapses the authoring pipeline so 
              you can write in standard Markdown and push to production instantly.
            </p>
            <p className="text-purple-200/60 leading-relaxed">
              We aren't here to host superficial clickbait lists. We are building a clean, lightweight 
              database of production case studies, debugging roadmaps, and honest documentation.
            </p>
          </div>

          {/* Stat card */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "150k+", label: "active readers" },
              { n: "12ms", label: "avg. cache load time" },
              { n: "85%", label: "dev engagement lift" },
              { n: "2022", label: "year platform launched" },
            ].map(({ n, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-purple-800/40 bg-purple-950/40 p-6 backdrop-blur-sm"
              >
                <p className="text-3xl font-extrabold text-purple-300">{n}</p>
                <p className="mt-1 text-sm text-purple-400/70">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── VALUES GRID (Kept intact with new data mapping) ── */}
        <section className="max-w-5xl mx-auto px-6 pb-32">
          <p className="text-xs uppercase tracking-[0.25em] text-purple-500 font-semibold mb-12 text-center">
            Our Core Principles
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((val) => (
              <div 
                key={val.label} 
                className="p-8 rounded-2xl border border-purple-900/30 bg-purple-950/10 hover:border-purple-500/30 transition-colors"
              >
                <h3 className="text-xl font-bold text-purple-200 mb-3">{val.label}</h3>
                <p className="text-purple-200/50 leading-relaxed text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
};

export default AboutPage;