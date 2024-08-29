import { RiCloseFill } from "react-icons/ri";
import { useAppState } from "../../../zustand/zustand";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppState();
  return (
    <div className="h-[10vh] w-full border-b-2 border-cyan-500 shadow-lg rounded-b-lg flex items-center justify-center px-20">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-8">
          <img
            src={selectedChatData.profilePic}
            alt="default-avatar"
            className="rounded-full w-10 h-10 m-1"
          />
          {selectedChatType === "contact" && (
            <div className="flex flex-col text-white">
              <div className="text-lg moderustic-thin">
                {selectedChatData.displayName}
              </div>
              <div className="text-sm moderustic-thin">
                {selectedChatData.email}
              </div>
            </div>
          )}
        </div>

        <RiCloseFill
          className="flex text-3xl text-cyan-500"
          onClick={closeChat}
        />
      </div>
    </div>
  );
};

export default ChatHeader;
