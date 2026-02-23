"use client";

import { useAuthStore } from "@/store/auth.store";

export default function SignupForm() {
  const { login, closeAuthModal } = useAuthStore();

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-white">
        Create Account
      </h2>

      <input
        placeholder="Email"
        className="w-full mb-4 p-3 rounded bg-black border border-white/10"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-6 p-3 rounded bg-black border border-white/10"
      />

      <button
        onClick={() => {
          login();
          closeAuthModal();
        }}
        className="w-full py-3 rounded-lg bg-white text-black font-semibold"
      >
        Sign Up
      </button>
    </>
  );
}