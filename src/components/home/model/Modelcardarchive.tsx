"use client";

import { useState } from "react";

interface ModelCardArchiveProps {
  brand?: string;
  model?: string;
  year?: number;
  price?: string;
  image?: string;
  edition?: string;
  description?: string;
  specs?: { label: string; value: string }[];
  issueNumber?: string;
}

export default function ModelCardArchive({
  brand = "Jaguar",
  model = "F-Type",
  year = 2024,
  price = "$69,900",
  image = "https://images.unsplash.com/photo-1514316703755-dca7d7d9d882?w=600&q=80",
  edition = "R-Dynamic Edition",
  description = "A visceral, athletic GT car with a supercharged V8 that howls.",
  specs = [
    { label: "Engine", value: "5.0L Supercharged V8" },
    { label: "Output", value: "575 hp / 516 lb-ft" },
    { label: "Trans", value: "8-Speed Automatic" },
    { label: "Drive", value: "Rear-Wheel Drive" },
  ],
  issueNumber = "No. 047",
}: ModelCardArchiveProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "320px",
        background: "#F5F0E8",
        border: "1px solid #C8B99A",
        cursor: "pointer",
        boxShadow: hovered
          ? "8px 8px 0px #8B7355, 12px 12px 0px rgba(139,115,85,0.3)"
          : "4px 4px 0px #C8B99A",
        transition: "box-shadow 0.3s, transform 0.3s",
        transform: hovered ? "translate(-2px, -2px)" : "none",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
        .archive-rule { height: 1px; background: #8B7355; }
        .archive-rule-double { border-top: 3px double #8B7355; }
        .archive-col-rule { border-right: 1px solid #C8B99A; }
      `}</style>

      {/* Masthead */}
      <div style={{
        padding: "10px 16px 6px",
        borderBottom: "3px double #8B7355",
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: "10px",
          letterSpacing: "4px",
          color: "#8B7355",
          textTransform: "uppercase",
        }}>{issueNumber} · The Motor Archive · {year}</div>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "11px",
          fontStyle: "italic",
          color: "#A0896C",
        }}>Est. MCMXXIV</div>
      </div>

      {/* Brand headline */}
      <div style={{ padding: "10px 16px 0", textAlign: "center" }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "11px",
          letterSpacing: "6px",
          color: "#8B7355",
          textTransform: "uppercase",
        }}>{brand} presents</div>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "52px",
          fontWeight: 900,
          color: "#1A1008",
          lineHeight: 0.95,
          letterSpacing: "-1px",
        }}>{model}</div>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "13px",
          fontStyle: "italic",
          color: "#8B7355",
        }}>{edition}</div>
      </div>

      {/* Horizontal rule */}
      <div style={{ margin: "10px 16px", borderTop: "1px solid #C8B99A" }} />

      {/* Image full bleed */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={image}
          alt={`${brand} ${model}`}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            filter: "sepia(40%) contrast(1.05) brightness(0.95)",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.6s ease",
          }}
        />
        {/* Halftone overlay simulation */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
          mixBlendMode: "multiply",
        }} />
      </div>

      {/* Two-column layout */}
      <div style={{ display: "flex", borderTop: "1px solid #C8B99A" }}>
        {/* Column 1: Description */}
        <div style={{
          flex: 1,
          padding: "12px 12px 12px 16px",
          borderRight: "1px solid #C8B99A",
        }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#8B7355",
            marginBottom: "6px",
          }}>Review</div>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "13px",
            lineHeight: 1.6,
            color: "#2A1F10",
            margin: 0,
          }}>{description}</p>
          <div style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "20px",
            fontWeight: 700,
            color: "#1A1008",
            marginTop: "12px",
          }}>{price}</div>
        </div>

        {/* Column 2: Specs */}
        <div style={{ flex: 1, padding: "12px 16px 12px 12px" }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#8B7355",
            marginBottom: "6px",
          }}>Specification</div>
          {specs.map((s, i) => (
            <div key={i} style={{ marginBottom: "6px" }}>
              <div style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "10px",
                fontStyle: "italic",
                color: "#A0896C",
                letterSpacing: "1px",
              }}>{s.label}</div>
              <div style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "12px",
                color: "#1A1008",
                fontWeight: 500,
                borderBottom: i < specs.length - 1 ? "1px dotted #C8B99A" : "none",
                paddingBottom: "4px",
              }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "3px double #8B7355",
        padding: "6px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: "10px",
          fontStyle: "italic",
          color: "#A0896C",
        }}>motor-archive.co</div>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "10px",
          letterSpacing: "2px",
          color: "#8B7355",
          textTransform: "uppercase",
        }}>Read More →</div>
      </div>
    </div>
  );
}