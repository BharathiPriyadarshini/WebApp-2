"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "@/components/ThemeProvider";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import AuthModal from "@/components/auth/AuthModal";

export default function RootProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <NavbarWrapper />
        <AuthModal />
        <main className="pt-32 min-h-screen">{children}</main>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
