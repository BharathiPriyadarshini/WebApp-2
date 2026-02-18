"use client";

import PageWrapper from "@/components/layout/PageWrapper";
import { useAuthStore } from "@/store/auth.store";

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <PageWrapper>
        <div className="min-h-[60vh] flex items-center justify-center">
          <h2 className="text-2xl font-bold">
            Please sign in to view profile
          </h2>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto py-16">
        <h1 className="text-4xl font-bold mb-6">
          My Profile
        </h1>

        <div className="bg-white/5 border border-white/10 p-8 rounded-xl">
          <p>User: {user}</p>
        </div>
      </div>
    </PageWrapper>
  );
}
