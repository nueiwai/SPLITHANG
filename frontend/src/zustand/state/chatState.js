export const createChatState = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  directMessagesContacts: [],
  groups: [],

  isUploading: false,
  isDownloading: false,
  fileUploadProgress: 0,
  fileDownloadProgress: 0,

  setIsUploading: (isUploading) => set({ isUploading }),
  setIsDownloading: (isDownloading) => set({ isDownloading }),
  setFileUploadProgress: (fileUploadProgress) => set({ fileUploadProgress }),
  setFileDownloadProgress: (fileDownloadProgress) => set({ fileDownloadProgress }),


  setGroups: (groups) => {
    const currentGroups = get().groups;
    if (JSON.stringify(currentGroups) !== JSON.stringify(groups)) {
      set({ groups });
    }
  },

  setSelectedChatType: (selectedChatType) => {
    if (get().selectedChatType !== selectedChatType) {
      set({ selectedChatType });
    }
  },

  setSelectedChatData: (selectedChatData) => {
    if (get().selectedChatData !== selectedChatData) {
      set({ selectedChatData });
    }
  },


  setSelectedChatMessages: (selectedChatMessages) => {
    const currentMessages = get().selectedChatMessages;
    if (JSON.stringify(currentMessages) !== JSON.stringify(selectedChatMessages)) {
      set({ selectedChatMessages });
    }
  },

  setDirectMessagesContacts: (directMessagesContacts) => {
    const currentContacts = get().directMessagesContacts;
    if (JSON.stringify(currentContacts) !== JSON.stringify(directMessagesContacts)) {
      set({ directMessagesContacts });
    }
  },

   setGroups: (groups) => {
    const currentGroups = get().groups;
    if (JSON.stringify(currentGroups) !== JSON.stringify(groups)) {
      set({ groups });
    }
  },

  closeChat: () => {
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessages: [],
    });
  },

  addGroup: (group) => {
    const groups = get().groups;
    set({ groups: [group, ...groups] });
  },


  addMessage: (message) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;

    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "group"
              ? message.recipient
              : message.recipient._id,
          sender:
            selectedChatType === "group"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
});
