"use client";

import { motion, useAnimation, Variants, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface ScanChip {
  id: string;
  label: string;
  value: string;
  unit?: string;
  position: string; // tailwind absolute position classes
  lineFrom: { x: number; y: number }; // % within card
  lineTo: { x: number; y: number };   // % within card (car anchor point)
  delay: number;
  color: string; // accent color token
}

/* ─── Scan chips data ────────────────────────────────────────────────────── */
const CHIPS: ScanChip[] = [
  {
    id: "torque",
    label: "TORQUE",
    value: "612",
    unit: "Nm",
    position: "top-[14%] left-[2%]",
    lineFrom: { x: 22, y: 22 },
    lineTo: { x: 38, y: 50 },
    delay: 1.1,
    color: "#00aaff",
  },
  {
    id: "aero",
    label: "DRAG COEFF",
    value: "0.21",
    unit: "Cd",
    position: "top-[8%] right-[2%]",
    lineFrom: { x: 78, y: 20 },
    lineTo: { x: 62, y: 44 },
    delay: 1.4,
    color: "#00ffcc",
  },
  {
    id: "power",
    label: "POWER",
    value: "523",
    unit: "BHP",
    position: "bottom-[18%] left-[1%]",
    lineFrom: { x: 21, y: 76 },
    lineTo: { x: 36, y: 60 },
    delay: 1.7,
    color: "#ff6b35",
  },
  {
    id: "battery",
    label: "RANGE",
    value: "487",
    unit: "km",
    position: "bottom-[12%] right-[1%]",
    lineFrom: { x: 79, y: 78 },
    lineTo: { x: 64, y: 62 },
    delay: 2.0,
    color: "#a855f7",
  },
  {
    id: "weight",
    label: "WEIGHT",
    value: "1,847",
    unit: "kg",
    position: "top-[44%] right-[-1%]",
    lineFrom: { x: 80, y: 50 },
    lineTo: { x: 66, y: 52 },
    delay: 2.3,
    color: "#facc15",
  },
];

/* ─── Scan state machine ─────────────────────────────────────────────────── */
type ChipState = "hidden" | "scanning" | "locked";

function useChipStates(chips: ScanChip[]) {
  const [states, setStates] = useState<Record<string, ChipState>>({});

  useEffect(() => {
    chips.forEach((chip) => {
      const t1 = setTimeout(() => {
        setStates((s) => ({ ...s, [chip.id]: "scanning" }));
      }, chip.delay * 1000);

      const t2 = setTimeout(() => {
        setStates((s) => ({ ...s, [chip.id]: "locked" }));
      }, (chip.delay + 0.9) * 1000);

      return () => { clearTimeout(t1); clearTimeout(t2); };
    });
  }, []);

  return states;
}

/* ─── Targeting reticle corners ─────────────────────────────────────────── */
function Reticle({ color, state }: { color: string; state: ChipState }) {
  const show = state !== "hidden";
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* TL */}
      <motion.div
        className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l"
        style={{ borderColor: color }}
        animate={state === "scanning" ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.4, repeat: state === "scanning" ? Infinity : 0 }}
      />
      {/* TR */}
      <motion.div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r" style={{ borderColor: color }} />
      {/* BL */}
      <motion.div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l" style={{ borderColor: color }} />
      {/* BR */}
      <motion.div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r" style={{ borderColor: color }} />
    </motion.div>
  );
}

/* ─── SVG connector lines ────────────────────────────────────────────────── */
function ConnectorLines({
  chips,
  states,
}: {
  chips: ScanChip[];
  states: Record<string, ChipState>;
}) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
      <defs>
        {chips.map((c) => (
          <marker
            key={`marker-${c.id}`}
            id={`dot-${c.id}`}
            markerWidth="4"
            markerHeight="4"
            refX="2"
            refY="2"
          >
            <circle cx="2" cy="2" r="1.5" fill={c.color} />
          </marker>
        ))}
      </defs>
      {chips.map((chip) => {
        const st = states[chip.id] || "hidden";
        if (st === "hidden") return null;
        const x1 = `${chip.lineFrom.x}%`;
        const y1 = `${chip.lineFrom.y}%`;
        const x2 = `${chip.lineTo.x}%`;
        const y2 = `${chip.lineTo.y}%`;
        return (
          <motion.line
            key={chip.id}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={chip.color}
            strokeWidth="1"
            strokeDasharray="4 3"
            markerStart={`url(#dot-${chip.id})`}
            markerEnd={`url(#dot-${chip.id})`}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: st === "locked" ? 0.55 : 0.3,
              pathLength: 1,
              strokeDashoffset: st === "scanning" ? [0, -14] : 0,
            }}
            transition={{
              opacity: { duration: 0.3 },
              pathLength: { duration: 0.5, ease: "easeOut" },
              strokeDashoffset: { duration: 0.6, repeat: Infinity, ease: "linear" },
            }}
          />
        );
      })}
    </svg>
  );
}

