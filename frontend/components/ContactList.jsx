import { useAppState } from "../src/zustand/zustand";
import { HiUserGroup } from "react-icons/hi";

const ContactList = ({ contacts, isGroup = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    setSelectedChatMessages,
  } = useAppState();

  const handleClick = (contact) => {
    if (isGroup) setSelectedChatType("group");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-blue-600 text-white hover:bg-blue-100 hover:text-black"
              : "hover:bg-blue-100 hover:text-black"
          }`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex gap-5 items-center justify-start">
            {!isGroup && (
              <>
                <img
                  src={contact.profilePic}
                  alt="default-avatar"
                  className="rounded-full w-10 h-10 m-1"
                />
                <div className="flex flex-col moderustic-thin">
                  <p className="text-lg">{contact.displayName}</p>
                  <p className="text-sm">{contact.email}</p>
                </div>
              </>
            )}
            {isGroup && (
              <div className="flex items-center justify-center moderustic-thin hover:text-white hover:bg-blue-900 gap-2">
                <HiUserGroup className="h-10 w-10 bg-blue-950 rounded-full text-white" />
                {isGroup ? (
                  <span className="text-lg text-black">{contact.name}</span>
                ) : null}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
