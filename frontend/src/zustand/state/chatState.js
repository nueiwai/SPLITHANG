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
  addGroupInGroupList: (message) => {
  const groups = get().groups; 
  const groupId = message.groupId; 
  const data = groups.find((group) => group._id === groupId); 

  if (data) {
    const index = groups.findIndex((group) => group._id === groupId); 

    if (index !== -1) { 
      groups.splice(index, 1);
      groups.unshift(data); 
    }
  }
},

addContactsInDMContacts: (message) => {
  const userId = get().userInfo.id;
  const fromId = message.sender._id === userId
    ? message.recipient._id
    : message.sender._id;
  const fromData = message.sender._id === userId
    ? message.recipient
    : message.sender;

  const dmContacts = get().directMessagesContacts;
  const data = dmContacts.find((contact) => contact._id === fromId);
  const index = dmContacts.findIndex((contact) => contact._id === fromId);

  console.log({ data, index, dmContacts, userId, message, fromData });

  if (index !== -1) { 
    console.log("in if condition");
    dmContacts.splice(index, 1); 
    dmContacts.unshift(data); 
  } else {
    console.log("in else condition");
    dmContacts.unshift(fromData); 
  }

  set({ directMessagesContacts: dmContacts }); 
}


  
});