/* ─── Individual chip ────────────────────────────────────────────────────── */
function ScanningChip({
  chip,
  chipState,
}: {
  chip: ScanChip;
  chipState: ChipState;
}) {
  const isScanning = chipState === "scanning";
  const isLocked = chipState === "locked";
  const show = chipState !== "hidden";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={chip.id}
          className={`absolute ${chip.position} z-20`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.35, ease: "backOut" }}
        >
          <div
            className="relative px-3 py-2 font-mono text-[9px] tracking-widest select-none"
            style={{
              background: `linear-gradient(135deg, ${chip.color}14, #040d1a99)`,
              border: `1px solid ${chip.color}${isLocked ? "88" : "44"}`,
              boxShadow: isLocked ? `0 0 14px ${chip.color}33, inset 0 0 8px ${chip.color}11` : "none",
              backdropFilter: "blur(8px)",
              minWidth: 90,
            }}
          >
            <Reticle color={chip.color} state={chipState} />

            {/* status indicator row */}
            <div className="flex items-center gap-1.5 mb-1">
              <motion.span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: chip.color }}
                animate={
                  isScanning
                    ? { opacity: [1, 0.2, 1], scale: [1, 0.7, 1] }
                    : { opacity: 1, scale: 1 }
                }
                transition={{ duration: 0.5, repeat: isScanning ? Infinity : 0 }}
              />
              <span style={{ color: chip.color }} className="leading-none">
                {isScanning ? "SCANNING…" : "LOCKED"}
              </span>
            </div>

            {/* label */}
            <div className="text-white/40 leading-none mb-0.5">{chip.label}</div>

            {/* value — scramble effect during scanning */}
            <div className="flex items-baseline gap-1">
              <motion.span
                className="text-white font-bold text-[13px]"
                animate={
                  isScanning
                    ? {
                        opacity: [1, 0.3, 1, 0.5, 1],
                        filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
                      }
                    : { opacity: 1, filter: "blur(0px)" }
                }
                transition={{ duration: 0.35, repeat: isScanning ? Infinity : 0 }}
              >
                {isScanning ? "———" : chip.value}
              </motion.span>
              {chip.unit && (
                <span className="text-white/40 text-[9px]">{chip.unit}</span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Radar sweep ────────────────────────────────────────────────────────── */
function RadarSweep() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[2px] pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, #00aaff22 30%, #00aaff88 50%, #00aaff22 70%, transparent 100%)",
        boxShadow: "0 0 12px #00aaff55",
        zIndex: 4,
      }}
      initial={{ top: "0%" }}
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
    />
  );
}

/* ─── Lock-on crosshair (center of car) ─────────────────────────────────── */
function CenterCrosshair({ active }: { active: boolean }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
      initial={{ opacity: 0, scale: 2 }}
      animate={{ opacity: active ? 0.25 : 0, scale: active ? 1 : 2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="20" stroke="#00aaff" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="30" y1="10" x2="30" y2="20" stroke="#00aaff" strokeWidth="1" />
        <line x1="30" y1="40" x2="30" y2="50" stroke="#00aaff" strokeWidth="1" />
        <line x1="10" y1="30" x2="20" y2="30" stroke="#00aaff" strokeWidth="1" />
        <line x1="40" y1="30" x2="50" y2="30" stroke="#00aaff" strokeWidth="1" />
        <circle cx="30" cy="30" r="2" fill="#00aaff" fillOpacity="0.6" />
      </svg>
    </motion.div>
  );
}

/* ─── Floating badge (original, kept for PERF badge & AERO badge) ──────── */
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
      className={`absolute ${position} flex items-center gap-1.5 border border-[#00aaff44] bg-[#0a1628cc] backdrop-blur-sm px-3 py-1.5 rounded-sm text-[10px] font-mono tracking-widest text-[#00aaff]`}
      style={{ boxShadow: "0 0 12px #00aaff22", zIndex: 20 }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#00aaff] animate-pulse" />
      {label}
      {value && <span className="text-white/60 ml-1">{value}</span>}
    </motion.div>
  );
}

/* ─── Starfield ─────────────────────────────────────────────────────────── */
function Starfield() {
  const rand = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  const stars = Array.from({ length: 60 }, (_, i) => {
    const s = i + 1;
    return {
      id: i,
      x: rand(s * 13.13) * 100,
      y: rand(s * 91.7) * 100,
      size: rand(s * 7.77) * 1.5 + 0.5,
      delay: rand(s * 3.33) * 4,
      duration: 3 + rand(s * 5.55) * 3,
    };
  });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-foreground/35 dark:bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
        />
      ))}
    </div>
  );
}

