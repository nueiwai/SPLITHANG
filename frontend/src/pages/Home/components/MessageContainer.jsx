import { useEffect, useRef, useState } from "react";
import { useAppState } from "../../../zustand/zustand";
import moment from "moment";
import { apiClient } from "../../../lib/api-client";
import { GET_ALL_MESSAGES_ROUTE, HOST } from "../../../utils/constants";
import { FaFile } from "react-icons/fa";
import { MdDownload, MdClose } from "react-icons/md";

const MessageContainer = () => {
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    selectedChatMessages,
    setSelectedChatMessages,
    setIsDownloading,
    setFileDownloadProgress,
  } = useAppState();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_ALL_MESSAGES_ROUTE,
          { id: selectedChatData._id },
          { withCredentials: true }
        );

        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedChatData._id) {
      if (selectedChatType === "contact") getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const downloadFile = (fileUrl) => async () => {
    try {
      setIsDownloading(true);
      setFileDownloadProgress(0);
      const res = await apiClient.get(`${HOST}/${fileUrl}`, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);
          setFileDownloadProgress(percentCompleted);
        },
      });

      const urlBlob = window.URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", fileUrl.split("/").pop());
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlBlob);
      setIsDownloading(false);
      setFileDownloadProgress(0);
    } catch (error) {
      console.log(error);
    }
  };

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-white my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };

  const renderDMMessages = (message) => (
    <div
      className={`${
        message.sender === selectedChatData._id ? "text-left" : "text-right"
      }`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-blue-700 text-white"
              : "bg-blue-400 text-white"
          } border inline-block p-4 rounded-md my-1 max-w-[50%] break-words`}
        >
          {message.content}
        </div>
      )}

      {message.messageType === "file" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-blue-700 text-white"
              : "bg-blue-400 text-white"
          } border inline-block p-4 rounded-md my-1 max-w-[50%] break-words`}
        >
          {checkIfImage(message.fileUrl) ? (
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowImage(true);
                setImageUrl(message.fileUrl);
              }}
            >
              <img
                src={`${HOST}/${message.fileUrl}`}
                height={300}
                width={300}
              />
              <div className="flex justify-end mt-2 cursor-pointer">
                <MdDownload
                  className="text-white h-6 w-6"
                  onClick={downloadFile(message.fileUrl)}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-5">
              <span className="bg-blend-darken rounded-xl p-4 text-white">
                <FaFile className="text-white h-12 w-12" />
              </span>
              <span>{message.fileUrl.split("/").pop()}</span>
              <span>
                <MdDownload
                  className="text-white h-6 w-6"
                  onClick={downloadFile(message.fileUrl)}
                />
              </span>
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-white">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef}></div>
      {showImage && (
        <div className="fixed z-[1000] h-[100vh] w-[100vh] max-w-max max-h-max p-8 flex items-center justify-center bg-blue-950 flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src={`${HOST}/${imageUrl}`}
            className="h-[80vh] w-full bg-cover"
          />
          <div className="flex gap-5 justify-center items-center fixed top-0 mt-8">
            <MdDownload
              className="text-white h-6 w-6 cursor-pointer"
              onClick={downloadFile(imageUrl)}
            />
            <MdClose
              className="text-white h-6 w-6 cursor-pointer"
              onClick={() => {
                setShowImage(false);
                setImageUrl(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
