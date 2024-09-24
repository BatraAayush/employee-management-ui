import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { authenticateUser } from "../features/userDetailSlice";
import Loader from "../components/Loader";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const Login = () => {
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userData.user.username) {
      console.log("Redirecting to home");
      localStorage.setItem("username", userData.user.username);
      navigate("/");
    }
  }, [userData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(authenticateUser({ ...user, authMode }));
  };

  return (
    <div className="flex flex-col items-center mt-[10%] gap-8 border-4 border-gray-300 rounded-md w-min m-auto p-8">
      <h1 className="text-4xl uppercase">{authMode}</h1>
      <form className="flex flex-col gap-8 w-[20rem]" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <label>USERNAME</label>
          <input
            name="username"
            type="text"
            className="border border-black rounded-md px-2 py-1"
            onChange={handleInput}
            required
          />
        </div>
        <div className="flex justify-between items-center relative">
          <label>PASSWORD</label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className="border border-black rounded-md px-2 py-1"
            onChange={handleInput}
            required
          />
          <p
            className="absolute right-2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <BiHide /> : <BiShow />}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-500">{userData.error}</p>
          <button
            type="submit"
            disabled={userData.loading}
            className="capitalize bg-blue-500 border-2 text-white px-8 py-1 rounded-md border-blue-500"
          >
            {userData.loading ? <Loader type="button" /> : authMode}
          </button>
          {authMode === "login" ? (
            <p
              className="cursor-pointer underline"
              onClick={() => setAuthMode("signup")}
            >
              Doesn't have an account? Signup
            </p>
          ) : (
            <p
              className="cursor-pointer underline"
              onClick={() => setAuthMode("login")}
            >
              Already have an acccount? Login
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
