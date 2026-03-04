"use client";

import React, { useState } from "react";

interface Trim {
  name: string;
  price: string;
  additionalFeatures: string[];
}

interface TrimCardTimelineProps {
  model: string;
  brand: string;
  baseFeatures?: string[];
  trims?: Trim[];
}

export default function TrimCardTimeline({
  model = "CR-V",
  brand = "Honda",
  baseFeatures = ["1.5L Turbo Engine", "CVT Transmission", "Honda Sensing Suite", "Apple CarPlay"],
  trims = [
    {
      name: "LX",
      price: "$31,895",
      additionalFeatures: ["17-in Alloy Wheels", "Backup Camera"],
    },
    {
      name: "EX",
      price: "$34,595",
      additionalFeatures: ["Sunroof", "Wireless CarPlay", "Adaptive Cruise"],
    },
    {
      name: "EX-L",
      price: "$37,095",
      additionalFeatures: ["Leather Seats", "Heated Front Seats", "Power Tailgate"],
    },
    {
      name: "Sport Touring",
      price: "$41,595",
      additionalFeatures: ["Bose Audio", "20-in Wheels", "Head-Up Display"],
    },
  ],
}: TrimCardTimelineProps) {
  const [selectedTrim, setSelectedTrim] = useState(1);

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        width: "300px",
        background: "#F8F9FE",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #2563EB 100%)",
          padding: "20px 22px",
          color: "#fff",
        }}
      >
        <p style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 4px", opacity: 0.7 }}>
          {brand}
        </p>
        <h2 style={{ fontSize: "26px", fontWeight: 700, margin: "0 0 4px" }}>{model}</h2>
        <p style={{ fontSize: "12px", opacity: 0.7, margin: 0 }}>Select a trim to compare</p>
      </div>

      {/* Timeline */}
      <div style={{ padding: "18px 20px" }}>
        {/* Base features */}
        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "9px", color: "#9CA3AF", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 8px" }}>
            ALL TRIMS INCLUDE
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {baseFeatures.map((f) => (
              <span key={f} style={{ background: "#E8EDFF", color: "#2563EB", fontSize: "10px", fontWeight: 600, padding: "3px 8px", borderRadius: "6px" }}>
                {f}
              </span>
            ))}
          </div>
        </div>

        <div style={{ height: "1px", background: "#E5E7EB", marginBottom: "16px" }} />

        {/* Trim timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "12px",
              top: "16px",
              bottom: "16px",
              width: "2px",
              background: "#E5E7EB",
            }}
          />
          {/* Active fill */}
          <div
            style={{
              position: "absolute",
              left: "12px",
              top: "16px",
              width: "2px",
              height: `${(selectedTrim / (trims.length - 1)) * 100}%`,
              background: "#2563EB",
              transition: "height 0.4s ease",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {trims.map((trim, i) => {
              const isSelected = i === selectedTrim;
              const isPast = i < selectedTrim;

              return (
                <div
                  key={trim.name}
                  style={{ display: "flex", gap: "16px", cursor: "pointer" }}
                  onClick={() => setSelectedTrim(i)}
                >
                  {/* Node */}
                  <div style={{ position: "relative", zIndex: 1, flexShrink: 0, marginTop: "10px" }}>
                    <div
                      style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "50%",
                        background: isSelected ? "#2563EB" : isPast ? "#93C5FD" : "#E5E7EB",
                        border: isSelected ? "3px solid #DBEAFE" : "2px solid transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                        boxShadow: isSelected ? "0 0 0 3px rgba(37,99,235,0.2)" : "none",
                      }}
                    >
                      {isPast && !isSelected && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4.5 7.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      flex: 1,
                      background: isSelected ? "#fff" : "transparent",
                      borderRadius: "10px",
                      padding: isSelected ? "10px 12px" : "6px 0",
                      border: isSelected ? "1px solid #DBEAFE" : "1px solid transparent",
                      boxShadow: isSelected ? "0 4px 12px rgba(37,99,235,0.1)" : "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isSelected ? "8px" : 0 }}>
                      <span style={{ fontWeight: 700, fontSize: isSelected ? "15px" : "14px", color: isSelected ? "#1e3a5f" : "#6B7280" }}>
                        {trim.name}
                      </span>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: isSelected ? "#2563EB" : "#9CA3AF" }}>
                        {trim.price}
                      </span>
                    </div>
                    {isSelected && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {trim.additionalFeatures.map((f) => (
                          <div key={f} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ color: "#2563EB", fontSize: "12px" }}>+</span>
                            <span style={{ color: "#374151", fontSize: "11px" }}>{f}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          style={{
            marginTop: "16px",
            width: "100%",
            padding: "12px",
            background: "#1e3a5f",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Select {trims[selectedTrim]?.name}
        </button>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');`}</style>
    </div>
  );
}