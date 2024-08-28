import { useAppState } from "../../zustand/zustand";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatContainer from "../Home/components/ChatContainer";
import ContactContainer from "../Home/components/ContactContainer";
import EmptyChatContainer from "../Home/components/EmptyChatContainer";

//Chat
function Home() {
  const { userInfo } = useAppState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div className="flex h-[100vh] w-[100vw] overflow-hidden">
      <ContactContainer />
      {/* <EmptyChatContainer /> */}
      {/* <ChatContainer /> */}
    </div>
  );
}

export default Home;