/* ─── Scan progress bar ─────────────────────────────────────────────────── */
function ScanProgressBar({ allLocked }: { allLocked: boolean }) {
  const lockedCount = allLocked ? CHIPS.length : 0;
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 z-30 px-4 py-2.5 flex items-center gap-3"
      style={{ background: "linear-gradient(to top, #040d1a, transparent)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <span className="text-[9px] font-mono text-[#00aaff] tracking-widest flex-shrink-0">
        AI SCAN
      </span>
      <div className="flex-1 h-px bg-white/10 relative overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "linear-gradient(90deg, #00aaff, #00ffcc)" }}
          initial={{ width: "0%" }}
          animate={{ width: allLocked ? "100%" : "0%" }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        />
      </div>
      <motion.span
        className="text-[9px] font-mono tracking-widest flex-shrink-0"
        animate={{ color: allLocked ? "#00ffcc" : "#00aaff" }}
      >
        {allLocked ? "COMPLETE" : "SCANNING…"}
      </motion.span>
    </motion.div>
  );
}

/* ─── Main Hero ─────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const [inputVal, setInputVal] = useState("");
  const placeholder = "Describe your dream drive… (e.g. 'Silent ele";

  const chipStates = useChipStates(CHIPS);
  const allLocked = CHIPS.every((c) => chipStates[c.id] === "locked");

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center bg-background dark:bg-black overflow-hidden px-8 md:px-16 lg:px-24 transition-colors duration-300">
      {/* ── background ── */}
      <Starfield />
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#001f4a] blur-[120px] opacity-60 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00aaff 1px, transparent 1px), linear-gradient(90deg, #00aaff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── pill badge ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-8 md:left-16 lg:left-24 flex items-center gap-2 border border-[#00aaff55] bg-[#00aaff11] px-4 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#00aaff]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00aaff] animate-pulse" />
        NEXT-GEN AI CORE V4.2
      </motion.div>

      {/* ── layout ── */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12 mt-16">

        {/* LEFT */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex-1 max-w-xl">
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-foreground dark:text-white"
          >
            The Future of
            <br />
            <span className="text-[#00aaff]">Driving,</span>
            <br />
            <span className="text-[#00aaff]">Predicted</span>
            <br />
            by AI.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-sm">
            Rimello leverages neural networks to curate your perfect automotive match. Beyond
            specs—we analyze soul, style, and future value.
          </motion.p>

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
              className="flex-1 bg-transparent outline-none px-4 py-3.5 text-sm text-foreground dark:text-white placeholder:text-muted-foreground font-mono"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#00aaff] text-black px-6 py-3.5 text-xs font-black tracking-widest uppercase flex-shrink-0"
            >
              INITIATE MATCH
            </motion.button>
          </motion.div>
        </motion.div>

        {/* RIGHT — car card with scanning chips */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          className="flex-1 relative max-w-[600px] w-full"
        >
          {/* card frame */}
          <div
            className="relative rounded-sm border border-[#00aaff22] bg-gradient-to-br from-[#0a1628] to-[#040d1a] overflow-visible"
            style={{ boxShadow: "0 0 60px #00aaff15, inset 0 0 40px #00000040" }}
          >
            {/* inner clip for scan line */}
            <div className="relative overflow-hidden rounded-sm">
              {/* radar sweep */}
              <RadarSweep />

              {/* corner accents */}
              {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
                "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
                <div key={i} className={`absolute w-5 h-5 border-[#00aaff] z-10 ${cls}`} />
              ))}

              {/* car image area */}
              <div className="relative h-64 md:h-80 flex items-center justify-center p-6">
                {/* connector SVG lines */}
                <ConnectorLines chips={CHIPS} states={chipStates} />

                {/* ambient glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-[#00aaff] blur-[50px] opacity-10 rounded-full" />

                {/* center crosshair */}
                <CenterCrosshair active={Object.keys(chipStates).length > 0} />

                {/* car image */}
                <motion.img
                  src="/006.png"
                  alt="Featured vehicle"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full max-w-[440px] object-contain drop-shadow-[0_0_30px_rgba(0,170,255,0.2)] relative z-10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/alt.png";
                  }}
                />

                {/* fallback SVG */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <svg viewBox="0 0 200 80" className="w-4/5 opacity-20 fill-[#00aaff]">
                    <path d="M30 55 L20 55 L15 45 L25 30 L55 20 L120 18 L155 28 L175 40 L185 55 L170 55 Q168 65 158 65 Q148 65 146 55 L54 55 Q52 65 42 65 Q32 65 30 55Z" />
                  </svg>
                </motion.div>

                {/* ── SCANNING CHIPS ── */}
                {CHIPS.map((chip) => (
                  <ScanningChip
                    key={chip.id}
                    chip={chip}
                    chipState={chipStates[chip.id] || "hidden"}
                  />
                ))}
              </div>

              {/* scan progress bar */}
              <ScanProgressBar allLocked={allLocked} />
            </div>

            {/* bottom status row */}
            <motion.div
              className="flex items-center justify-between px-4 py-2 border-t border-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-[#00aaff]"
                  animate={{ opacity: allLocked ? 1 : [1, 0.2, 1] }}
                  transition={{ duration: 0.6, repeat: allLocked ? 0 : Infinity }}
                />
                <span className="text-[9px] font-mono text-[#00aaff] tracking-widest">
                  {allLocked ? `${CHIPS.length}/${CHIPS.length} PARAMETERS LOCKED` : "DEEP SCAN ACTIVE"}
                </span>
              </div>
            <span className="text-[9px] font-mono text-foreground/40 dark:text-white/20 tracking-widest">
                RIMELLO·AI·v4.2
              </span>
            </motion.div>
          </div>

          {/* outer pulse ring */}
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