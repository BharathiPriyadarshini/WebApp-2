"use client";

import React, { useState } from "react";

interface TrimOption {
  name: string;
  price: string;
  color: string;
  features: string[];
  tier: number; // 1-5
}

interface TrimCardSpectrumProps {
  model: string;
  trims?: TrimOption[];
  selectedIndex?: number;
}

export default function TrimCardSpectrum({
  model = "Mustang",
  trims = [
    { name: "EcoBoost", price: "$32,515", color: "#4B8BFF", tier: 2, features: ["2.3L Turbo", "310 hp", "6-Speed Manual"] },
    { name: "GT", price: "$42,770", color: "#FF6B35", tier: 3, features: ["5.0L V8", "450 hp", "10-Speed Auto"] },
    { name: "GT Premium", price: "$49,580", color: "#9B59B6", tier: 4, features: ["5.0L V8", "450 hp", "B&O Audio"] },
    { name: "Dark Horse", price: "$58,235", color: "#2C3E50", tier: 5, features: ["5.0L V8", "500 hp", "Track Pack"] },
  ],
}: TrimCardSpectrumProps) {
  const [selected, setSelected] = useState(0);
  const trim = trims[selected];

  return (
    <div
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        width: "340px",
        background: "#0E0E0E",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          padding: "18px 22px 14px",
          borderBottom: "1px solid #1E1E1E",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p style={{ color: "#666", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 2px" }}>Ford</p>
          <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: 700, margin: 0 }}>{model}</h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ color: "#666", fontSize: "9px", letterSpacing: "2px", margin: "0 0 2px" }}>TRIM LEVEL</p>
          <div style={{ display: "flex", gap: "4px" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  width: "18px",
                  height: "4px",
                  borderRadius: "2px",
                  background: i <= trim.tier ? trim.color : "#2A2A2A",
                  transition: "background 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Color swatches / trim selector */}
      <div style={{ padding: "16px 22px", display: "flex", gap: "10px" }}>
        {trims.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setSelected(i)}
            style={{
              flex: 1,
              padding: "10px 4px",
              background: i === selected ? "#1A1A1A" : "transparent",
              border: `2px solid ${i === selected ? t.color : "#2A2A2A"}`,
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: t.color,
                boxShadow: i === selected ? `0 0 12px ${t.color}` : "none",
                transition: "box-shadow 0.3s ease",
              }}
            />
            <span style={{ color: i === selected ? "#fff" : "#555", fontSize: "9px", letterSpacing: "0.5px", textAlign: "center" }}>
              {t.name}
            </span>
          </button>
        ))}
      </div>

      {/* Active trim details */}
      <div
        style={{
          margin: "0 16px 16px",
          background: "#141414",
          borderRadius: "10px",
          border: `1px solid ${trim.color}22`,
          padding: "18px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
          <div>
            <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: "0 0 2px" }}>{trim.name}</h3>
            <p style={{ color: "#555", fontSize: "10px", letterSpacing: "1px", margin: 0 }}>TRIM VARIANT</p>
          </div>
          <div
            style={{
              background: `${trim.color}22`,
              border: `1px solid ${trim.color}44`,
              borderRadius: "8px",
              padding: "6px 12px",
            }}
          >
            <p style={{ color: trim.color, fontSize: "16px", fontWeight: 700, margin: 0 }}>{trim.price}</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {trim.features.map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: trim.color, flexShrink: 0 }} />
              <span style={{ color: "#ccc", fontSize: "13px" }}>{f}</span>
            </div>
          ))}
        </div>

        <button
          style={{
            marginTop: "16px",
            width: "100%",
            padding: "11px",
            background: trim.color,
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "1px",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Configure This Trim
        </button>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap');`}</style>
    </div>
  );
}