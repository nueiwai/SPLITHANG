import NewDM from "./NewDM";
import UserProfile from "./UserProfile";

function ContactContainer() {
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
      {/* group chats */}
      <p className="uppercase tracking-wider font-bold text-blue-600 moderustic-md">
        Group Chats
      </p>
      <UserProfile />
    </div>
  );
}

export default ContactContainer;
