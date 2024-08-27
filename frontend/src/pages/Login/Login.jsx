import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { toast } from "react-hot-toast";
import { apiClient } from "../../lib/api-client";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../utils/constants";
import { useAppState } from "../../zustand/zustand";

//Auth
function Login() {
  const { setUserInfo } = useAppState();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateLogin()) {
      const res = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.user._id) {
        setUserInfo(res.data.user);
        if (res.data.user.profileSetup === true) {
          navigate("/home");
        } else if (res.data.user.profileSetup === false) {
          navigate("/profile");
        }
      }
    }
  };

  const validateLogin = () => {
    if (!email || !password) {
      toast.error("Please fill in all the fields");
      return false;
    }

    return true;
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <Card className="min-w-sm max-w-md p-8">
        <form className="flex max-w-md flex-col gap-4">
          <h1 className="text-center font-bold text-xl">
            Welcome back from{" "}
            <span className="text-2xl font-bold text-blue-400 ">SplitHang</span>
          </h1>

          {/* email */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* password */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="******"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* link to signup */}
          <Link
            to="/signup"
            className="text-xs text-gray-600 hover:text-blue-500 cursor-pointer"
          >
            {"I don't"} have an account yet
          </Link>

          {/* login button */}
          <Button
            className="bg-blue-700 text-white font-bold hover:bg-blue-600 rounded-xl shadow-md"
            type="submit"
            onClick={handleLogin}
          >
            Log In
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
