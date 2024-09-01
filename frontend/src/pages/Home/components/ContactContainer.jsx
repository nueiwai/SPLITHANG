import ContactList from "../../../../components/ContactList";
import { apiClient } from "../../../lib/api-client";
import {
  GET_DM_CONTACTS_ROUTES,
  GET_USER_GROUPS_ROUTE,
} from "../../../utils/constants";
import { useAppState } from "../../../zustand/zustand";
import CreateChannel from "./CreateChannel";
import NewDM from "./NewDM";
import UserProfile from "./UserProfile";
import { useEffect } from "react";

const ContactContainer = () => {
  const {
    setDirectMessagesContacts,
    directMessagesContacts,
    groups,
    setGroups,
  } = useAppState();
  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
        withCredentials: true,
      });
      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
    };

    const getGroups = async () => {
      const response = await apiClient.get(GET_USER_GROUPS_ROUTE, {
        withCredentials: true,
      });
      if (response.data.groups) {
        setGroups(response.data.groups);
      }
    };

    getContacts();
    getGroups();
  }, []);

  return (
    <div className="relative w-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] max-w-[100vw] bg-blue-400 border-r-4 border-blue-950 ps-2">
      <h1 className="moderustic-md font-bold text-blue-900 text-center text-2xl my-2">
        SplitHang
      </h1>
      <div className="h-1 mb-4 w-[60%] mx-auto bg-blue-700"></div>

      {/* DMs */}
      {/* DM title bar */}
      <div className="flex justify-between">
        <p className="uppercase tracking-wider font-bold text-blue-600 moderustic-md">
          Direct Messages
        </p>
        <NewDM />
      </div>
      {/* DM list */}
      <div className="max-h-[40vh] overflow-y-auto">
        <ContactList contacts={directMessagesContacts} />
      </div>
      {/* group chats */}
      <div className="flex justify-between">
        <p className="uppercase tracking-wider font-bold text-blue-600 moderustic-md">
          Group Chats
        </p>
        <CreateChannel />
      </div>
      {/* group chat list */}
      <div className="max-h-[40vh] overflow-y-auto">
        <ContactList contacts={groups} isGroup={true} />
      </div>

      <UserProfile />
    </div>
  );
};

export default ContactContainer;
