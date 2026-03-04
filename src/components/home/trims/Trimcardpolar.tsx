"use client";

import React, { useState } from "react";

interface Trim {
  name: string;
  price: string;
  msrp?: string;
  engine: string;
  power: string;
  drive: string;
  highlights: string[];
  tag?: string;
}

interface TrimCardPolarProps {
  model?: string;
  brand?: string;
  trims?: Trim[];
}

export default function TrimCardPolar({
  model = "Wrangler",
  brand = "Jeep",
  trims = [
    {
      name: "Sport",
      price: "$34,090",
      engine: "3.6L V6",
      power: "285 hp",
      drive: "4x4",
      highlights: ["17-in Steel Wheels", "Command-Trac 4WD", "Uconnect 7-in"],
      tag: "BASE",
    },
    {
      name: "Sahara",
      price: "$43,090",
      engine: "2.0L Turbo",
      power: "270 hp",
      drive: "4x4",
      highlights: ["18-in Alloys", "Leather Seats", "Body-Color Fenders"],
      tag: "POPULAR",
    },
    {
      name: "Rubicon",
      price: "$50,290",
      engine: "3.6L V6",
      power: "285 hp",
      drive: "Rock-Trac",
      highlights: ["Rock Rails", "Locking Diffs", "35-in Mud Tires"],
      tag: "OFF-ROAD",
    },
  ],
}: TrimCardPolarProps) {
  const [active, setActive] = useState(0);
  const trim = trims[active];

  const tagColors: Record<string, { bg: string; color: string }> = {
    BASE: { bg: "#E5E7EB", color: "#374151" },
    POPULAR: { bg: "#FEF08A", color: "#713F12" },
    "OFF-ROAD": { bg: "#166534", color: "#DCFCE7" },
  };
  const tagStyle = tagColors[trim.tag ?? ""] ?? { bg: "#E5E7EB", color: "#374151" };

  return (
    <div
      style={{
        fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
        width: "340px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
        cursor: "pointer",
      }}
    >
      {/* TOP: Black header */}
      <div
        style={{
          background: "#111",
          padding: "18px 22px 14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p style={{ color: "#555", fontSize: "11px", letterSpacing: "4px", margin: "0 0 2px" }}>{brand.toUpperCase()}</p>
          <h2 style={{ color: "#fff", fontSize: "32px", margin: 0, letterSpacing: "2px" }}>{model.toUpperCase()}</h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ color: "#555", fontSize: "10px", letterSpacing: "2px", margin: "0 0 2px" }}>FROM</p>
          <p style={{ color: "#fff", fontSize: "22px", margin: 0, letterSpacing: "1px" }}>{trim.price}</p>
        </div>
      </div>

      {/* Trim selector tabs */}
      <div style={{ display: "flex", background: "#1A1A1A" }}>
        {trims.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setActive(i)}
            style={{
              flex: 1,
              padding: "12px 4px",
              background: i === active ? "#fff" : "transparent",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
              position: "relative",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "2px",
                color: i === active ? "#111" : "#555",
                display: "block",
              }}
            >
              {t.name.toUpperCase()}
            </span>
            {i === active && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "20%",
                  right: "20%",
                  height: "3px",
                  background: "#111",
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* SPLIT BODY */}
      <div style={{ display: "flex", minHeight: "200px" }}>
        {/* Left: white specs */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            padding: "18px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            justifyContent: "center",
          }}
        >
          {[
            { label: "ENGINE", value: trim.engine },
            { label: "POWER", value: trim.power },
            { label: "DRIVE", value: trim.drive },
          ].map((s) => (
            <div key={s.label}>
              <p style={{ color: "#bbb", fontSize: "9px", letterSpacing: "3px", margin: "0 0 2px" }}>{s.label}</p>
              <p style={{ color: "#111", fontSize: "20px", margin: 0, letterSpacing: "1px", lineHeight: 1 }}>{s.value}</p>
            </div>
          ))}

          {trim.tag && (
            <div
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                background: tagStyle.bg,
                color: tagStyle.color,
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "2px",
                padding: "4px 10px",
                borderRadius: "3px",
                marginTop: "4px",
              }}
            >
              {trim.tag}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: "3px", background: "#111" }} />

        {/* Right: dark highlights */}
        <div
          style={{
            flex: 1,
            background: "#111",
            padding: "18px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <p style={{ color: "#444", fontSize: "9px", letterSpacing: "3px", margin: "0 0 4px" }}>INCLUDES</p>
          {trim.highlights.map((h) => (
            <div key={h} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <span style={{ color: "#fff", fontSize: "12px", lineHeight: 1, marginTop: "1px", flexShrink: 0 }}>▸</span>
              <span style={{ color: "#ccc", fontSize: "13px", lineHeight: 1.4, letterSpacing: "0.5px" }}>{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div
        style={{
          background: "#111",
          borderTop: "1px solid #222",
          padding: "14px 22px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          style={{
            flex: 2,
            padding: "11px",
            background: "#fff",
            border: "none",
            color: "#111",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "2px",
            cursor: "pointer",
            borderRadius: "4px",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
        >
          BUILD {trim.name.toUpperCase()}
        </button>
        <button
          style={{
            flex: 1,
            padding: "11px",
            background: "transparent",
            border: "1px solid #333",
            color: "#888",
            fontSize: "13px",
            letterSpacing: "1px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          COMPARE
        </button>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;600;700&display=swap');`}</style>
    </div>
  );
}