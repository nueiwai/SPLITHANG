import { Tooltip, Button, Modal, TextInput } from "flowbite-react";
import { BiSolidCommentAdd } from "react-icons/bi";
import { useState } from "react";

function NewDM() {
  const [openAddDMModal, setOpenAddDMModal] = useState(false);
  const [searchedContact, setSearchedContact] = useState([]);

  const addDM = () => {};

  const searchContact = async (searchTerm) => {};

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
              value={searchedContact}
              onChange={(e) => searchContact(e.target.value)}
              className="w-[80%] mx-auto"
            />
          </div>
          <div id="contact-list" className="px-6 py-4 moderustic-thin">
            {searchedContact.length > 0 ? (
              searchedContact.map((contact, index) => (
                <div key={index} className="contact-item">
                  <p>{contact.name}</p>
                </div>
              ))
            ) : (
              <div>
                <div className="text-opacity-80 flex flex-col gap-5 items-center mt-10 lg:text-2xl text-xl transition-all duration-300 text-center">
                  <h3 className="moderustic-md">
                    Hi<span className="text-blue-700">!</span> <span> </span>
                    Please search a contact to start a
                    <span className="text-blue-600"> Chat </span>
                  </h3>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center gap-4 items-center my-2">
          <Button onClick={() => setOpenAddDMModal(false)} color="gray">
            Close
          </Button>
          <Button onClick={addDM} color="blue">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewDM;
