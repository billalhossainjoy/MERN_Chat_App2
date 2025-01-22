import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/auth.store";
import { useChatStore } from "../store/chat.store";
import ChatHeader from "./chatHeader";
import MessageInput from "./messageInput";
import { parseTime } from "../lib/utils";

const ChatContainer: React.FC = () => {
  const { messages, getMassages, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  // const messageEndRef = useRef<any>(null);

  useEffect(() => {
    if (selectedUser?._id) getMassages(selectedUser._id);
  }, [selectedUser, getMassages]);


  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser?._id ? "chat-end" : "chat-start"
            } `}
            // ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full">
                {message.senderId === authUser?._id ? (
                  <img
                    src={
                      authUser?.profilePic
                        ? authUser.profilePic
                        : "/images/avatar.png"
                    }
                    alt=""
                  />
                ) : (
                  <img
                    src={
                      selectedUser?.profilePic
                        ? selectedUser.profilePic
                        : "/images/avatar.png"
                    }
                    alt=""
                  />
                )}
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50">
                {parseTime(message.createdAt)}
              </time>
            </div>
            <div className="flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};
export default ChatContainer;
