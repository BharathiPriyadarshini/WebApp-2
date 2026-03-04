"use client";

import React, { useState } from "react";

interface ModelCardCinemaProps {
  brand?: string;
  model?: string;
  year?: number;
  tagline?: string;
  price?: string;
  image?: string;
  specs?: { label: string; value: string }[];
  accentColor?: string;
}

export default function ModelCardCinema({
  brand = "Aston Martin",
  model = "Vantage",
  year = 2024,
  tagline = "Engineered for the Fearless",
  price = "$142,000",
  image = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  specs = [
    { label: "Engine", value: "4.0L V8" },
    { label: "Output", value: "503 hp" },
    { label: "0–60", value: "3.6s" },
  ],
  accentColor = "#C9A84C",
}: ModelCardCinemaProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        position: "relative",
        width: "360px",
        height: "420px",
        borderRadius: "3px",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered
          ? "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.3)"
          : "0 16px 48px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.4s ease, transform 0.4s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Full bleed image */}
      <img
        src={image}
        alt={model}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          filter: "brightness(0.55) contrast(1.1)",
        }}
      />

      {/* Cinematic letterbox bars */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "42px",
          background: "#000",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          justifyContent: "space-between",
        }}
      >
        {/* Film strip dots */}
        <div style={{ display: "flex", gap: "5px" }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                width: "7px",
                height: "10px",
                borderRadius: "1px",
                background: i === 0 || i === 5 ? "#333" : "#222",
                border: "1px solid #444",
              }}
            />
          ))}
        </div>
        <span
          style={{
            color: accentColor,
            fontSize: "10px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {brand}
        </span>
        <div style={{ display: "flex", gap: "5px" }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                width: "7px",
                height: "10px",
                borderRadius: "1px",
                background: i === 0 || i === 5 ? "#333" : "#222",
                border: "1px solid #444",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom letterbox */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "42px",
          background: "#000",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          justifyContent: "space-between",
        }}
      >
        {/* Specs in mono */}
        {specs.map((s, i) => (
          <React.Fragment key={s.label}>
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  color: "#fff",
                  fontSize: "11px",
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "1px",
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  display: "block",
                  color: "#555",
                  fontSize: "8px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {s.label}
              </span>
            </div>
            {i < specs.length - 1 && (
              <div style={{ width: "1px", height: "20px", background: "#333" }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Content overlay */}
      <div
        style={{
          position: "absolute",
          inset: "42px 0",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 26px 24px",
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
        }}
      >
        {/* Year */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: `${accentColor}66` }} />
          <span
            style={{
              color: accentColor,
              fontSize: "11px",
              letterSpacing: "3px",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {year}
          </span>
          <div style={{ flex: 1, height: "1px", background: `${accentColor}66` }} />
        </div>

        {/* Model name */}
        <h2
          style={{
            color: "#fff",
            fontSize: "52px",
            fontWeight: 700,
            lineHeight: 0.9,
            margin: "0 0 10px",
            letterSpacing: "-1px",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          {model}
        </h2>

        {/* Tagline */}
        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: "13px",
            fontStyle: "italic",
            margin: "0 0 16px",
            letterSpacing: "0.5px",
          }}
        >
          {tagline}
        </p>

        {/* Price + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              color: accentColor,
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            {price}
          </span>
          <button
            style={{
              background: "transparent",
              border: `1px solid ${accentColor}`,
              color: accentColor,
              padding: "8px 20px",
              fontSize: "10px",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "3px",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: "1px",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = accentColor;
              (e.currentTarget as HTMLButtonElement).style.color = "#000";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = accentColor;
            }}
          >
            Discover
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');
      `}</style>
    </div>
  );
}