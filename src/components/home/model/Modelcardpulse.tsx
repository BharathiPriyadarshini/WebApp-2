"use client";

import { useState } from "react";

interface ModelCardPulseProps {
  brand?: string;
  model?: string;
  year?: number;
  price?: string;
  image?: string;
  hp?: string;
  torque?: string;
  zeroToSixty?: string;
  category?: string;
  accentColor?: string;
}

export default function ModelCardPulse({
  brand = "Dodge",
  model = "Demon 170",
  year = 2024,
  price = "$96,000",
  image = "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
  hp = "1,025",
  torque = "945 lb-ft",
  zeroToSixty = "1.66s",
  category = "Muscle Car",
  accentColor = "#FF4500",
}: ModelCardPulseProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "340px",
        height: "460px",
        background: "#030303",
        borderRadius: "4px",
        overflow: "hidden",
        cursor: "pointer",
        border: `1px solid rgba(255,255,255,0.06)`,
        boxShadow: hovered ? `0 0 40px ${accentColor}25, 0 20px 60px rgba(0,0,0,0.9)` : "0 10px 40px rgba(0,0,0,0.6)",
        transition: "box-shadow 0.5s",
        fontFamily: "'Oswald', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400&display=swap');

        @keyframes pulseLine {
          0% { stroke-dashoffset: 1000; opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(1.02); }
        }
        .pulse-svg-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: pulseLine 2.5s ease-in-out infinite;
        }
        .pulse-svg-line-2 {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: pulseLine 2.5s ease-in-out 1.25s infinite;
        }
      `}</style>

      {/* Image */}
      <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
        <img
          src={image}
          alt={`${brand} ${model}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.7s ease",
            filter: "brightness(0.7) contrast(1.1)",
          }}
        />
        {/* EKG Overlay on image */}
        <svg
          viewBox="0 0 340 100"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100px",
          }}
          preserveAspectRatio="none"
        >
          <polyline
            className="pulse-svg-line"
            points="0,70 40,70 55,70 65,20 80,90 95,70 110,70 125,70 140,70 155,70 165,40 175,10 185,80 195,70 210,70 340,70"
            fill="none"
            stroke={accentColor}
            strokeWidth="1.5"
          />
          <polyline
            className="pulse-svg-line-2"
            points="0,60 60,60 75,60 85,15 100,85 115,60 340,60"
            fill="none"
            stroke={accentColor}
            strokeWidth="0.8"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="fadeBottom" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#030303" stopOpacity="0" />
              <stop offset="100%" stopColor="#030303" stopOpacity="1" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="340" height="100" fill="url(#fadeBottom)" />
        </svg>

        {/* Category badge */}
        <div style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "10px",
          letterSpacing: "2px",
          color: accentColor,
          background: `${accentColor}15`,
          border: `1px solid ${accentColor}40`,
          padding: "4px 10px",
          textTransform: "uppercase",
        }}>{category}</div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 24px 24px" }}>
        {/* Brand + year */}
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "11px",
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "3px",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}>{brand} · {year}</div>

        {/* Model name */}
        <div style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "42px",
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1,
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}>{model}</div>

        {/* Divider line */}
        <div style={{
          width: hovered ? "100%" : "60px",
          height: "1px",
          background: `linear-gradient(to right, ${accentColor}, transparent)`,
          margin: "16px 0",
          transition: "width 0.5s ease",
        }} />

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "20px" }}>
          {[
            { label: "Power", value: hp, unit: "hp" },
            { label: "Torque", value: torque, unit: "" },
            { label: "0–60", value: zeroToSixty, unit: "" },
          ].map((stat, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "10px 8px",
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                color: accentColor,
                lineHeight: 1,
              }}>{stat.value}</div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "9px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "1px",
                marginTop: "4px",
                textTransform: "uppercase",
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "2px" }}>MSRP</div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "26px", fontWeight: 600, color: "#fff" }}>{price}</div>
          </div>
          <button style={{
            background: hovered ? accentColor : "transparent",
            border: `1px solid ${accentColor}`,
            color: hovered ? "#000" : accentColor,
            fontFamily: "'Oswald', sans-serif",
            fontSize: "13px",
            letterSpacing: "2px",
            padding: "10px 20px",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.3s",
          }}>Explore →</button>
        </div>
      </div>
    </div>
  );
}