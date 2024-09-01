import { RiCloseFill } from "react-icons/ri";
import { useAppState } from "../../../zustand/zustand";
import { HiUserGroup } from "react-icons/hi";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppState();
  return (
    <div className="h-[10vh] w-full border-b-2 border-cyan-500 shadow-lg rounded-b-lg flex items-center justify-center px-20">
      {selectedChatType === "contact" ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-8">
            <>
              <img
                src={selectedChatData.profilePic}
                alt="default-avatar"
                className="rounded-full w-10 h-10 m-1"
              />
              <div className="flex flex-col text-white">
                <div className="text-lg moderustic-thin">
                  {selectedChatData.displayName}
                </div>
                <div className="text-sm moderustic-thin">
                  {selectedChatData.email}
                </div>
              </div>
            </>
          </div>
          <RiCloseFill
            className="flex text-3xl text-cyan-500"
            onClick={closeChat}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <HiUserGroup className="h-10 w-10 bg-blue-950 rounded-full text-white" />
              <div className="text-lg text-white">{selectedChatData.name}</div>
            </div>
          </div>
          <RiCloseFill
            className="flex text-3xl text-cyan-500"
            onClick={closeChat}
          />
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
