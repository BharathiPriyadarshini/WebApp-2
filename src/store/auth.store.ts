import { create } from "zustand";

interface AuthState {
  user: boolean;
  isAuthModalOpen: boolean;
  login: () => void;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: false,
  isAuthModalOpen: false,
  login: () => set({ user: true }),
  logout: () => set({ user: false }),
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
}));
