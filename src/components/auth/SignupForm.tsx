"use client";

import { useAuthStore } from "@/store/auth.store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";

export default function SignupForm() {
  const { login, closeAuthModal } = useAuthStore();

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-white">
        Create Account
      </h2>

      <Input
        placeholder="Email"
        className="w-full mb-4 bg-black border-white/10"
      />
      <Input
        type="password"
        placeholder="Password"
        className="w-full mb-6 bg-black border-white/10"
      />

      <Button
        onClick={() => {
          login();
          closeAuthModal();
        }}
        className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90"
      >
        Sign Up
      </Button>
    </>
  );
}