"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { Search, ShoppingCart, DollarSign, RefreshCw, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─── Floating badge component ─────────────────────────────────────────── */
function Badge({
  label,
  value,
  position,
  delay,
}: {
  label: string;
  value?: string;
  position: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className={`absolute ${position} flex items-center gap-1.5  border-[#00aaff44] bg-[#0a1628cc] backdrop-blur-sm px-3 py-1.5 rounded-sm text-[10px] font-mono tracking-widest text-[#00aaff]`}
      style={{ boxShadow: "0 0 12px #00aaff22" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#00aaff] animate-pulse" />
      {label}
      {value && <span className="text-white/60 ml-1">{value}</span>}
    </motion.div>
  );
}

/* ─── Animated scan line overlay ─────────────────────────────────────────── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00aaff55] to-transparent pointer-events-none"
      initial={{ top: "0%" }}
      animate={{ top: "100%" }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
    />
  );
}

/* ─── Starfield background ─────────────────────────────────────────────── */
function Starfield() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: s.delay }}
        />
      ))}
    </div>
  );
}

/* ─── Main Hero ─────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const [inputVal, setInputVal] = useState("");
  const placeholder = "Describe your dream drive… (e.g. 'Silent ele";

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center bg-black overflow-hidden px-8 md:px-16 lg:px-24">
      {/* ── background layers ── */}
      <Starfield />
      {/* radial glow left */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#001f4a] blur-[120px] opacity-60 pointer-events-none" />
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00aaff 1px, transparent 1px), linear-gradient(90deg, #00aaff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── pill badge top ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-8 md:left-16 lg:left-24 flex items-center gap-2 border border-[#00aaff55] bg-[#00aaff11] px-4 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#00aaff]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00aaff] animate-pulse" />
        NEXT-GEN AI CORE V4.2
      </motion.div>

      {/* ── two-column layout ── */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12 mt-16">
        {/* LEFT: text + search */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex-1 max-w-xl"
        >
          {/* heading */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-white"
            
          >
            The Future of
            <br />
            <span className="text-[#00aaff]">Driving,</span>
            <br />
            <span className="text-[#00aaff]">Predicted</span>
            <br />
            by AI.
          </motion.h1>

          {/* subtext */}
          <motion.p variants={fadeUp} className="mt-5 text-sm text-gray-400 leading-relaxed max-w-sm">
            Rimello leverages neural networks to curate your perfect automotive match. Beyond
            specs—we analyze soul, style, and future value.
          </motion.p>

          {/* search bar */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex items-center bg-[#0c1d34] border border-[#00aaff33] rounded-sm overflow-hidden"
            style={{ boxShadow: "0 0 20px #00aaff11" }}
          >
            <Zap className="text-[#00aaff] ml-4 flex-shrink-0" size={16} />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none px-4 py-3.5 text-sm text-white placeholder-gray-600 font-mono"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#00aaff] text-black px-6 py-3.5 text-xs font-black tracking-widest uppercase flex-shrink-0"
            >
              INITIATE MATCH
            </motion.button>
          </motion.div>

          {/* bottom nav icons */}
          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-6">
            {[
              { icon: ShoppingCart, label: "NEW CARS" },
              { icon: DollarSign, label: "USED" },
              { icon: RefreshCw, label: "SELL" },
            ].map(({ icon: Icon, label }) => (
              <motion.button
                key={label}
                whileHover={{ y: -2 }}
                className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-[#00aaff] transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-full border border-gray-700 hover:border-[#00aaff44] flex items-center justify-center transition-colors duration-200">
                  <Icon size={14} />
                </div>
                <span className="text-[9px] font-mono tracking-widest">{label}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: car image card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          className="flex-1 relative max-w-[600px] w-full"
        >
          {/* card frame */}
          <div
            className="relative rounded-sm border border-[#00aaff22] bg-gradient-to-br from-[#0a1628] to-[#040d1a] overflow-hidden"
            style={{ boxShadow: "0 0 60px #00aaff15, inset 0 0 40px #00000040" }}
          >
            {/* scan line */}
            <ScanLine />

            {/* corner accents */}
            {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
              "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
              <div key={i} className={`absolute w-5 h-5 border-[#00aaff] ${cls}`} />
            ))}

            {/* car image */}
            <div className="relative h-64 md:h-80 flex items-center justify-center p-6">
              {/* ambient glow behind car */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-[#00aaff] blur-[50px] opacity-10 rounded-full" />

              {/* placeholder for the car — falls back to alt image on error */}
              <motion.img
                src="/images/hero-car.png"
                alt="Featured vehicle"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full max-w-[440px] object-contain drop-shadow-[0_0_30px_rgba(0,170,255,0.2)] relative z-10"
                onError={(e) => {
                  // fallback: switch to global alt placeholder image
                  (e.target as HTMLImageElement).src = "/alt.png";
                }}
              />

              {/* fallback SVG car silhouette if no image */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg viewBox="0 0 200 80" className="w-4/5 opacity-20 fill-[#00aaff]">
                  <path d="M30 55 L20 55 L15 45 L25 30 L55 20 L120 18 L155 28 L175 40 L185 55 L170 55 Q168 65 158 65 Q148 65 146 55 L54 55 Q52 65 42 65 Q32 65 30 55Z" />
                </svg>
              </motion.div>
            </div>

            {/* floating badges */}
            <Badge
              label="PERFORMANCE_CORE_READY"
              position="top-4 left-4"
              delay={0.8}
            />
            <Badge
              label="AERODYNAMICS:"
              value="0.21cd"
              position="bottom-4 right-4"
              delay={1.0}
            />
          </div>

          {/* outer glow ring */}
          <motion.div
            className="absolute -inset-px rounded-sm pointer-events-none"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ boxShadow: "0 0 30px #00aaff18" }}
          />
        </motion.div>
      </div>
    </section>
  );
}