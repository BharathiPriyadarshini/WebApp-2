"use client";

import { useState } from "react";

interface Spec {
  label: string;
  value: string;
}

interface ModelCardOrbitProps {
  brand?: string;
  model?: string;
  year?: number;
  price?: string;
  image?: string;
  specs?: Spec[];
  accentColor?: string;
  category?: string;
}

export default function ModelCardOrbit({
  brand = "Ferrari",
  model = "Roma",
  year = 2024,
  price = "$222,000",
  image = "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600&q=80",
  specs = [
    { label: "HP", value: "612" },
    { label: "0–60", value: "3.4s" },
    { label: "Top", value: "199 mph" },
  ],
  accentColor = "#FF2D20",
  category = "Grand Tourer",
}: ModelCardOrbitProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "320px",
        height: "400px",
        background: "#080808",
        borderRadius: "50%",
        overflow: "visible",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes orbit1 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit2 {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes orbit3 {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.4s;
        }
        .orbit-ring.active {
          border-color: rgba(255,255,255,0.2);
        }
        .orbit-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
        }
        .orbit-ring-1 {
          width: 320px;
          height: 320px;
          animation: orbit1 8s linear infinite;
        }
        .orbit-ring-2 {
          width: 380px;
          height: 380px;
          animation: orbit2 12s linear infinite;
        }
        .orbit-ring-3 {
          width: 440px;
          height: 440px;
          animation: orbit3 18s linear infinite;
        }
      `}</style>

      {/* Orbit rings */}
      <div className={`orbit-ring orbit-ring-1 ${hovered ? "active" : ""}`}>
        <div className="orbit-dot" style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
      </div>
      <div className={`orbit-ring orbit-ring-2 ${hovered ? "active" : ""}`}>
        <div className="orbit-dot" style={{ background: "#fff", width: "5px", height: "5px", top: "-2.5px" }} />
      </div>
      <div className={`orbit-ring orbit-ring-3 ${hovered ? "active" : ""}`}>
        <div className="orbit-dot" style={{ background: accentColor, opacity: 0.6, width: "4px", height: "4px", top: "-2px" }} />
      </div>

      {/* Main circular card */}
      <div style={{
        position: "relative",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        overflow: "hidden",
        boxShadow: hovered ? `0 0 60px ${accentColor}30, 0 20px 60px rgba(0,0,0,0.8)` : "0 10px 40px rgba(0,0,0,0.6)",
        transition: "box-shadow 0.4s",
      }}>
        {/* Car image */}
        <img
          src={image}
          alt={`${brand} ${model}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.85) 100%)`,
        }} />

        {/* Center content */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: "40px",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            letterSpacing: "3px",
            color: accentColor,
            textTransform: "uppercase",
            marginBottom: "4px",
          }}>{brand} · {year}</div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "38px",
            color: "#fff",
            lineHeight: 1,
            letterSpacing: "2px",
          }}>{model}</div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            color: "rgba(255,255,255,0.5)",
            marginTop: "4px",
          }}>{category}</div>
        </div>
      </div>

      {/* Specs floating below */}
      <div style={{
        position: "absolute",
        bottom: "-70px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "24px",
        background: "rgba(10,10,10,0.95)",
        border: `1px solid ${accentColor}30`,
        borderRadius: "40px",
        padding: "12px 28px",
        backdropFilter: "blur(10px)",
        opacity: hovered ? 1 : 0.7,
        transition: "opacity 0.3s",
        whiteSpace: "nowrap",
      }}>
        {specs.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", color: accentColor, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "1px", textTransform: "uppercase" }}>{s.label}</div>
          </div>
        ))}
        <div style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          color: "#fff",
          fontWeight: 500,
        }}>{price}</div>
      </div>
    </div>
  );
}