import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Signup from "./pages/Signup/Signup";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAppState } from "./zustand/zustand";
import { Spinner } from "flowbite-react";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";

function App() {
  const { userInfo, setUserInfo } = useAppState();
  const [loading, setLoading] = useState(true);

  const PrivateRoute = ({ children }) => {
    const { userInfo } = useAppState();
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  const MainRoute = ({ children }) => {
    const { userInfo } = useAppState();
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? <Navigate to="/home" /> : children;
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await apiClient(GET_USER_INFO, {
          withCredentials: true,
        });
        console.log(res);
        if (res.status === 200 && res.data._id) {
          setUserInfo(res.data);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.log(error);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };
    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner size="md" className="text-[#1c64f2]" />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={
              <MainRoute>
                <Signup />
              </MainRoute>
            }
          />
          <Route
            path="/login"
            element={
              <MainRoute>
                <Login />
              </MainRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
