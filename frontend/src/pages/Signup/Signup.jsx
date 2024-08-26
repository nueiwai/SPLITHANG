import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { apiClient } from "../../lib/api-client";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SIGNUP_ROUTE } from "../../utils/constants";
import { useAppState } from "../../zustand/zustand";

//Auth
function Signup() {
  const { setUserInfo } = useAppState();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (validateSignup()) {
      const res = await apiClient.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 201) {
        setUserInfo(res.data.user);
        navigate("/profile");
      }
      console.log(res);
    }
  };

  const validateSignup = () => {
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all the fields");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <Card className="min-w-sm max-w-md p-8">
        <form className="flex max-w-md flex-col gap-4">
          <h1 className="text-center font-bold text-xl">
            Welcome to{" "}
            <span className="text-2xl font-bold text-blue-400 ">SplitHang</span>
          </h1>

          {/* email */}
          <div>
            <div className="mb-2 block w-full focus:blue-700">
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
            <div className="mb-2 block w-full focus:blue-700">
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

          {/* confirm password */}
          <div>
            <div className="mb-2 block w-full focus:blue-700">
              <Label htmlFor="confirm-password" value="Repeat password" />
            </div>
            <TextInput
              id="confirm-password"
              type="password"
              placeholder="*******"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* link to login */}
          <div className="flex items-center gap-2"></div>
          <Link
            to="/login"
            className="text-xs text-gray-600 hover:text-blue-500 cursor-pointer"
          >
            {"I already"} have an account
          </Link>

          {/* signup button */}
          <Button
            className="bg-blue-700 text-white font-bold hover:bg-blue-600 rounded-xl shadow-md"
            type="submit"
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Signup;
