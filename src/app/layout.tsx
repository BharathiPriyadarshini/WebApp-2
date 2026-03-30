import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RootProviders from "./root-providers";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://rimello.ai";

const urbanist = localFont({
  src: [
    {
      path: "../../public/fonts/Urbanist-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Urbanist-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/Urbanist-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Urbanist-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/Urbanist-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Urbanist-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/Urbanist-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Urbanist-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Urbanist-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Urbanist-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/Urbanist-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Urbanist-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/Urbanist-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Urbanist-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Urbanist-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Urbanist-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../public/fonts/Urbanist-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Urbanist-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rimello — AI-powered car suggestions",
    template: "%s | Rimello",
  },
  description:
    "Discover cars with AI-powered suggestions, compare trims, explore brands, and get clear specs and pricing in one place.",
  openGraph: {
    title: "Rimello — AI-powered car suggestions",
    description:
      "Discover cars with AI-powered suggestions, compare trims, explore brands, and get clear specs and pricing in one place.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${urbanist.variable} font-sans bg-background text-foreground antialiased transition-colors duration-300`}
      >
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
