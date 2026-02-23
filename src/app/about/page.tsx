// app/about/page.tsx

"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* ================= HERO ================= */}
      <section className="relative px-6 pt-28 pb-20 max-w-7xl mx-auto text-center">
        <div className="inline-block px-4 py-1 text-xs tracking-widest rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
          THE FUTURE OF AUTOMOTIVE INTELLIGENCE
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Redefining the way we{" "}
          <span className="text-blue-500">move.</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          Rimello is a pioneering AI-powered automotive ecosystem.
          We combine deep neural networks with expert human analysis
          to deliver the world’s most intelligent car buying experience.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 transition font-medium">
            Explore Technology
          </button>
          <button className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/5 transition font-medium">
            Watch Manifesto
          </button>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="h-[420px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-500">
            Hero Image
          </div>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="px-6 py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>

          <p className="text-gray-400 mb-6">
            At Rimello, we are on a mission to remove friction from car buying.
            For too long, the process has been opaque, stressful, and inefficient.
          </p>

          <p className="text-gray-400 mb-8">
            By combining machine learning with human-level insight, we provide
            a seamless, transparent, and intelligent path to your perfect vehicle.
          </p>

          <div className="flex gap-10">
            <div>
              <h3 className="text-2xl font-bold">99.8%</h3>
              <p className="text-gray-500 text-sm">MATCH ACCURACY</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">12ms</h3>
              <p className="text-gray-500 text-sm">LATENCY SPEED</p>
            </div>
          </div>
        </div>

        {/* Mission Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
          <FeatureItem title="Cognitive Analysis" desc="Deep learning AI understands buyer behavior." />
          <FeatureItem title="Global Inventory Sync" desc="2.4M+ vehicles indexed in real-time." />
          <FeatureItem title="Value Forecasting" desc="Predictive depreciation modeling." />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="px-6 py-24 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold">How it Works</h2>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Our proprietary technology transforms millions of data points
          into a personalized recommendation engine.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          <Card
            title="Neural Matching"
            desc="Our AI analyzes your driving habits, terrain preferences, and lifestyle constraints."
          />
          <Card
            title="Expert Analysis"
            desc="Human AI experts refine AI’s selections to ensure real-world reliability."
          />
          <Card
            title="Smart Acquisition"
            desc="Automated negotiation and transparent financing options."
          />
        </div>
      </section>

      {/* ================= INTELLIGENCE LAYER ================= */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-900/20 to-transparent border border-white/10 rounded-3xl p-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold">
              The Rimello <br />
              <span className="text-blue-500">Intelligence Layer</span>
            </h2>

            <p className="text-gray-400 mt-6">
              Our architecture is built on top of high-performance computing clusters
              capable of processing trillions of market signals every second.
            </p>

            <ul className="mt-6 space-y-3 text-gray-300">
              <li>• Real-time market volatility tracking</li>
              <li>• Computer vision for vehicle inspection reports</li>
              <li>• NLP for owner history sentiment analysis</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 h-[260px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold">40ms</div>
              <div className="text-sm text-blue-400">INFERENCE TIME</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="text-center py-24 px-6 border-t border-white/10">
        <h2 className="text-3xl font-bold">Ready to meet your perfect match?</h2>
        <p className="text-gray-400 mt-4">
          Stop searching. Start finding with Rimello’s AI Matcher.
        </p>

        <Link href="/matcher">
          <button className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition">
            Start AI Matching Session
          </button>
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 px-6 py-10 text-sm text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="font-semibold text-white">Rimello</div>
            <p className="mt-2">
              © 2026 Rimello Intelligence Systems. All rights reserved.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <div className="text-white font-medium mb-2">Platform</div>
              <ul className="space-y-1">
                <li>AI Matcher</li>
                <li>Market Tracker</li>
                <li>Pricing Index</li>
              </ul>
            </div>

            <div>
              <div className="text-white font-medium mb-2">Company</div>
              <ul className="space-y-1">
                <li>About</li>
                <li>Careers</li>
                <li>Legal</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-left hover:border-blue-500/40 transition">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
      <div className="mt-6 text-blue-400 text-sm cursor-pointer">
        Learn more →
      </div>
    </div>
  );
}

function FeatureItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h4 className="font-medium text-white">{title}</h4>
      <p className="text-gray-400 text-sm mt-1">{desc}</p>
    </div>
  );
}