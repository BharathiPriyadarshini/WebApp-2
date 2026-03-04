"use client";

import { useState } from "react";

interface TrimCardVaultProps {
  brand?: string;
  model?: string;
  trimName?: string;
  price?: string;
  monthlyEstimate?: string;
  image?: string;
  specs?: { label: string; value: string; icon: string }[];
  includes?: string[];
  accentColor?: string;
  exclusiveLabel?: string;
}

export default function TrimCardVault({
  brand = "Lamborghini",
  model = "Urus",
  trimName = "Performante",
  price = "$258,000",
  monthlyEstimate = "est. $4,200/mo",
  image = "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  specs = [
    { icon: "⚡", label: "Power", value: "657 hp" },
    { icon: "⏱", label: "0–60", value: "3.3s" },
    { icon: "🏎", label: "Top Speed", value: "193 mph" },
    { icon: "⚙️", label: "Gearbox", value: "8-Speed" },
  ],
  includes = [
    "Carbon Fiber Exterior Pack",
    "Alcantara Sport Interior",
    "Advanced Driver Assist",
    "Akrapovič Exhaust",
    "Sensonum Audio System",
  ],
  accentColor = "#FFB800",
  exclusiveLabel = "HALO TRIM",
}: TrimCardVaultProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ width: "340px", perspective: "1000px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes vaultGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,184,0,0.1); }
          50% { box-shadow: 0 0 40px rgba(255,184,0,0.25); }
        }
        @keyframes slideReveal {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .vault-spec-reveal {
          animation: slideReveal 0.4s ease forwards;
        }
      `}</style>

      {/* Vault container */}
      <div style={{
        background: "#080808",
        border: `1px solid ${open ? accentColor + "40" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: open ? `0 0 60px ${accentColor}20, 0 20px 80px rgba(0,0,0,0.8)` : "0 10px 40px rgba(0,0,0,0.6)",
        transition: "all 0.5s ease",
      }}>

        {/* Top section: always visible */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          {/* Background image */}
          <div style={{ position: "relative", height: "200px" }}>
            <img src={image} alt={`${brand} ${model}`} style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: open ? "brightness(0.4) saturate(1.2)" : "brightness(0.55)",
              transform: open ? "scale(1.08)" : "scale(1)",
              transition: "all 0.7s ease",
            }} />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, #080808 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
            }} />

            {/* Exclusive label top */}
            <div style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: accentColor,
              background: `${accentColor}15`,
              border: `1px solid ${accentColor}40`,
              padding: "4px 12px",
            }}>{exclusiveLabel}</div>

            {/* Vault lock icon */}
            <div
              onClick={() => setOpen(!open)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: open ? accentColor : "rgba(255,255,255,0.08)",
                border: `1px solid ${open ? accentColor : "rgba(255,255,255,0.15)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "14px",
                transition: "all 0.4s",
                boxShadow: open ? `0 0 20px ${accentColor}60` : "none",
              }}
            >{open ? "🔓" : "🔒"}</div>
          </div>

          {/* Car name over image bottom */}
          <div style={{ padding: "0 20px 20px" }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 300,
              letterSpacing: "4px",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
            }}>{brand}</div>
            <div style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "38px",
              color: "#fff",
              lineHeight: 1,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}>{model}</div>
            <div style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "14px",
              color: accentColor,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}>{trimName}</div>
          </div>
        </div>

        {/* Vault "door" — the sliding reveal panel */}
        <div style={{
          maxHeight: open ? "600px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
          {/* Specs grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "rgba(255,255,255,0.04)",
            borderTop: `1px solid ${accentColor}30`,
          }}>
            {specs.map((s, i) => (
              <div
                key={i}
                className="vault-spec-reveal"
                style={{
                  padding: "16px 18px",
                  background: "#0A0A0A",
                  animationDelay: `${i * 80 + 200}ms`,
                  opacity: 0,
                }}
              >
                <div style={{ fontSize: "18px", marginBottom: "4px" }}>{s.icon}</div>
                <div style={{ fontFamily: "'Anton', sans-serif", fontSize: "20px", color: "#fff", letterSpacing: "0.5px", textTransform: "uppercase" }}>{s.value}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "2px", textTransform: "uppercase", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Includes */}
          <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              color: accentColor,
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}>What's Included</div>
            {includes.map((item, i) => (
              <div
                key={i}
                className="vault-spec-reveal"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                  animationDelay: `${i * 60 + 400}ms`,
                  opacity: 0,
                }}
              >
                <div style={{
                  width: "6px",
                  height: "6px",
                  background: accentColor,
                  borderRadius: "1px",
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.7)",
                }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer — always visible */}
        <div style={{
          padding: "16px 20px",
          borderTop: `1px solid ${open ? accentColor + "20" : "rgba(255,255,255,0.04)"}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "border-color 0.4s",
        }}>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "2px" }}>STARTING FROM</div>
            <div style={{ fontFamily: "'Anton', sans-serif", fontSize: "26px", color: "#fff", letterSpacing: "0.5px", lineHeight: 1.1 }}>{price}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>{monthlyEstimate}</div>
          </div>
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: open ? accentColor : "transparent",
              border: `1px solid ${accentColor}`,
              color: open ? "#000" : accentColor,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "2px",
              padding: "12px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "all 0.3s",
            }}
          >{open ? "Reserve Now" : "Unlock Details"}</button>
        </div>
      </div>
    </div>
  );
}