"use client";

import React, { useState } from "react";

interface ModelCardRevealProps {
  brand: string;
  model: string;
  year: number;
  tagline: string;
  price: string;
  image: string;
  features?: string[];
}

export default function ModelCardReveal({
  brand = "BMW",
  model = "M4",
  year = 2024,
  tagline = "Born on the Track",
  price = "From $74,700",
  image = "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
  features = ["Twin-Turbo 3.0L", "503 hp", "xDrive AWD", "7-Speed DCT"],
}: ModelCardRevealProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        width: "300px",
        height: "440px",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered ? "0 32px 80px rgba(0,0,0,0.4)" : "0 12px 40px rgba(0,0,0,0.2)",
        transition: "box-shadow 0.4s ease, transform 0.4s ease",
        transform: hovered ? "scale(1.03)" : "scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <img
        src={image}
        alt={model}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.6s ease",
        }}
      />

      {/* Default gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
        }}
      />

      {/* Reveal overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(10,10,30,0.92) 0%, rgba(20,20,50,0.88) 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px",
          gap: "12px",
        }}
      >
        <p style={{ color: "#A0A8FF", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", margin: 0 }}>
          {brand} · {year}
        </p>
        <h3 style={{ color: "#fff", fontSize: "36px", fontWeight: 700, margin: 0 }}>{model}</h3>
        <p style={{ color: "#ccc", fontSize: "13px", fontStyle: "italic", margin: "0 0 12px" }}>{tagline}</p>
        <div style={{ width: "40px", height: "2px", background: "#A0A8FF", margin: "0 0 12px" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
          {features.map((f) => (
            <div
              key={f}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#ddd",
                fontSize: "13px",
              }}
            >
              <span style={{ color: "#A0A8FF", fontSize: "16px" }}>✦</span> {f}
            </div>
          ))}
        </div>
        <button
          style={{
            marginTop: "16px",
            background: "transparent",
            border: "1px solid #A0A8FF",
            color: "#A0A8FF",
            padding: "10px 28px",
            borderRadius: "40px",
            fontSize: "12px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#A0A8FF";
            (e.currentTarget as HTMLButtonElement).style.color = "#000";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#A0A8FF";
          }}
        >
          View Model
        </button>
      </div>

      {/* Default bottom content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px 20px",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 4px" }}>
          {brand}
        </p>
        <h3 style={{ color: "#fff", fontSize: "32px", fontWeight: 700, margin: "0 0 4px" }}>{model}</h3>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: 0 }}>{price}</p>
      </div>

      {/* Hover hint */}
      {!hovered && (
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "16px",
          }}
        >
          ↗
        </div>
      )}

      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');`}</style>
    </div>
  );
}