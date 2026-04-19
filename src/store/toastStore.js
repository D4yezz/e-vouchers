import { create } from "zustand";

export const useToastStore = create((set) => ({
  open: false,
  message: "",
  type: "success",
  showToast: (message, type = "success") => set({ open: true, message, type }),
  closeToast: () => set({ open: false }),
}));
