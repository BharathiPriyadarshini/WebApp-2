"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Navbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import ThemeToggle from "@/components/ThemeToggle";

import { useAuthStore } from "@/store/auth.store";

const navItems = [
  { name: "Explore", link: "/" },
  { name: "Suggestions", link: "/suggestions", protected: true },
  { name: "About", link: "/about" },
  { name: "Profile", link: "/profile", protected: true },
];

export default function NavbarWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, login, logout, openAuthModal } = useAuthStore();

  const handleProtectedClick = (
    e: React.MouseEvent,
    isProtected?: boolean,
  ) => {
    if (!user && isProtected) {
      e.preventDefault();
      openAuthModal();
    }
  };

  return (
    <Navbar className="fixed top-0 inset-x-0 z-50">

      {/* Desktop */}
      <NavBody>
        <Link href="/" className="font-bold text-foreground dark:text-white text-lg">
          Rimello
        </Link>

        <div className="flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              onClick={(e) =>
                handleProtectedClick(e, item.protected)
              }
              className="text-sm text-foreground/90 hover:text-foreground transition dark:text-white/90 dark:hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <NavbarButton as="button" onClick={logout} variant="dark">
              Logout
            </NavbarButton>
          ) : (
            <NavbarButton as="button" onClick={login} variant="dark">
              Login
            </NavbarButton>
          )}
        </div>
      </NavBody>

      {/* Mobile */}
      <MobileNav>
        <MobileNavHeader>
          <Link href="/" className="font-bold text-foreground dark:text-white">
            Rimello
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <MobileNavToggle
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              onClick={(e) => {
                handleProtectedClick(e, item.protected, item.link);
                setIsOpen(false);
              }}
              className="block py-2"
            >
              {item.name}
            </Link>
          ))}

          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <button onClick={login}>Login</button>
          )}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
