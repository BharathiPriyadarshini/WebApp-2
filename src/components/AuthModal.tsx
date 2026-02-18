"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuthStore();
  const [isSignup, setIsSignup] = useState(false);

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8 }}
            className="bg-neutral-900 border border-white/10 p-10 rounded-2xl w-[400px]"
          >
            <h2 className="text-2xl font-bold mb-6 text-white">
              {isSignup ? "Create Account" : "Welcome Back"}
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
              {isSignup ? "Sign Up" : "Login"}
            </button>

            <p className="mt-4 text-sm text-gray-400 text-center">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span
                onClick={() => setIsSignup(!isSignup)}
                className="ml-2 text-white cursor-pointer"
              >
                {isSignup ? "Login" : "Sign Up"}
              </span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
