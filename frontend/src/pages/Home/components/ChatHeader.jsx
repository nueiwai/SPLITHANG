import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  return (
    <div className="h-[10vh] border-b-2 border-cyan-500 shadow-lg rounded-b-lg flex items-center justify-between px-20">
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center justify-center">
          {/* Content for this div */}
        </div>
        <div className="flex items-center justify-center gap-5">
          {/* Content for this div */}
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
            <RiCloseFill className="text-3xl text-cyan-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
