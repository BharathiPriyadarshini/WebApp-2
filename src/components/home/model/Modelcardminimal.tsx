"use client";

import React, { useState } from "react";

interface ModelCardMinimalProps {
  brand: string;
  model: string;
  year: number;
  price: string;
  image: string;
  specs?: { icon: string; label: string; value: string }[];
}

export default function ModelCardMinimal({
  brand = "Porsche",
  model = "Cayenne",
  year = 2024,
  price = "$84,900",
  image = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
  specs = [
    { icon: "⚡", label: "Power", value: "335 hp" },
    { icon: "⏱", label: "0–60", value: "5.9s" },
    { icon: "🛣", label: "Range", value: "450 mi" },
  ],
}: ModelCardMinimalProps) {
  const [active, setActive] = useState(false);

  return (
    <div
      style={{
        fontFamily: "'Outfit', sans-serif",
        width: "300px",
        background: "#fff",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid #F0F0F0",
        boxShadow: active ? "0 24px 64px rgba(0,0,0,0.12)" : "0 2px 16px rgba(0,0,0,0.06)",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: active ? "translateY(-8px)" : "translateY(0)",
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {/* Image block */}
      <div
        style={{
          height: "190px",
          background: "#F6F6F4",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt={model}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: active ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        {/* Brand pill */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(8px)",
            borderRadius: "100px",
            padding: "4px 12px",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "1px",
            color: "#111",
          }}
        >
          {brand}
        </div>
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(8px)",
            borderRadius: "100px",
            padding: "4px 12px",
            fontSize: "11px",
            fontWeight: 600,
            color: "#666",
          }}
        >
          {year}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 22px 22px" }}>
        <h2
          style={{
            fontSize: "26px",
            fontWeight: 700,
            color: "#111",
            margin: "0 0 14px",
            letterSpacing: "-0.5px",
          }}
        >
          {model}
        </h2>

        {/* Specs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
            marginBottom: "18px",
          }}
        >
          {specs.map((s) => (
            <div
              key={s.label}
              style={{
                background: "#F8F8F8",
                borderRadius: "12px",
                padding: "10px 8px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "16px", marginBottom: "4px" }}>{s.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#111" }}>{s.value}</div>
              <div style={{ fontSize: "10px", color: "#999", letterSpacing: "0.5px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #F0F0F0",
            paddingTop: "16px",
          }}
        >
          <div>
            <div style={{ fontSize: "10px", color: "#aaa", letterSpacing: "1px", textTransform: "uppercase" }}>Starting at</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#111" }}>{price}</div>
          </div>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "#111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "18px",
              transform: active ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            ↗
          </div>
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');`}</style>
    </div>
  );
}