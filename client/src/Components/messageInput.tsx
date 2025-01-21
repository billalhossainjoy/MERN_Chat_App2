import { useRef, useState } from "react";
import { useChatStore } from "../store/chat.store";
import { Image, Send, X } from "lucide-react";

const MessageInput: React.FC = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files.length > 0 && files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(reader.result as string | null);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
    } catch (error) {
      console.error("failed to send message", error);
    }
  };
  return (
    <div className="p-4 w-full border-t border-base-300">
      {imagePreview && (
        <div>
          <div>
            <img src="" alt="" />
            <button>
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
          />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-md text-base-content btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
