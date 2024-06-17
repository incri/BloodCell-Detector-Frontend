import { create } from "zustand";

interface EmailStoreState {
  userEmail: string;
  setUserEmail: (email: string) => void;
}

export const useEmailStore = create<EmailStoreState>((set) => ({
  userEmail: localStorage.getItem("userEmail") || "", // Load from storage
  setUserEmail: (email) => {
    localStorage.setItem("userEmail", email); // Save to storage
    set({ userEmail: email });
  },
}));
