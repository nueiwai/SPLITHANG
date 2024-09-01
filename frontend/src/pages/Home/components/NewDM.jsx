import { Tooltip, Modal, TextInput } from "flowbite-react";
import { BiSolidCommentAdd } from "react-icons/bi";
import { useState } from "react";
import { apiClient } from "../../../lib/api-client";
import { SEARCH_CONTACTS_ROUTE } from "../../../utils/constants";
import { useAppState } from "../../../zustand/zustand";

function NewDM() {
  const { setSelectedChatType, setSelectedChatData } = useAppState();
  const [openAddDMModal, setOpenAddDMModal] = useState(false);
  const [searchedContact, setSearchedContact] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchContact = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const res = await apiClient.post(
          SEARCH_CONTACTS_ROUTE,
          { searchTerm },
          { withCredentials: true }
        );

        if (res.status === 200 && Array.isArray(res.data)) {
          setSearchedContact(res.data);
        } else {
          console.log("No contacts found or unexpected response:", res);
          setSearchedContact([]);
        }
      } else {
        setSearchedContact([]);
      }
    } catch (error) {
      console.error("Error during contact search:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
      }
    }
  };

  const selectNewContact = (contact) => {
    setOpenAddDMModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContact([]);
  };

  return (
    <>
      {/* Tooltip and Button to open the modal */}
      <Tooltip
        content="Start a new direct message"
        className="bg-black px-4 py-2"
      >
        <BiSolidCommentAdd
          className="text-blue-600 w-6 h-6 me-2 cursor-pointer"
          onClick={() => setOpenAddDMModal(true)}
        />
      </Tooltip>

      {/* Modal for adding new DM */}
      <Modal
        size="md"
        show={openAddDMModal}
        onClose={() => setOpenAddDMModal(false)}
      >
        <Modal.Header className="flex justify-between items-center me-3">
          <p className="text-lg moderustic-md px-6 py-4">
            Add a new direct message
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <TextInput
              id="search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                searchContact(e.target.value);
              }}
              className="w-[80%] mx-auto"
            />
          </div>
          <div
            id="contact-list"
            className="flex flex-col gap-3 px-6 py-4 moderustic-thin max-h-60 overflow-y-auto"
          >
            {searchedContact.length > 0 ? (
              searchedContact.map((contact) => (
                <div
                  key={contact._id}
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => selectNewContact(contact)}
                >
                  <div className="flex gap-6 justify-center items-center">
                    <img
                      src={contact.profilePic}
                      alt="default-avatar"
                      className="rounded-full w-10 h-10 m-1"
                    />
                    <div className="flex flex-col">
                      <div className="text-lg moderustic-thin">
                        {contact.displayName}
                      </div>
                      <div className="text-sm moderustic-thin">
                        {contact.email}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="moderustic-md flex justify-center items-center text-center mx-8 text-xl">
                <h3>
                  Hi<span className="text-blue-700">!</span> <span> </span>
                  Please search a contact to start a
                  <span className="text-blue-600"> Chat </span>
                </h3>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NewDM;
