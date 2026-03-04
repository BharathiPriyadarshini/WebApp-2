"use client";

import { useState } from "react";

interface ModelCardVelocityProps {
  brand?: string;
  model?: string;
  year?: number;
  price?: string;
  image?: string;
  speed?: string;
  power?: string;
  time?: string;
  category?: string;
  accentColor?: string;
}

export default function ModelCardVelocity({
  brand = "Bugatti",
  model = "Chiron",
  year = 2024,
  price = "$3,300,000",
  image = "https://images.unsplash.com/photo-1621993202328-4f8f6a5b0b3a?w=800&q=80",
  speed = "261 mph",
  power = "1,479 hp",
  time = "2.4s",
  category = "Hypercar",
  accentColor = "#00D4FF",
}: ModelCardVelocityProps) {
  const [hovered, setHovered] = useState(false);

  const skewAngle = -8;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "380px",
        height: "260px",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400&display=swap');

        @keyframes streakMove {
          from { transform: translateX(-100%) skewX(-15deg); }
          to { transform: translateX(400%) skewX(-15deg); }
        }
        .velocity-streak {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 40px;
          opacity: 0;
        }
        .velocity-streak.active {
          opacity: 1;
          animation: streakMove 0.8s ease-out forwards;
        }
        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* Background: image fills card */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "#000",
        overflow: "hidden",
      }}>
        <img
          src={image}
          alt={`${brand} ${model}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: hovered ? "brightness(0.5) saturate(1.2)" : "brightness(0.35) saturate(0.8)",
            transform: hovered ? "scale(1.08) skewX(-2deg)" : "scale(1.12)",
            transition: "all 0.7s ease",
          }}
        />
      </div>

      {/* Diagonal separator */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "0",
        width: "55%",
        height: "100%",
        background: "rgba(0,0,0,0.75)",
        clipPath: `polygon(0 0, 80% 0, 60% 100%, 0 100%)`,
        transition: "all 0.4s",
      }} />

      {/* Speed streak on hover */}
      <div className={`velocity-streak ${hovered ? "active" : ""}`} style={{
        background: `linear-gradient(to right, transparent, ${accentColor}80, transparent)`,
      }} />

      {/* Left content */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "55%",
        height: "100%",
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
        {/* Top */}
        <div>
          <div style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: "10px",
            fontWeight: 300,
            letterSpacing: "4px",
            color: accentColor,
            textTransform: "uppercase",
          }}>{category}</div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "48px",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 0.9,
            textTransform: "uppercase",
            letterSpacing: "-1px",
            marginTop: "4px",
          }}>{model}</div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}>{brand} · {year}</div>
        </div>

        {/* Price */}
        <div>
          <div style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: "10px",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "3px",
            marginBottom: "2px",
          }}>MSRP</div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "22px",
            fontWeight: 700,
            color: "#fff",
          }}>{price}</div>
        </div>
      </div>

      {/* Right: stat pills stacked diagonally */}
      <div style={{
        position: "absolute",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "flex-end",
      }}>
        {[
          { label: "TOP SPEED", value: speed },
          { label: "POWER", value: power },
          { label: "0–60 MPH", value: time },
        ].map((stat, i) => (
          <div key={i} style={{
            background: i === 0 ? accentColor : "rgba(0,0,0,0.8)",
            border: `1px solid ${i === 0 ? accentColor : "rgba(255,255,255,0.12)"}`,
            padding: "8px 14px",
            textAlign: "right",
            transform: hovered ? `translateX(${i * -4}px)` : "translateX(0)",
            transition: `transform ${0.3 + i * 0.05}s ease`,
            backdropFilter: "blur(8px)",
          }}>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "18px",
              fontWeight: 800,
              color: i === 0 ? "#000" : "#fff",
              lineHeight: 1,
            }}>{stat.value}</div>
            <div style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "9px",
              fontWeight: 300,
              color: i === 0 ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: `linear-gradient(to right, ${accentColor}, transparent 60%)`,
      }} />

      {/* Corner accent */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "40px",
        height: "3px",
        background: accentColor,
      }} />
    </div>
  );
}