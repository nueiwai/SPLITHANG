import { useAppState } from "../../zustand/zustand";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Chat
function Home() {
  const { userInfo } = useAppState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return <div>Home</div>;
}

export default Home;
