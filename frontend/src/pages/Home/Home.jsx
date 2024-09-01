import { useAppState } from "../../zustand/zustand";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatContainer from "../Home/components/ChatContainer";
import ContactContainer from "../Home/components/ContactContainer";
import EmptyChatContainer from "../Home/components/EmptyChatContainer";

//Chat
function Home() {
  const {
    userInfo,
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,
  } = useAppState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div className="flex h-[100vh] w-[100vw] overflow-hidden">
      {isUploading && (
        <div className="fixed z-10 h-[100vh] w-[100vh] max-w-full max-h-full p-8 flex items-center justify-center bg-blue-950 flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-5xl">Uploading File {fileUploadProgress}%</div>
        </div>
      )}

      {isDownloading && (
        <div className="fixed z-10 h-[100vh] w-[100vh] max-w-full max-h-full p-8 flex items-center justify-center bg-blue-950 flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-5xl">
            Downloading File {fileDownloadProgress}%
          </div>
        </div>
      )}
      <ContactContainer />
      {selectedChatType ? <ChatContainer /> : <EmptyChatContainer />}
    </div>
  );
}

export default Home;
