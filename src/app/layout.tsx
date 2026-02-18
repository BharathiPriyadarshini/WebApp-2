import "./globals.css";
import type { Metadata } from "next";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import AuthModal from "@/components/AuthModal";

export const metadata: Metadata = {
  title: "Rimello",
  description: "Luxury Automotive Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <NavbarWrapper />
        <AuthModal />

        <main className="pt-32 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
