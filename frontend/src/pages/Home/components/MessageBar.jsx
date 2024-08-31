import { useState, useEffect, useRef } from "react";
import { RiEmojiStickerLine, RiAttachment2 } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import { useAppState } from "../../../zustand/zustand";
import { useSocket } from "../../../context/SocketContext";

const MessageBar = () => {
  const { selectedChatType, selectedChatData, userInfo } = useAppState();
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const emojiRef = useRef(null);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    if (selectedChatType === "contact" && socket) {
      console.log(`Sending message to ${selectedChatData.displayName}`);
      socket.emit("sendMessage", {
        sender: userInfo._id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  return (
    <div className="h-[10vh] flex justify-center items-center px-8 mb-2">
      <div className="flex-1 flex rounded-md items-center gap-3">
        <input
          type="text"
          className="flex-1 px-4 py-2 bg-white rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
          <RiAttachment2 className="text-2xl text-cyan-500" />
        </button>

        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => setEmojiPickerOpen(true)}
          >
            <RiEmojiStickerLine className="text-2xl text-cyan-500" />
          </button>
          {emojiPickerOpen && (
            <div className="absolute bottom-16 right-0" ref={emojiRef}>
              <EmojiPicker
                theme="dark"
                emojiStyle="native"
                onEmojiClick={handleAddEmoji}
                autoFocusSearch={false}
              />
            </div>
          )}
        </div>

        <button
          className="bg-cyan-500 rounded-md flex items-center justify-center focus:border-none hover:bg-cyan-400 p-4"
          onClick={sendMessage}
        >
          <IoIosSend className="text-2xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default MessageBar;
