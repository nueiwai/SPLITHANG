import { useAppState } from "../../../zustand/zustand";
import { Tooltip } from "flowbite-react";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../../lib/api-client";
import { LOGOUT_ROUTE } from "../../../utils/constants";
import { toast } from "react-hot-toast";

function UserProfile() {
  const { userInfo, setUserInfo } = useAppState();
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      const res = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        setUserInfo(null);
        navigate("/login");
        toast.success("Logged out successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="absolute bottom-0 h-[10vh] flex items-center justify-between start-0 px-6 w-full bg-blue-800 border-t-2 border-cyan-500 shadow-[0_-6px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-lg">
      <div className="flex gap-6 justify-center items-center">
        <img
          src={userInfo.profilePic}
          alt="default-avatar"
          className="rounded-full w-10 h-10 m-1"
        />
        <div className="text-lg moderustic-thin text-white">
          {userInfo.displayName}
        </div>
      </div>
      <Tooltip content="Logout" className="bg-black px-4 py-2">
        <MdLogout
          className="text-white bg-red-600 rounded-full p-2 w-8 h-8"
          onClick={logOut}
        />
      </Tooltip>
    </div>
  );
}

export default UserProfile;
