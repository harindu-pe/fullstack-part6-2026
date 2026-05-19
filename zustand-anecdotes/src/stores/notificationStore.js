import { create } from "zustand";

let timeoutId; // track the timer outside the store

const useNotificationStore = create((set) => ({
  message: null,
  setNotification: (message, seconds) => {
    clearTimeout(timeoutId); // cancel any existing timer first
    set({ message });
    timeoutId = setTimeout(() => {
      set({ message: null });
    }, seconds * 1000);
  },
}));

export default useNotificationStore;
