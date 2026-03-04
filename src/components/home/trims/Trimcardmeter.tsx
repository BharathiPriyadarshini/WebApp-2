"use client";

import { useState, useEffect, useRef } from "react";

interface TrimLevel {
  name: string;
  price: string;
  color: string;
  gauges: {
    label: string;
    value: number; // 0-100
    unit?: string;
  }[];
  badge?: string;
}

interface TrimCardMeterProps {
  model?: string;
  brand?: string;
  image?: string;
  trims?: TrimLevel[];
}

export default function TrimCardMeter({
  model = "Civic",
  brand = "Honda",
  image = "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80",
  trims = [
    {
      name: "Sport",
      price: "$26,700",
      color: "#FF6B35",
      badge: "ENTRY",
      gauges: [
        { label: "Power", value: 42, unit: "158hp" },
        { label: "Efficiency", value: 78, unit: "36mpg" },
        { label: "Comfort", value: 60, unit: "" },
        { label: "Tech", value: 50, unit: "" },
      ],
    },
    {
      name: "Sport Touring",
      price: "$32,450",
      color: "#00C896",
      badge: "BEST VALUE",
      gauges: [
        { label: "Power", value: 42, unit: "158hp" },
        { label: "Efficiency", value: 75, unit: "34mpg" },
        { label: "Comfort", value: 80, unit: "" },
        { label: "Tech", value: 85, unit: "" },
      ],
    },
    {
      name: "Type R",
      price: "$44,990",
      color: "#FF2D55",
      badge: "PERFORMANCE",
      gauges: [
        { label: "Power", value: 85, unit: "315hp" },
        { label: "Efficiency", value: 52, unit: "28mpg" },
        { label: "Comfort", value: 45, unit: "" },
        { label: "Tech", value: 80, unit: "" },
      ],
    },
  ],
}: TrimCardMeterProps) {
  const [selected, setSelected] = useState(0);
  const [animated, setAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const trim = trims[selected];

  useEffect(() => {
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(t);
  }, [selected]);

  return (
    <div
      ref={cardRef}
      style={{
        width: "360px",
        background: "#111",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&family=Noto+Sans:wght@300;400&display=swap');
        .meter-bar-fill {
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* Image + overlay */}
      <div style={{ position: "relative", height: "160px" }}>
        <img src={image} alt={model} style={{
          width: "100%", height: "100%", objectFit: "cover",
          filter: "brightness(0.5) saturate(0.7)",
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${trim.color}30 0%, transparent 60%, rgba(0,0,0,0.8) 100%)`,
          transition: "background 0.4s",
        }} />
        {/* Brand + model overlay */}
        <div style={{ position: "absolute", bottom: "16px", left: "20px" }}>
          <div style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: "10px", fontWeight: 300, color: "rgba(255,255,255,0.5)", letterSpacing: "3px", textTransform: "uppercase" }}>{brand}</div>
          <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "30px", fontWeight: 700, color: "#fff", lineHeight: 1, textTransform: "uppercase", letterSpacing: "1px" }}>{model}</div>
        </div>
        {/* Badge */}
        {trim.badge && (
          <div style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            fontFamily: "'Chakra Petch', sans-serif",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "2px",
            padding: "4px 10px",
            background: trim.color,
            color: "#fff",
            borderRadius: "2px",
          }}>{trim.badge}</div>
        )}
      </div>

      {/* Trim selector */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {trims.map((t, i) => (
          <button key={i} onClick={() => setSelected(i)} style={{
            flex: 1,
            padding: "12px 8px",
            background: selected === i ? "rgba(255,255,255,0.04)" : "transparent",
            border: "none",
            borderBottom: `2px solid ${selected === i ? t.color : "transparent"}`,
            cursor: "pointer",
            transition: "all 0.3s",
          }}>
            <div style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontSize: "12px",
              fontWeight: selected === i ? 600 : 400,
              color: selected === i ? "#fff" : "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}>{t.name}</div>
          </button>
        ))}
      </div>

      {/* Gauges */}
      <div style={{ padding: "20px" }}>
        {trim.gauges.map((g, i) => (
          <div key={`${selected}-${i}`} style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", alignItems: "center" }}>
              <span style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "1px", textTransform: "uppercase" }}>{g.label}</span>
              <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "12px", color: trim.color, fontWeight: 500 }}>{g.unit}</span>
            </div>
            <div style={{
              height: "8px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "4px",
              overflow: "hidden",
              position: "relative",
            }}>
              {/* Track marks */}
              {[25, 50, 75].map((mark) => (
                <div key={mark} style={{
                  position: "absolute",
                  left: `${mark}%`,
                  top: 0,
                  bottom: 0,
                  width: "1px",
                  background: "rgba(255,255,255,0.08)",
                  zIndex: 1,
                }} />
              ))}
              <div
                className="meter-bar-fill"
                style={{
                  width: animated ? `${g.value}%` : "0%",
                  height: "100%",
                  background: `linear-gradient(to right, ${trim.color}80, ${trim.color})`,
                  borderRadius: "4px",
                  position: "relative",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {/* Glow tip */}
                <div style={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "10px",
                  height: "14px",
                  background: trim.color,
                  borderRadius: "2px",
                  boxShadow: `0 0 8px ${trim.color}`,
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: "16px 20px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(0,0,0,0.4)",
      }}>
        <div>
          <div style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "2px", textTransform: "uppercase" }}>Starting at</div>
          <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "24px", fontWeight: 700, color: "#fff" }}>{trim.price}</div>
        </div>
        <button style={{
          background: "transparent",
          border: `1px solid ${trim.color}`,
          color: trim.color,
          fontFamily: "'Chakra Petch', sans-serif",
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "2px",
          padding: "10px 18px",
          borderRadius: "4px",
          cursor: "pointer",
          textTransform: "uppercase",
          transition: "all 0.2s",
        }}>Select</button>
      </div>
    </div>
  );
}