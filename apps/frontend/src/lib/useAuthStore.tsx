import { create } from "zustand";
import { persist } from "zustand/middleware";

interface userData {
  _id: string;
  name: string;
  email: string;
}

const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // Stores user data (e.g., id, email, name)
      accessToken: null, // Stores the access token (JWT)
      isLoggedIn: false, // Boolean to track login status
      login: (userData: userData, token: string) =>
        set({
          user: userData,
          accessToken: token,
          isLoggedIn: true,
        }),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: "user-session", // Name for the key in local storage/session storage
      //   getStorage: () => localStorage, // Use localStorage (default) or sessionStorage
    },
  ),
);

export default useAuthStore;
