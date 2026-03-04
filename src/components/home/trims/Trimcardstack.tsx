"use client";

import { useState } from "react";

interface TrimItem {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  color: string;
  emoji?: string;
}

interface TrimCardStackProps {
  model?: string;
  brand?: string;
  trims?: TrimItem[];
}

export default function TrimCardStack({
  model = "Taycan",
  brand = "Porsche",
  trims = [
    {
      name: "Taycan",
      price: "$93,700",
      tagline: "Dual motor. Pure exhilaration.",
      color: "#C0C0C0",
      emoji: "⚡",
      features: ["408 hp / 599 lb-ft", "Range: 246 mi", "0–60: 5.1s", "Base Overboost"],
    },
    {
      name: "Taycan 4S",
      price: "$113,300",
      tagline: "Awaken all four corners.",
      color: "#E5B700",
      emoji: "🔱",
      features: ["522 hp / 626 lb-ft", "Range: 227 mi", "0–60: 3.8s", "Sport Chrono Pkg"],
    },
    {
      name: "Taycan GTS",
      price: "$134,400",
      tagline: "Track soul. Road approved.",
      color: "#FF4444",
      emoji: "🏁",
      features: ["590 hp / 626 lb-ft", "Range: 217 mi", "0–60: 3.5s", "GTS Sport Chassis"],
    },
    {
      name: "Taycan Turbo S",
      price: "$187,400",
      tagline: "Defiance in motion.",
      color: "#8B5CF6",
      emoji: "🚀",
      features: ["750 hp / 1,084 lb-ft", "Range: 201 mi", "0–60: 2.4s", "Carbon-Ceramic Brakes"],
    },
  ],
}: TrimCardStackProps) {
  const [expanded, setExpanded] = useState<number | null>(2);

  return (
    <div style={{ width: "320px", fontFamily: "system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&family=Roboto+Mono:wght@300;400&display=swap');

        @keyframes expandIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stack-feature {
          animation: expandIn 0.25s ease forwards;
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "10px", letterSpacing: "3px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>{brand}</div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "32px", fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>{model}</div>
        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "10px", color: "rgba(255,255,255,0.25)", marginTop: "2px" }}>Select your variant</div>
      </div>

      {/* Stacked trims */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {trims.map((trim, i) => {
          const isOpen = expanded === i;
          return (
            <div
              key={i}
              onClick={() => setExpanded(isOpen ? null : i)}
              style={{
                background: isOpen ? `linear-gradient(135deg, ${trim.color}18, rgba(20,20,20,0.95))` : "rgba(15,15,15,0.9)",
                border: `1px solid ${isOpen ? trim.color + "50" : "rgba(255,255,255,0.05)"}`,
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {/* Header row */}
              <div style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 16px",
                gap: "12px",
              }}>
                {/* Color dot + emoji */}
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: isOpen ? trim.color : "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  flexShrink: 0,
                  transition: "all 0.35s",
                  boxShadow: isOpen ? `0 0 16px ${trim.color}50` : "none",
                }}>{trim.emoji}</div>

                {/* Name + tagline */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "15px",
                    fontWeight: isOpen ? 700 : 600,
                    color: isOpen ? "#fff" : "rgba(255,255,255,0.75)",
                    letterSpacing: "-0.3px",
                    transition: "all 0.3s",
                  }}>{trim.name}</div>
                  {isOpen && (
                    <div style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "11px",
                      fontWeight: 300,
                      color: trim.color,
                      fontStyle: "italic",
                      marginTop: "1px",
                    }}>{trim.tagline}</div>
                  )}
                </div>

                {/* Price + chevron */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: isOpen ? trim.color : "#fff",
                    transition: "color 0.3s",
                  }}>{trim.price}</div>
                </div>
                <div style={{
                  color: isOpen ? trim.color : "rgba(255,255,255,0.2)",
                  fontSize: "12px",
                  transform: isOpen ? "rotate(180deg)" : "none",
                  transition: "all 0.3s",
                  fontFamily: "sans-serif",
                }}>▼</div>
              </div>

              {/* Expanded features */}
              {isOpen && (
                <div style={{ padding: "0 16px 16px 64px" }}>
                  <div style={{
                    height: "1px",
                    background: `linear-gradient(to right, ${trim.color}40, transparent)`,
                    marginBottom: "12px",
                  }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {trim.features.map((f, fi) => (
                      <div
                        key={fi}
                        className="stack-feature"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          animationDelay: `${fi * 50}ms`,
                          opacity: 0,
                        }}
                      >
                        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: trim.color, flexShrink: 0 }} />
                        <span style={{
                          fontFamily: "'Roboto Mono', monospace",
                          fontSize: "12px",
                          fontWeight: 300,
                          color: "rgba(255,255,255,0.75)",
                          letterSpacing: "0.5px",
                        }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      marginTop: "14px",
                      width: "100%",
                      padding: "10px",
                      background: trim.color,
                      border: "none",
                      borderRadius: "6px",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "2px",
                      color: "#000",
                      cursor: "pointer",
                      textTransform: "uppercase",
                    }}
                  >Configure This Trim</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}