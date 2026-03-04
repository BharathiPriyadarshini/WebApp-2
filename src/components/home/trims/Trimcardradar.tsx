"use client";

import { useState } from "react";

interface TrimData {
  name: string;
  price: string;
  scores: {
    performance: number;
    comfort: number;
    tech: number;
    efficiency: number;
    cargo: number;
    safety: number;
  };
  tag?: string;
}

interface TrimCardRadarProps {
  model?: string;
  brand?: string;
  trims?: TrimData[];
  accentColor?: string;
}

function RadarChart({ scores, color, size = 140 }: { scores: TrimData["scores"]; color: string; size?: number }) {
  const keys = Object.keys(scores) as (keyof typeof scores)[];
  const n = keys.length;
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.4;

  const angleOffset = -Math.PI / 2;
  const points = keys.map((_, i) => {
    const angle = (i / n) * Math.PI * 2 + angleOffset;
    const val = scores[keys[i]] / 100;
    return {
      x: cx + r * val * Math.cos(angle),
      y: cy + r * val * Math.sin(angle),
      ax: cx + (r + 16) * Math.cos(angle),
      ay: cy + (r + 16) * Math.sin(angle),
      label: keys[i],
    };
  });

  const polyPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  // Background rings
  const rings = [0.25, 0.5, 0.75, 1];
  const ringPaths = rings.map((scale) =>
    keys.map((_, i) => {
      const angle = (i / n) * Math.PI * 2 + angleOffset;
      return `${cx + r * scale * Math.cos(angle)},${cy + r * scale * Math.sin(angle)}`;
    }).join(" ")
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background rings */}
      {ringPaths.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      {/* Spokes */}
      {points.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos((i / n) * Math.PI * 2 + angleOffset)} y2={cy + r * Math.sin((i / n) * Math.PI * 2 + angleOffset)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      {/* Data polygon */}
      <polygon points={polyPoints} fill={`${color}20`} stroke={color} strokeWidth="1.5" />
      {/* Data dots */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={color} />
      ))}
      {/* Labels */}
      {points.map((p, i) => (
        <text key={i} x={p.ax} y={p.ay} textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: "7px", fill: "rgba(255,255,255,0.4)", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {p.label.substring(0, 4)}
        </text>
      ))}
    </svg>
  );
}

export default function TrimCardRadar({
  model = "Model 3",
  brand = "Tesla",
  trims = [
    { name: "Standard RWD", price: "$40,240", tag: "BASE", scores: { performance: 55, comfort: 70, tech: 85, efficiency: 90, cargo: 65, safety: 88 } },
    { name: "Long Range AWD", price: "$47,240", tag: "POPULAR", scores: { performance: 75, comfort: 80, tech: 90, efficiency: 85, cargo: 65, safety: 92 } },
    { name: "Performance", price: "$53,240", tag: "SPORT", scores: { performance: 97, comfort: 70, tech: 92, efficiency: 72, cargo: 65, safety: 92 } },
  ],
  accentColor = "#E5FF00",
}: TrimCardRadarProps) {
  const [selected, setSelected] = useState(0);
  const trim = trims[selected];

  const colors = [accentColor, "#00D4FF", "#FF4444"];

  return (
    <div style={{
      width: "380px",
      background: "#0A0A0A",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "12px",
      overflow: "hidden",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      `}</style>

      {/* Header */}
      <div style={{ padding: "20px 20px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "3px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>{brand}</div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.1 }}>{model}</div>
          </div>
          {trim.tag && (
            <div style={{
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "2px",
              padding: "4px 10px",
              background: `${colors[selected]}15`,
              color: colors[selected],
              border: `1px solid ${colors[selected]}30`,
              borderRadius: "40px",
            }}>{trim.tag}</div>
          )}
        </div>

        {/* Trim selector tabs */}
        <div style={{ display: "flex", gap: "0" }}>
          {trims.map((t, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{
              flex: 1,
              padding: "10px 8px",
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${selected === i ? colors[i] : "transparent"}`,
              cursor: "pointer",
              transition: "border-color 0.3s",
            }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: selected === i ? "#fff" : "rgba(255,255,255,0.35)", fontFamily: "'Space Grotesk', sans-serif" }}>{t.name.split(" ")[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main content: radar + info */}
      <div style={{ padding: "20px", display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Radar */}
        <div style={{ flexShrink: 0 }}>
          <RadarChart scores={trim.scores} color={colors[selected]} size={160} />
        </div>

        {/* Scores list */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          {(Object.entries(trim.scores) as [string, number][]).map(([key, val]) => (
            <div key={key}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>{key}</span>
                <span style={{ fontSize: "10px", color: "#fff", fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>{val}</span>
              </div>
              <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{
                  width: `${val}%`,
                  height: "100%",
                  background: colors[selected],
                  borderRadius: "2px",
                  transition: "width 0.5s ease, background 0.3s",
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: "16px 20px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(255,255,255,0.02)",
      }}>
        <div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "'Space Grotesk', sans-serif" }}>{trim.name}</div>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>{trim.price}</div>
        </div>
        <button style={{
          background: colors[selected],
          border: "none",
          color: "#000",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "12px",
          fontWeight: 600,
          padding: "10px 20px",
          borderRadius: "6px",
          cursor: "pointer",
          letterSpacing: "0.5px",
        }}>Configure →</button>
      </div>
    </div>
  );
}