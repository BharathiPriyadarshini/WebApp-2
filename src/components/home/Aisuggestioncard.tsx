"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ScoreBreakdown {
  budgetMatch: number;
  popularity: number;
  needsMatch: number;
  cityDriving: number;
  compactParking: number;
  fuelEfficient: number;
}

interface AISuggestionCardProps {
  category?: string;
  price?: string;
  brand?: string;
  model?: string;
  trim?: string;
  description?: string;
  scores?: ScoreBreakdown;
  image?: string;
  badge?: string;
  rank?: number;
  onViewDetails?: () => void;
  onContactDealer?: () => void;
}

// ─── Circular Score Ring ──────────────────────────────────────────────────────
function ScoreRing({
  value,
  label,
  size = 72,
  accent = "#C9A84C",
}: {
  value: number;
  label: string;
  size?: number;
  accent?: string;
}) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          {/* track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={5}
          />
          {/* fill */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={accent}
            strokeWidth={5}
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </svg>
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'DM Mono', monospace",
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.03em",
          }}
        >
          {value}
        </span>
      </div>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 10,
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          textAlign: "center",
          maxWidth: size,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Mini Bar ─────────────────────────────────────────────────────────────────
function MiniBar({
  label,
  value,
  accent = "#C9A84C",
}: {
  label: string;
  value: number;
  accent?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          color: "rgba(255,255,255,0.45)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          width: 120,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: 3,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${accent}99, ${accent})`,
            borderRadius: 99,
            transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: accent,
          width: 28,
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {value}%
      </span>
    </div>
  );
}

