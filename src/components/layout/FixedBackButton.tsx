"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FixedBackButton({
  fallbackHref = "/",
  className = "",
  label = "Back",
}: {
  fallbackHref?: string;
  className?: string;
  label?: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        try {
          router.back();
        } catch {
          router.push(fallbackHref);
        }
      }}
      className={[
        // Match `src/app/trims/page.tsx` back button placement/style
        "flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition",
        className,
      ].join(" ")}
      aria-label="Go back"
    >
      <ChevronLeft className="w-5 h-5" />
      {label}
    </button>
  );
}

