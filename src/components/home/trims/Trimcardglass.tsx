"use client";

import React, { useState } from "react";

interface TrimCardGlassProps {
  model: string;
  brand: string;
  trimName: string;
  price: string;
  monthlyEstimate?: string;
  image?: string;
  features?: { icon: string; label: string; value: string }[];
  colorOptions?: string[];
}

export default function TrimCardGlass({
  model = "Model S",
  brand = "Tesla",
  trimName = "Plaid",
  price = "$108,490",
  monthlyEstimate = "$1,820/mo",
  image = "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80",
  features = [
    { icon: "⚡", label: "Range", value: "396 mi" },
    { icon: "🏁", label: "0–60", value: "1.99s" },
    { icon: "💨", label: "Top Speed", value: "200 mph" },
    { icon: "🔋", label: "Charge", value: "250 kW" },
  ],
  colorOptions = ["#1A1A2E", "#B8001F", "#F5F5F5", "#1A3A5C", "#2D6A4F"],
}: TrimCardGlassProps) {
  const [activeColor, setActiveColor] = useState(0);

  return (
    <div
      style={{
        fontFamily: "'Syne', sans-serif",
        width: "320px",
        borderRadius: "24px",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img src={image} alt={model} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, rgba(10,10,30,0.4) 0%, rgba(5,5,20,0.85) 100%)",
          }}
        />
      </div>

      {/* Animated gradient orb */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colorOptions[activeColor]}88 0%, transparent 70%)`,
          filter: "blur(30px)",
          transition: "background 0.5s ease",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, padding: "24px 22px" }}>
        {/* Header */}
        <div style={{ marginBottom: "100px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", margin: "0 0 4px" }}>
                {brand}
              </p>
              <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: 800, margin: 0 }}>
                {model}{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #E0E0E0, #fff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {trimName}
                </span>
              </h2>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px",
                padding: "6px 12px",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "8px", letterSpacing: "1px", margin: "0 0 2px" }}>STARTING</p>
              <p style={{ color: "#fff", fontSize: "15px", fontWeight: 700, margin: 0 }}>{price}</p>
            </div>
          </div>
        </div>

        {/* Glass card inset */}
        <div
          style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "16px",
            padding: "18px",
            marginBottom: "14px",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {features.map((f) => (
              <div key={f.label}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "14px" }}>{f.icon}</span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase" }}>
                    {f.label}
                  </span>
                </div>
                <p style={{ color: "#fff", fontSize: "18px", fontWeight: 700, margin: 0, lineHeight: 1 }}>{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Color picker + monthly */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "9px", letterSpacing: "1px", margin: "0 0 6px" }}>COLOR</p>
            <div style={{ display: "flex", gap: "6px" }}>
              {colorOptions.map((c, i) => (
                <button
                  key={c}
                  onClick={() => setActiveColor(i)}
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: c,
                    border: `2px solid ${i === activeColor ? "#fff" : "transparent"}`,
                    cursor: "pointer",
                    boxShadow: i === activeColor ? `0 0 8px ${c}` : "none",
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "9px", letterSpacing: "1px", margin: "0 0 2px" }}>EST. MONTHLY</p>
            <p style={{ color: "#fff", fontSize: "15px", fontWeight: 700, margin: 0 }}>{monthlyEstimate}</p>
          </div>
        </div>

        {/* CTA */}
        <button
          style={{
            marginTop: "14px",
            width: "100%",
            padding: "13px",
            background: "rgba(255,255,255,0.9)",
            color: "#111",
            border: "none",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#fff")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.9)")}
        >
          Order Now
        </button>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');`}</style>
    </div>
  );
}