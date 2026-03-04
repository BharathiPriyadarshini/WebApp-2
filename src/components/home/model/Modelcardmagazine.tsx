"use client";

import React from "react";

interface ModelCardMagazineProps {
  brand: string;
  model: string;
  year: number;
  subtitle: string;
  price: string;
  image: string;
  tag?: string;
  rating?: number;
}

export default function ModelCardMagazine({
  brand = "Mercedes-Benz",
  model = "AMG GT",
  year = 2024,
  subtitle = "The Ultimate Grand Tourer",
  price = "$118,000",
  image = "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
  tag = "EDITOR'S PICK",
  rating = 9.4,
}: ModelCardMagazineProps) {
  return (
    <div
      style={{
        fontFamily: "'Playfair Display', serif",
        position: "relative",
        width: "340px",
        background: "#FAFAF8",
        borderRadius: "2px",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        border: "1px solid #E8E4DC",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.15)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Image area */}
      <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
        <img src={image} alt={model} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {/* Tag */}
        {tag && (
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: 0,
              background: "#1A1A1A",
              color: "#D4AF37",
              fontSize: "9px",
              fontFamily: "'DM Mono', monospace",
              fontWeight: 600,
              letterSpacing: "3px",
              padding: "5px 14px 5px 12px",
            }}
          >
            {tag}
          </div>
        )}
        {/* Rating */}
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            right: "14px",
            background: "#1A1A1A",
            color: "#fff",
            borderRadius: "2px",
            padding: "6px 10px",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "18px", fontWeight: 700, lineHeight: 1, color: "#D4AF37" }}>
            {rating}
          </div>
          <div style={{ fontSize: "8px", letterSpacing: "2px", color: "#888", marginTop: "2px" }}>SCORE</div>
        </div>
      </div>

      {/* Divider rule */}
      <div style={{ height: "1px", background: "#E8E4DC", margin: "0 20px" }} />

      {/* Content */}
      <div style={{ padding: "20px 24px 24px" }}>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "9px",
            letterSpacing: "3px",
            color: "#999",
            textTransform: "uppercase",
            margin: "0 0 8px",
          }}
        >
          {brand} &nbsp;·&nbsp; {year}
        </p>
        <h2 style={{ fontSize: "30px", fontWeight: 700, margin: "0 0 6px", lineHeight: 1.1, color: "#1A1A1A" }}>
          {model}
        </h2>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            color: "#777",
            fontStyle: "italic",
            margin: "0 0 16px",
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>

        {/* Decorative rule */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 0 16px" }}>
          <div style={{ flex: 1, height: "1px", background: "#E8E4DC" }} />
          <span style={{ color: "#D4AF37", fontSize: "14px" }}>✦</span>
          <div style={{ flex: 1, height: "1px", background: "#E8E4DC" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "#999", letterSpacing: "2px", margin: "0 0 2px" }}>
              STARTING PRICE
            </p>
            <p style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A", margin: 0 }}>{price}</p>
          </div>
          <button
            style={{
              background: "#1A1A1A",
              color: "#D4AF37",
              border: "none",
              padding: "10px 18px",
              fontSize: "9px",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "2px",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: "1px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#D4AF37", (e.currentTarget as HTMLButtonElement).style.color = "#1A1A1A")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1A1A1A", (e.currentTarget as HTMLButtonElement).style.color = "#D4AF37")}
          >
            Read More
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Mono:ital,wght@0,400;0,600;1,400&display=swap');
      `}</style>
    </div>
  );
}