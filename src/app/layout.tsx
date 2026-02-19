"use client"
import localFont from "next/font/local";
import "./globals.css";
import type { Metadata } from "next";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import AuthModal from "@/components/AuthModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()


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

// export const metadata: Metadata = {
//   title: "Rimello",
//   description: "Luxury Automotive Platform",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} font-sans bg-black text-white antialiased`}>
        <QueryClientProvider client={queryClient}>
          <>
        <NavbarWrapper />
        <AuthModal />

        <main className="pt-32 min-h-screen">
          {children}
        </main>
          </>
        </QueryClientProvider>
      </body>
    </html>
  );
}
