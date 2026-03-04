"use client";

import React from "react";

interface TrimCardBadgeProps {
  model: string;
  trimName: string;
  trimCode?: string;
  price: string;
  image?: string;
  badges?: { label: string; color: string; bg: string }[];
  highlights?: string[];
  isPopular?: boolean;
}

export default function TrimCardBadge({
  model = "Camry",
  trimName = "XSE V6",
  trimCode = "XV70",
  price = "$35,980",
  image = "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80",
  badges = [
    { label: "V6 Engine", color: "#fff", bg: "#E84040" },
    { label: "Sport Tuned", color: "#fff", bg: "#2563EB" },
    { label: "JBL Audio", color: "#111", bg: "#F5C518" },
    { label: "All-Wheel", color: "#fff", bg: "#16A34A" },
  ],
  highlights = ["3.5L V6 / 301 hp", "8-Speed Auto", "19-in Dark Alloys", "Panoramic Roof"],
  isPopular = true,
}: TrimCardBadgeProps) {
  return (
    <div
      style={{
        fontFamily: "'Nunito', sans-serif",
        width: "320px",
        background: "#fff",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        cursor: "pointer",
        border: isPopular ? "2px solid #2563EB" : "2px solid transparent",
        position: "relative",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)";
      }}
    >
      {isPopular && (
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            background: "#2563EB",
            color: "#fff",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "1.5px",
            padding: "5px 16px 5px 20px",
            borderBottomLeftRadius: "12px",
            zIndex: 10,
          }}
        >
          MOST POPULAR
        </div>
      )}

      {/* Image */}
      <div style={{ height: "170px", overflow: "hidden", background: "#F3F4F6" }}>
        <img src={image} alt={model} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div style={{ padding: "16px 18px 20px" }}>
        {/* Model + Trim header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
          <div>
            <p style={{ color: "#9CA3AF", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 2px" }}>
              Toyota · {trimCode}
            </p>
            <h2 style={{ color: "#111", fontSize: "20px", fontWeight: 800, margin: 0 }}>
              {model} <span style={{ color: "#2563EB" }}>{trimName}</span>
            </h2>
          </div>
          <p style={{ color: "#111", fontSize: "18px", fontWeight: 800, margin: 0 }}>{price}</p>
        </div>

        {/* Badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
          {badges.map((b) => (
            <span
              key={b.label}
              style={{
                background: b.bg,
                color: b.color,
                fontSize: "10px",
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: "100px",
                letterSpacing: "0.5px",
              }}
            >
              {b.label}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <div
          style={{
            background: "#F9FAFB",
            borderRadius: "10px",
            padding: "12px 14px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            marginBottom: "14px",
          }}
        >
          {highlights.map((h) => (
            <div key={h} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#2563EB", flexShrink: 0 }} />
              <span style={{ color: "#374151", fontSize: "12px", fontWeight: 600 }}>{h}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            style={{
              flex: 1,
              padding: "10px",
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Build & Price
          </button>
          <button
            style={{
              flex: 1,
              padding: "10px",
              background: "transparent",
              color: "#2563EB",
              border: "1.5px solid #2563EB",
              borderRadius: "10px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Compare
          </button>
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');`}</style>
    </div>
  );
}