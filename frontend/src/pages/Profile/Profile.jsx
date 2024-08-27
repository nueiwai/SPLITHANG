import { useAppState } from "../../zustand/zustand";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, TextInput } from "flowbite-react";
import defaultAvatar from "../../assets/avatar.png";
import { apiClient } from "../../lib/api-client";
import { UPDATE_PROFILE } from "../../utils/constants";
import toast from "react-hot-toast";
import { MdOutlineArrowBackIos } from "react-icons/md";

//Profile
function Profile() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppState();
  const [displayName, setDisplayName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  // set display name and profile picture
  useEffect(() => {
    if (userInfo.profileSetup) {
      setDisplayName(userInfo.displayName);
      setProfilePic(userInfo.profilePic);
    }
  }, [userInfo]);

  const validateProfile = async () => {
    if (!displayName) {
      alert("Display Name is required");
      return false;
    }
    return true;
  };

  const goToHome = () => {
    if (userInfo.profileSetup) {
      navigate("/home");
    } else {
      toast.error("Please complete your profile setup");
    }
  };

  // set profile picture from api
  function setProfilePicture(displayName) {
    const nameParts = displayName.split(" ");
    const firstName = nameParts[0];
    const profilePictureUrl = `https://avatar.iran.liara.run/username?username=${firstName}`;
    return profilePictureUrl;
  }

  const saveProfileChanges = async (e) => {
    e.preventDefault();
    const saveProfilePic = setProfilePicture(displayName);
    if (validateProfile()) {
      try {
        const res = await apiClient.post(
          UPDATE_PROFILE,
          {
            displayName,
            profilePic: saveProfilePic,
          },
          { withCredentials: true }
        );

        if (res.status === 200 && res.data) {
          setUserInfo({ ...res.data });
          toast.success("Profile updated successfully");
          navigate("/home");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  return (
    <div className="bg-blue-900 h-[100vh] w-[100vw] flex items-center justify-center">
      <Card className="min-w-[90%] p-8 mx-auto">
        <div
          className="hover:bg-gray-100 rounded-full p-2 justify-start"
          on
          onClick={goToHome}
        >
          <MdOutlineArrowBackIos className="text-blue-900 w-10 h-10" />
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            src={profilePic ? profilePic : defaultAvatar}
            alt="default-avatar"
            className="rounded-full w-24 h-24 mb-4"
          />
          <form>
            <div>
              {/* email display field */}
              <TextInput
                id="email"
                type="email"
                className="mb-2"
                required
                placeholder="Display Name"
                disabled
                value={userInfo.email}
              />

              {/* display name input field */}
              <TextInput
                id="display-name"
                type="text"
                required
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <Button
              className="mt-4 mx-auto px-2 font-bold bg-blue-700 hover:bg-blue-600"
              onClick={saveProfileChanges}
            >
              Save Changes
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default Profile;
