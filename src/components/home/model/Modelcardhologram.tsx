"use client";

import { useState, useRef, MouseEvent } from "react";

interface ModelCardHologramProps {
  brand?: string;
  model?: string;
  year?: number;
  price?: string;
  image?: string;
  tagline?: string;
  specs?: { label: string; value: string }[];
}

export default function ModelCardHologram({
  brand = "Rolls-Royce",
  model = "Spectre",
  year = 2024,
  price = "$413,000",
  image = "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=600&q=80",
  tagline = "The Future of Opulence",
  specs = [
    { label: "Range", value: "320 mi" },
    { label: "Output", value: "577 hp" },
    { label: "0–62", value: "4.5s" },
  ],
}: ModelCardHologramProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * 20, y: (x - 0.5) * -20 });
    setMousePos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div style={{ perspective: "1200px" }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          width: "320px",
          height: "420px",
          borderRadius: "20px",
          cursor: "pointer",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered ? "transform 0.1s linear" : "transform 0.6s ease",
          transformStyle: "preserve-3d",
          overflow: "hidden",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Syncopate:wght@400;700&display=swap');

          @keyframes holoShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes shimmerLine {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(300%) rotate(45deg); }
          }
          .holo-shimmer {
            animation: shimmerLine 3s ease-in-out infinite;
          }
        `}</style>

        {/* Holographic background */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              ${mousePos.x * 1.8}deg,
              #0f0c29 0%,
              #302b63 25%,
              #24243e 50%,
              #0f0c29 75%
            )
          `,
        }} />

        {/* Foil rainbow layer */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(
              ellipse at ${mousePos.x}% ${mousePos.y}%,
              rgba(255,0,128,0.15) 0%,
              rgba(0,255,255,0.12) 25%,
              rgba(128,0,255,0.1) 50%,
              rgba(255,128,0,0.08) 75%,
              transparent 100%
            )
          `,
          mixBlendMode: "screen",
        }} />

        {/* Shimmer sweep */}
        <div className="holo-shimmer" style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "30%",
          height: "200%",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
          pointerEvents: "none",
        }} />

        {/* Grid lines */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }} />

        {/* Car image */}
        <div style={{
          position: "absolute",
          bottom: "120px",
          left: 0,
          right: 0,
          height: "200px",
          overflow: "hidden",
        }}>
          <img
            src={image}
            alt={`${brand} ${model}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              mixBlendMode: "luminosity",
              opacity: 0.8,
              transform: `translateX(${(mousePos.x - 50) * -0.05}px) translateY(${(mousePos.y - 50) * -0.03}px)`,
              transition: "transform 0.1s linear",
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(15,12,41,0.9) 0%, transparent 60%, rgba(15,12,41,0.6) 100%)",
          }} />
        </div>

        {/* Glass card inner */}
        <div style={{
          position: "absolute",
          inset: "12px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(4px)",
        }} />

        {/* Content */}
        <div style={{ position: "absolute", inset: 0, padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {/* Top */}
          <div>
            <div style={{
              fontFamily: "'Syncopate', sans-serif",
              fontSize: "9px",
              letterSpacing: "4px",
              color: "rgba(200,180,255,0.7)",
              textTransform: "uppercase",
            }}>{brand}</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "48px",
              fontWeight: 300,
              color: "#fff",
              lineHeight: 1,
              letterSpacing: "-1px",
            }}>{model}</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "14px",
              fontStyle: "italic",
              color: "rgba(200,180,255,0.6)",
            }}>{tagline}</div>
          </div>

          {/* Bottom */}
          <div>
            {/* Specs */}
            <div style={{
              display: "flex",
              gap: "0",
              marginBottom: "20px",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              overflow: "hidden",
            }}>
              {specs.map((s, i) => (
                <div key={i} style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "10px 8px",
                  borderRight: i < specs.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  background: "rgba(255,255,255,0.02)",
                }}>
                  <div style={{
                    fontFamily: "'Syncopate', sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1,
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "11px",
                    color: "rgba(200,180,255,0.5)",
                    fontStyle: "italic",
                    marginTop: "2px",
                  }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", fontStyle: "italic", color: "rgba(200,180,255,0.4)" }}>Starting from</div>
                <div style={{ fontFamily: "'Syncopate', sans-serif", fontSize: "18px", color: "#fff", letterSpacing: "1px" }}>{price}</div>
              </div>
              <div style={{
                fontFamily: "'Syncopate', sans-serif",
                fontSize: "9px",
                letterSpacing: "2px",
                color: "rgba(200,180,255,0.8)",
                border: "1px solid rgba(200,180,255,0.3)",
                padding: "8px 14px",
                borderRadius: "40px",
                background: "rgba(200,180,255,0.05)",
              }}>DISCOVER</div>
            </div>
          </div>
        </div>

        {/* Year badge */}
        <div style={{
          position: "absolute",
          top: "28px",
          right: "28px",
          fontFamily: "'Syncopate', sans-serif",
          fontSize: "10px",
          color: "rgba(200,180,255,0.5)",
          letterSpacing: "3px",
        }}>{year}</div>
      </div>
    </div>
  );
}