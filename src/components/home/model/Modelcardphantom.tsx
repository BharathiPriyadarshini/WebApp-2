"use client";

import { useState } from "react";

interface ModelCardPhantomProps {
  brand?: string;
  model?: string;
  year?: number;
  price?: string;
  image?: string;
  category?: string;
  features?: string[];
  engine?: string;
  accentColor?: string;
}

export default function ModelCardPhantom({
  brand = "Bentley",
  model = "Continental GT",
  year = 2024,
  price = "$274,900",
  image = "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&q=80",
  category = "Grand Tourer",
  features = ["6.0L W12 Engine", "659 Horsepower", "AWD System", "Mulliner Interior"],
  engine = "W12 Biturbo",
  accentColor = "#C5A028",
}: ModelCardPhantomProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "360px",
        height: "200px",
        cursor: "pointer",
        display: "flex",
        overflow: "hidden",
        borderRadius: "2px",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px ${accentColor}30`
          : "0 8px 30px rgba(0,0,0,0.6)",
        transition: "box-shadow 0.4s",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Exo+2:wght@200;300;400&display=swap');

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .phantom-feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: fadeSlideIn 0.3s ease forwards;
        }
      `}</style>

      {/* Left: image panel */}
      <div style={{
        position: "relative",
        width: hovered ? "45%" : "60%",
        flexShrink: 0,
        overflow: "hidden",
        transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        <img
          src={image}
          alt={`${brand} ${model}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.12)" : "scale(1.04)",
            transition: "transform 0.7s ease",
            filter: "brightness(0.75)",
          }}
        />
        {/* Gold vertical stripe */}
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "3px",
          height: "100%",
          background: accentColor,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.4s",
        }} />

        {/* Category badge */}
        <div style={{
          position: "absolute",
          bottom: "12px",
          left: "12px",
          fontFamily: "'Exo 2', sans-serif",
          fontSize: "9px",
          fontWeight: 200,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: accentColor,
          background: "rgba(0,0,0,0.5)",
          padding: "3px 8px",
          backdropFilter: "blur(4px)",
        }}>{category}</div>
      </div>

      {/* Right: content panel */}
      <div style={{
        flex: 1,
        background: "#0C0A06",
        padding: "20px 18px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}>
        {/* Top info */}
        <div>
          <div style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: "9px",
            fontWeight: 200,
            letterSpacing: "4px",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}>{brand} · {year}</div>
          <div style={{
            fontFamily: "'Libre Caslon Display', serif",
            fontSize: "24px",
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.5px",
          }}>{model}</div>
          <div style={{
            width: "30px",
            height: "1px",
            background: accentColor,
            marginTop: "8px",
          }} />
        </div>

        {/* Features list - shown on hover, or engine otherwise */}
        {hovered ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {features.map((f, i) => (
              <div
                key={i}
                className="phantom-feature-item"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: accentColor,
                  flexShrink: 0,
                }} />
                <div style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: "11px",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "0.5px",
                }}>{f}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            fontFamily: "'Libre Caslon Text', serif",
            fontSize: "12px",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.4)",
          }}>{engine}</div>
        )}

        {/* Price */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{
            fontFamily: "'Libre Caslon Display', serif",
            fontSize: "18px",
            color: accentColor,
          }}>{price}</div>
          <div style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: "9px",
            fontWeight: 200,
            letterSpacing: "2px",
            color: hovered ? accentColor : "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
            transition: "color 0.3s",
          }}>View →</div>
        </div>
      </div>
    </div>
  );
}