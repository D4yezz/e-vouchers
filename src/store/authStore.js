import { loginUser } from "@/services/authService";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      login: async (data) => {
        try {
          const user = await loginUser(data);
          set({ user });
          return user;
        } catch (error) {
          set({ user: null });
          throw error;
        }
      },

      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
