
"use client";

import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function FooterPage() {
  return (
    <div className="w-full flex items-center justify-center bg-background dark:bg-black transition-colors duration-300">
      <TextHoverEffect
        text="Rimello"

        duration={0}
      />
    </div>
  );
}
