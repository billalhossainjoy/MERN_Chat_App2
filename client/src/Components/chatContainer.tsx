import { useChatStore } from "../store/chat.store";
import ChatHeader from "./chatHeader";
import MessageInput from "./messageInput";

const ChatContainer: React.FC = () => {
  const { messages } = useChatStore();
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message._id}>
            <div>
              <div>
                <img src="" alt="" />
              </div>
            </div>
            <div>
              <time className=""></time>
            </div>
            <div>
              {message.image && <img />}
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
