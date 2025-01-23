import { create } from "zustand";
import { ApiClient } from "../lib/apiClient";
import {
  loginSchemaType,
  signupSchemaType,
  updateSchemaType,
} from "../schema/auth.schema";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

interface AuthState {
  authUser: IUser | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isUpdatingProfile: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  socket: Socket | null;
  checkAuth: () => void;
  signup: (data: signupSchemaType) => void;
  login: (data: loginSchemaType) => void;
  logout: () => void;
  updateProfile: (data: updateSchemaType) => void;
  onlineUsers: string[];
  connectSocket: () => void;
  disConnectSocket: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  isLoggingOut: false,
  isLoggingIn: false,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await ApiClient.get("/auth/check");
      set({
        authUser: res.data.data,
      });
      get().connectSocket();
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
      get().connectSocket();
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
      get().connectSocket();
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
      get().disConnectSocket();
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
  connectSocket: async () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(import.env.VITE_REST_API, {
      query: {
        userId: authUser._id,
      },
    });

    socket.connect();
    set({ socket });
  },
  
  disConnectSocket: async () => {
    console.log("call disconnect")
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));