// ─── Main Card ────────────────────────────────────────────────────────────────
export default function AISuggestionCard({
  category = "HATCHBACK",
  price = "₹11,14,000",
  brand = "Tata",
  model = "Tiago EV",
  trim = "XZ Plus Tech LUX Long Range",
  description = "The Tata Tiago EV XZ Plus Tech LUX Long Range is a fully electric hatchback that comes with a smooth automatic transmission, making it easy to navigate tight city streets. With its compact dimensions and a price of just ₹11.1 lakh, it fits comfortably within your budget while offering the quiet, emission‑free driving you'll enjoy on narrow roads.",
  scores = {
    budgetMatch: 100,
    popularity: 0,
    needsMatch: 63,
    cityDriving: 73,
    compactParking: 58,
    fuelEfficient: 58,
  },
  image = "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
  badge = "AI PICK",
  rank = 1,
  onViewDetails,
  onContactDealer,
}: AISuggestionCardProps) {
  const [hovered, setHovered] = useState(false);

  const accent = "#C9A84C"; // champagne gold
  const electric = "#39E0C8"; // teal for EV badge

  const overallScore = Math.round(
    (scores.budgetMatch + scores.needsMatch + scores.cityDriving + scores.compactParking + scores.fuelEfficient) / 5
  );

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500;700&display=swap');

        .ai-card-btn-primary {
          background: linear-gradient(135deg, #C9A84C, #e8c96a);
          color: #0a0a0a;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 13px 28px;
          border-radius: 4px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          flex: 1;
        }
        .ai-card-btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .ai-card-btn-secondary {
          background: transparent;
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.15);
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 13px 28px;
          border-radius: 4px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
          flex: 1;
        }
        .ai-card-btn-secondary:hover {
          border-color: rgba(201,168,76,0.6);
          color: #C9A84C;
          transform: translateY(-1px);
        }
      `}</style>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 780,
          background: "linear-gradient(145deg, #111111 0%, #0d0d0d 100%)",
          borderRadius: 16,
          border: `1px solid ${hovered ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.06)"}`,
          overflow: "hidden",
          position: "relative",
          boxShadow: hovered
            ? "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.15), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "border-color 0.4s, box-shadow 0.4s, transform 0.3s",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >

        {/* ── Ambient glow top-right ── */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* ── TOP SECTION: Image + Identity ─────────────────────────── */}
        <div style={{ display: "flex", height: 240, position: "relative" }}>

          {/* Image */}
          <div style={{ width: 360, flexShrink: 0, position: "relative", overflow: "hidden" }}>
            <img
              src={image}
              alt={`${brand} ${model}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.6s ease",
                transform: hovered ? "scale(1.04)" : "scale(1)",
              }}
            />
            {/* Dark gradient overlay on right edge */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, transparent 40%, #0d0d0d 100%)",
              }}
            />
            {/* Bottom scrim */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                background: "linear-gradient(to top, #0d0d0d, transparent)",
              }}
            />

            {/* Category pill */}
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  background: "rgba(0,0,0,0.65)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  padding: "5px 10px",
                  borderRadius: 3,
                  textTransform: "uppercase",
                }}
              >
                {category}
              </span>
              {/* EV badge */}
              <span
                style={{
                  background: `${electric}20`,
                  border: `1px solid ${electric}50`,
                  color: electric,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  padding: "5px 10px",
                  borderRadius: 3,
                  textTransform: "uppercase",
                }}
              >
                EV
              </span>
            </div>
          </div>

          {/* Identity block */}
          <div style={{ flex: 1, padding: "28px 28px 24px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

            <div>
              {/* AI Pick badge + rank */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span
                  style={{
                    background: `linear-gradient(135deg, ${accent}30, ${accent}15)`,
                    border: `1px solid ${accent}50`,
                    color: accent,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    letterSpacing: "0.18em",
                    padding: "4px 10px",
                    borderRadius: 3,
                    textTransform: "uppercase",
                  }}
                >
                  ✦ {badge}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.1em",
                  }}
                >
                  #{rank} MATCH
                </span>
              </div>

              {/* Brand */}
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: 4,
                }}
              >
                {brand}
              </div>

              {/* Model name */}
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 32,
                  fontWeight: 400,
                  color: "#ffffff",
                  margin: "0 0 6px 0",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {model}
              </h2>

              {/* Trim */}
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.06em",
                  marginBottom: 16,
                }}
              >
                {trim}
              </div>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 26,
                  color: accent,
                  letterSpacing: "-0.02em",
                }}
              >
                {price}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.05em",
                }}
              >
                ex-showroom
              </span>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)" }} />

        {/* ── MIDDLE SECTION: Description + Score Rings ─────────────── */}
        <div style={{ display: "flex", gap: 0 }}>

          {/* Description */}
          <div style={{ flex: 1, padding: "24px 28px 24px 28px" }}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.45)",
                margin: 0,
              }}
            >
              {description}
            </p>
          </div>

          {/* Vertical divider */}
          <div style={{ width: 1, background: "rgba(255,255,255,0.05)", flexShrink: 0 }} />

          {/* Score rings */}
          <div
            style={{
              width: 200,
              flexShrink: 0,
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
                alignSelf: "flex-start",
              }}
            >
              Score Breakdown
            </span>

            {/* Big overall score */}
            <ScoreRing value={overallScore} label="Overall" size={80} accent={accent} />

            {/* Mini rings row */}
            <div style={{ display: "flex", gap: 12 }}>
              <ScoreRing value={scores.budgetMatch} label="Budget" size={56} accent="#4ADE80" />
              <ScoreRing value={scores.needsMatch} label="Needs" size={56} accent={accent} />
              <ScoreRing value={scores.popularity} label="Popular" size={56} accent="#60A5FA" />
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)" }} />

        {/* ── BOTTOM SECTION: Mini bars + CTA ──────────────────────── */}
        <div style={{ display: "flex", gap: 0 }}>

          {/* Mini bars */}
          <div style={{ flex: 1, padding: "20px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
            <MiniBar label="City Driving" value={scores.cityDriving} accent={accent} />
            <MiniBar label="Compact Parking" value={scores.compactParking} accent={accent} />
            <MiniBar label="Fuel Efficient" value={scores.fuelEfficient} accent="#39E0C8" />
          </div>

          {/* Vertical divider */}
          <div style={{ width: 1, background: "rgba(255,255,255,0.05)", flexShrink: 0 }} />

          {/* CTA */}
          <div
            style={{
              width: 200,
              flexShrink: 0,
              padding: "20px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              justifyContent: "center",
            }}
          >
            <button className="ai-card-btn-primary" onClick={onViewDetails}>
              View Details
            </button>
            <button className="ai-card-btn-secondary" onClick={onContactDealer}>
              Contact Dealer
            </button>
          </div>
        </div>

        {/* ── Bottom accent line ── */}
        <div
          style={{
            height: 2,
            background: `linear-gradient(to right, transparent, ${accent}60, ${accent}90, ${accent}60, transparent)`,
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.4s",
          }}
        />

      </div>
    </>
  );
}