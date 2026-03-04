"use client";

import React from "react";

interface ModelCardSlantProps {
  brand: string;
  model: string;
  year: number;
  category: string;
  price: string;
  image: string;
  specs?: { label: string; value: string }[];
  accentColor?: string;
}

export default function ModelCardSlant({
  brand = "Toyota",
  model = "Supra",
  year = 2024,
  category = "Sports Coupe",
  price = "$56,000",
  image = "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
  specs = [
    { label: "0–60", value: "3.9s" },
    { label: "HP", value: "382" },
    { label: "MPG", value: "25" },
  ],
  accentColor = "#E63946",
}: ModelCardSlantProps) {
  return (
    <div
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        position: "relative",
        width: "320px",
        height: "420px",
        background: "#0D0D0D",
        borderRadius: "4px",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {/* Image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src={image}
          alt={model}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(160deg, transparent 30%, #0D0D0D 75%)`,
          }}
        />
      </div>

      {/* Slant accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "6px",
          height: "100%",
          background: accentColor,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: `linear-gradient(90deg, ${accentColor} 40%, transparent)`,
        }}
      />

      {/* Category badge */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "16px",
          background: accentColor,
          color: "#fff",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "2px",
          textTransform: "uppercase",
          padding: "4px 10px",
          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
        }}
      >
        {category}
      </div>

      {/* Content */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 20px 20px 24px" }}>
        <p style={{ color: "#888", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 4px" }}>
          {brand} · {year}
        </p>
        <h2 style={{ color: "#fff", fontSize: "44px", fontWeight: 800, margin: "0 0 16px", lineHeight: 1, letterSpacing: "-1px" }}>
          {model}
        </h2>

        {/* Specs row */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "16px" }}>
          {specs.map((s) => (
            <div key={s.label}>
              <p style={{ color: accentColor, fontSize: "18px", fontWeight: 700, margin: 0, lineHeight: 1 }}>{s.value}</p>
              <p style={{ color: "#666", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", margin: "2px 0 0" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#fff", fontSize: "22px", fontWeight: 700 }}>{price}</span>
          <button
            style={{
              background: accentColor,
              color: "#fff",
              border: "none",
              padding: "8px 18px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
              cursor: "pointer",
            }}
          >
            Explore →
          </button>
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;800&display=swap');`}</style>
    </div>
  );
}