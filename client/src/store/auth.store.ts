import { create } from "zustand";
import { ApiClient } from "../lib/apiClient";
import {
  loginSchemaType,
  signupSchemaType,
  updateSchemaType,
} from "../schema/auth.schema";
import toast from "react-hot-toast";

interface AuthState {
  authUser: IUser | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isUpdatingProfile: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  checkAuth: () => void;
  signup: (data: signupSchemaType) => void;
  login: (data: loginSchemaType) => void;
  logout: () => void;
  updateProfile: (data: updateSchemaType) => void;
  connectSocket: () => void;
  onlineUsers: string[];
}

export const useAuthStore = create<AuthState>(
  (set) => ({
    authUser: null,
    isCheckingAuth: false,
    isSigningUp: false,
    isUpdatingProfile: false,
    isLoggingOut: false,
    isLoggingIn: false,
    onlineUsers: ["1"],
    checkAuth: async () => {
      set({ isCheckingAuth: true });
      try {
        const res = await ApiClient.get("/auth/check");
        set({
          authUser: res.data.data,
        });
      } catch (error) {
        set({
          authUser: null,
        });
      } finally {
        set({ isCheckingAuth: false });
      }
    },
    signup: async (formData) => {
      set({ isSigningUp: true });
      try {
        const res = await ApiClient("/auth/signup", {
          method: "POST",
          data: formData,
        });
        set({
          authUser: res.data.data,
        });
        toast.success(res.data.message);
      } catch (error) {
        set({
          authUser: null,
        });
        console.log(error);
      } finally {
        set({ isSigningUp: false });
      }
    },
    login: async (formData) => {
      set({ isLoggingIn: true });
      try {
        const res = await ApiClient("/auth/login", {
          method: "POST",
          data: formData,
        });
        set({
          authUser: res.data.data,
        });
        toast.success(res.data.message);
      } catch (error) {
        set({
          authUser: null,
        });
        console.log(error);
        toast.error("Login failed");
      } finally {
        set({ isLoggingIn: false });
      }
    },
    logout: async () => {
      set({ isLoggingOut: true });
      try {
        const res = await ApiClient.get("/auth/logout");
        set({
          authUser: null,
        });
        toast.success(res.data.message);
      } catch (error) {
        console.log(error);
      } finally {
        set({ isLoggingOut: false });
      }
    },
    updateProfile: async (formData) => {
      set({ isUpdatingProfile: true });

      try {
        const res = await ApiClient("/user/update-profile", {
          method: "POST",
          data: formData,
        });

        set((prev) => ({
          authUser: prev.authUser
            ? { ...prev.authUser, profilePic: res.data.data.profilePic }
            : null,
        }));
        toast.success(res.data.message);
      } catch (error) {
        console.log(error);
      } finally {
        set({
          isUpdatingProfile: false,
        });
      }
    },
    connectSocket: async () => {},
  })
);
