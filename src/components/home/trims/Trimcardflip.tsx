"use client";

import { useState } from "react";

interface TrimCardFlipProps {
  brand?: string;
  model?: string;
  trimName?: string;
  price?: string;
  image?: string;
  highlights?: string[];
  fullSpecs?: { label: string; value: string }[];
  accentColor?: string;
  tag?: string;
}

export default function TrimCardFlip({
  brand = "BMW",
  model = "M5",
  trimName = "Competition",
  price = "$107,000",
  image = "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
  highlights = ["617 hp", "AWD xDrive", "0–60 in 2.9s"],
  fullSpecs = [
    { label: "Engine", value: "4.4L V8 TwinTurbo" },
    { label: "Power", value: "617 hp / 553 lb-ft" },
    { label: "Transmission", value: "8-Speed M Steptronic" },
    { label: "Drive", value: "M xDrive AWD" },
    { label: "0–60 mph", value: "2.9 seconds" },
    { label: "Top Speed", value: "190 mph (limited)" },
    { label: "Brakes", value: "M Compound Carbon-Ceramic" },
    { label: "Weight", value: "4,387 lbs" },
  ],
  accentColor = "#0080FF",
  tag = "M DIVISION",
}: TrimCardFlipProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div style={{ perspective: "1400px", width: "300px", height: "380px", cursor: "pointer" }} onClick={() => setFlipped(!flipped)}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Nunito+Sans:wght@300;400;600&display=swap');

        @keyframes flipIn {
          from { transform: rotateY(90deg); opacity: 0; }
          to { transform: rotateY(0deg); opacity: 1; }
        }
        .flip-hint {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>

      <div style={{
        width: "100%",
        height: "100%",
        position: "relative",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)",
      }}>

        {/* FRONT */}
        <div style={{
          position: "absolute",
          inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#0D0D0D",
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
          {/* Image */}
          <div style={{ position: "relative", height: "190px", overflow: "hidden" }}>
            <img src={image} alt={`${brand} ${model}`} style={{
              width: "100%", height: "100%", objectFit: "cover",
              filter: "brightness(0.8)",
            }} />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, #0D0D0D 0%, transparent 60%)",
            }} />
            {/* Tag */}
            <div style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "2px",
              padding: "4px 10px",
              background: accentColor,
              color: "#fff",
              borderRadius: "2px",
            }}>{tag}</div>
          </div>

          {/* Content */}
          <div style={{ padding: "16px 20px 20px" }}>
            <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.4)", letterSpacing: "2px", textTransform: "uppercase" }}>{brand}</div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "32px", fontWeight: 700, color: "#fff", lineHeight: 1, letterSpacing: "1px", textTransform: "uppercase" }}>{model} {trimName}</div>

            <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
              {highlights.map((h, i) => (
                <div key={i} style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "11px",
                  color: accentColor,
                  background: `${accentColor}15`,
                  border: `1px solid ${accentColor}30`,
                  padding: "4px 10px",
                  borderRadius: "40px",
                }}>{h}</div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "24px", fontWeight: 600, color: "#fff" }}>{price}</div>
              <div className="flip-hint" style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "10px",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "1px",
              }}>Tap for full specs ↻</div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position: "absolute",
          inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          borderRadius: "12px",
          background: "#0D0D0D",
          border: `1px solid ${accentColor}30`,
          transform: "rotateY(180deg)",
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Back header */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "20px", fontWeight: 700, color: "#fff", letterSpacing: "1px" }}>{brand} {model}</div>
                <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "11px", color: accentColor }}>{trimName} Specifications</div>
              </div>
              <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>Tap to flip ↻</div>
            </div>
            <div style={{ height: "1px", background: `linear-gradient(to right, ${accentColor}, transparent)`, marginTop: "12px" }} />
          </div>

          {/* Specs */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto" }}>
            {fullSpecs.map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>{s.label}</div>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 600, color: "#fff", letterSpacing: "0.5px", textAlign: "right", maxWidth: "55%" }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Back footer */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "12px",
          }}>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "22px", fontWeight: 700, color: "#fff" }}>{price}</div>
            <button
              onClick={(e) => { e.stopPropagation(); }}
              style={{
                background: accentColor,
                border: "none",
                color: "#fff",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >Order Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}