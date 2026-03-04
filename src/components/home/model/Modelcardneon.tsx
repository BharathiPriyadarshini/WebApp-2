"use client";

import React, { useState } from "react";

interface ModelCardNeonProps {
  brand?: string;
  model?: string;
  year?: number;
  category?: string;
  price?: string;
  image?: string;
  stats?: { label: string; value: string; unit: string }[];
  neonColor?: string;
}

export default function ModelCardNeon({
  brand = "Lamborghini",
  model = "Huracán",
  year = 2024,
  category = "Supercar",
  price = "$248,295",
  image = "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
  stats = [
    { label: "Power", value: "631", unit: "hp" },
    { label: "0–60", value: "2.5", unit: "sec" },
    { label: "Top", value: "202", unit: "mph" },
  ],
  neonColor = "#39FF14",
}: ModelCardNeonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        fontFamily: "'Rajdhani', sans-serif",
        width: "310px",
        height: "430px",
        position: "relative",
        cursor: "pointer",
        borderRadius: "6px",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, background: "#050A05" }} />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${neonColor}18 1px, transparent 1px),
            linear-gradient(90deg, ${neonColor}18 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Horizon glow */}
      <div
        style={{
          position: "absolute",
          bottom: "120px",
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${neonColor}, transparent)`,
          boxShadow: `0 0 20px 4px ${neonColor}66`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Car image */}
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "-10px",
          right: "-10px",
          height: "200px",
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt={model}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.75,
            filter: `contrast(1.1) saturate(0.8) drop-shadow(0 8px 24px ${neonColor}44)`,
            transform: hovered ? "scale(1.04) translateY(-4px)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        {/* Fade bottom of image */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(to top, #050A05, transparent)",
          }}
        />
      </div>

      {/* Top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: neonColor, boxShadow: `0 0 8px ${neonColor}` }} />
          <span style={{ color: neonColor, fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase" }}>
            {brand}
          </span>
        </div>
        <span
          style={{
            color: "#000",
            background: neonColor,
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "2px",
            padding: "3px 10px",
            borderRadius: "2px",
          }}
        >
          {category}
        </span>
      </div>

      {/* Bottom content */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 18px" }}>
        {/* Scan line */}
        <div
          style={{
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${neonColor}88, transparent)`,
            marginBottom: "14px",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "14px" }}>
          <div>
            <p style={{ color: `${neonColor}88`, fontSize: "10px", letterSpacing: "2px", margin: "0 0 2px" }}>{year}</p>
            <h2
              style={{
                color: "#fff",
                fontSize: "36px",
                fontWeight: 700,
                margin: 0,
                lineHeight: 1,
                textShadow: `0 0 20px ${neonColor}44`,
              }}
            >
              {model}
            </h2>
          </div>
          <p
            style={{
              color: neonColor,
              fontSize: "18px",
              fontWeight: 700,
              margin: 0,
              textShadow: `0 0 12px ${neonColor}`,
            }}
          >
            {price}
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: `${neonColor}0D`,
                border: `1px solid ${neonColor}33`,
                borderRadius: "4px",
                padding: "8px",
                textAlign: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "2px" }}>
                <span style={{ color: "#fff", fontSize: "20px", fontWeight: 700, lineHeight: 1 }}>{s.value}</span>
                <span style={{ color: neonColor, fontSize: "10px", fontWeight: 600 }}>{s.unit}</span>
              </div>
              <p style={{ color: "#555", fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", margin: "4px 0 0" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <button
          style={{
            marginTop: "12px",
            width: "100%",
            padding: "10px",
            background: "transparent",
            border: `1px solid ${neonColor}`,
            borderRadius: "4px",
            color: neonColor,
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "3px",
            textTransform: "uppercase",
            cursor: "pointer",
            boxShadow: hovered ? `0 0 16px ${neonColor}44` : "none",
            transition: "box-shadow 0.3s ease",
          }}
        >
          Configure →
        </button>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&display=swap');`}</style>
    </div>
  );
}