import ChatHeader from "./ChatHeader";
import MessageBar from "./MessageBar";
import MessageContainer from "./MessageContainer";

function ChatContainer() {
  return (
    <div className="fixed top-0 h-[100vh] w-[100vw] bg-blue-800 flex flex-col md:static md:flex-1">
      <ChatHeader />
      <MessageContainer />
      <MessageBar />
    </div>
  );
}

export default ChatContainer;
