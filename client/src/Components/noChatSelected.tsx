import { MessageSquare } from "lucide-react";

const NoChatSelected: React.FC = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 bg-primary/10 flex items-center justify-center animate-bounce rounded-full">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold">Welcome to Chatty!</h1>
        <p className="text-base-content/60">Select a conversation from the sidebar to start chatting.</p>
      </div>
    </div>
  );
};
export default NoChatSelected;
