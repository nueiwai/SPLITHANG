import { useAppState } from "../../zustand/zustand";
//Profile
function Profile() {
  const { userInfo } = useAppState();
  return (
    <div>
      <div>Profile</div>
      <div>Email: {userInfo.email}</div>
      <div>ID: {userInfo._id}</div>
    </div>
  );
}

export default Profile;
