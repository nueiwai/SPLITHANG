import { HOST } from "../utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAppState } from "../zustand/zustand";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo } = useAppState();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo._id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      const receiveMessage = (message) => {
        const {
          selectedChatData,
          selectedChatType,
          addMessage,
          addContactsInDMContacts,
        } = useAppState.getState();

        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          console.log("Received message:", message);
          addMessage(message);
        }
        addContactsInDMContacts(message);
      };

      const receiveGroupMessage = (message) => {
        const {
          selectedChatData,
          selectedChatType,
          addMessage,
          addGroupInGroupList,
        } = useAppState.getState();

        if (
          selectedChatType !== undefined &&
          selectedChatData._id === message.groupId
        ) {
          addMessage(message);
          console.log("Received group message:", message);
        }
        addGroupInGroupList(message);
      };

      socket.current.on("receiveMessage", receiveMessage);
      socket.current.on("receiveGroupMessage", receiveGroupMessage);
      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
