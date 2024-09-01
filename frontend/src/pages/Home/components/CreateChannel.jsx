import { Tooltip, Modal, TextInput } from "flowbite-react";
import { MdGroupAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { apiClient } from "../../../lib/api-client";
import {
  CREATE_GROUP_ROUTE,
  GET_ALL_CONTACTS_ROUTE,
} from "../../../utils/constants";
import { useAppState } from "../../../zustand/zustand";
import { MultiSelect } from "react-multi-select-component";

function CreateChannel() {
  const { setSelectedChatType, setSelectedChatData, addGroup } = useAppState();
  const [openAddGroupChatModal, setOpenAddGroupChatModal] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    const getContactsForGroup = async () => {
      const res = await apiClient.get(
        GET_ALL_CONTACTS_ROUTE,
        {
          withCredentials: true,
        },
        []
      );
      setAllContacts(res.data.contacts);
    };
    getContactsForGroup();
  });

  const createGroup = async () => {
    try {
      if (groupName.length > 0 && selectedContacts.length > 0) {
        const response = await apiClient.post(
          CREATE_GROUP_ROUTE,
          {
            name: groupName,
            members: selectedContacts.map((contact) => contact.value),
          },
          { withCredentials: true }
        );
        if (response.status === 201) {
          setGroupName("");
          setSelectedContacts([]);
          setOpenAddGroupChatModal(false);
          addGroup(response.data.group);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Tooltip and Button to open the modal */}
      <Tooltip content="Start a new group chat" className="bg-black px-4 py-2">
        <MdGroupAdd
          className="text-blue-600 w-6 h-6 me-2 cursor-pointer"
          onClick={() => setOpenAddGroupChatModal(true)}
        />
      </Tooltip>

      {/* Modal for adding new group chat */}
      <Modal
        size="md"
        show={openAddGroupChatModal}
        onClose={() => setOpenAddGroupChatModal(false)}
      >
        <Modal.Header className="flex justify-between items-center me-3">
          <p className="text-lg moderustic-md px-6 py-4">Create a New Group</p>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col space-y-4">
            <TextInput
              id="group-name"
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
              className="w-[80%] mx-auto items-center"
            />
            <MultiSelect
              options={allContacts}
              value={selectedContacts}
              onChange={setSelectedContacts}
              labelledBy="Select"
              className="w-[80%] mx-auto items-center"
            />
            <button
              className="flex bg-blue-700 hover:bg-blue-500 text-white font-bold moderustic-md mx-auto items-center max-w-max py-2 px-4 rounded-md"
              onClick={createGroup}
            >
              Create Group
            </button>
          </div>

          <div
            id="contact-list"
            className="flex flex-col gap-3 px-6 py-4 moderustic-thin max-h-60 overflow-y-auto"
          ></div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateChannel;
