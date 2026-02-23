"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthModal() {
  const { isAuthModalOpen } = useAuthStore();
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
            {isSignup ? <SignupForm /> : <LoginForm />}

            <p className="mt-4 text-sm text-gray-400 text-center">
              {isSignup
                ? "Already have an account?"
                : "Don't have an account?"}
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