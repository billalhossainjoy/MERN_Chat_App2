import { create } from "zustand";
import { ApiClient } from "../lib/apiClient";
import { loginSchemaType, signupSchemaType } from "../schema/auth.schema";
import toast from "react-hot-toast";

interface AuthState {
  authUser: IUser | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isUpdatingProfile: boolean;
  isLogIng: boolean;
  checkAuth: () => void;
  signup: (data: signupSchemaType) => void;
  login: (data: loginSchemaType) => void;
  logout: () => void;
  updateProfile: () => void;
  connectSocket: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  isLogIng: false,
  checkAuth: async () => {
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
        authUser: res.data,
      });
      toast.success(res.data.data.message);
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
    set({ isLogIng: true });
    try {
      const res = await ApiClient("/auth/login", {
        method: "POST",
        data: formData,
      });
      set({
        authUser: res.data.data,
      });
      toast.success(res.data.data.message);
    } catch (error) {
      set({
        authUser: null,
      });
      console.log(error);
      toast.error("Login failed");
    } finally {
      set({ isLogIng: false });
    }
  },
  logout: async () => {},
  updateProfile: async () => {},
  connectSocket: async () => {},
}));
