import { create } from "zustand";
import { ApiClient } from "../lib/apiClient";

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

export const useChatStore = create<IChatStore>(
  (set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    getUsers: async () => {
      set({ isUserLoading: true });
      try {
        const res = await ApiClient.get("/message/get-user-slidebar");
        set({ users: res.data.data });
      } catch (error) {
        console.log(error);
      } finally {
        set({ isUserLoading: false });
      }
    },

    getMassages: async (userId) => {
      set({ isMessagesLoading: true });
      try {
        const res = await ApiClient.get(`/message/${userId}`);
        set({ messages: res.data.data });
      } catch (error) {
        console.log(error);
      } finally {
        set({ isMessagesLoading: false });
      }
    },

    sendMessage: async (data) => {
      const { selectedUser } = get();
      try {
        const res = await ApiClient(`/message/send/${selectedUser?._id}`, {
          method: "POST",
          data,
        });
        set((state) => ({
          messages: [...state.messages, res.data.data],
        }));
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  })
);
