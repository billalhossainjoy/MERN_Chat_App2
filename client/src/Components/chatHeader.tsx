import { X } from "lucide-react";
import { useChatStore } from "../store/chat.store";
import { useAuthStore } from "../store/auth.store";

const ChatHeader: React.FC = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
	const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={"./images/avatar.png"} alt="" className="" />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{selectedUser?.fullName}</h3>
            <p className="text-sm text-base-content/70">online</p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)} className="p-2">
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
