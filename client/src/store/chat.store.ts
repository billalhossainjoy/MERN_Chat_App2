import { create } from "zustand";
import { ApiClient } from "../lib/apiClient";
import toast from "react-hot-toast";

const date = new Date(); // TODO: its for demo remove this

interface ISendMessage {
  text?: string;
  image?: string | null;
}

interface IChatStore {
  messages: IMessage[];
  users: IUser[];
  selectedUser: IUser | null;
  isUserLoading: boolean;
  isMessagesLoading: boolean;

  setSelectedUser: (user: IUser | null) => void;

  getUsers: () => void;
  getMassages: (userId: string) => void;

  sendMessage: (data: ISendMessage) => void;
}

export const useChatStore = create<IChatStore>((set, get) => ({
  messages: [
    {
      _id: "1",
      senderId: "3",
      reciverId: "2",
      text: "name",
    },
  ],
  users: [
    {
      _id: "1",
      fullName: "Billal",
      email: "mail",
      createdAt: date,
    },
  ],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await ApiClient.get("/messages/users");
      set({ users: res.data.data });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMassages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await ApiClient.get(`/messages/${userId}`);
      set({ messages: res.data.data });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: (data) => {
    const { selectedUser } = get();
  },
}));
