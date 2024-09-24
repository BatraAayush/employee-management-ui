import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../features/userDetailSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("username");
    dispatch(logout());
    navigate("/login");
  };

  const username = localStorage.getItem("username");

  return (
    <>
      {(currentPath === "/" ||
        currentPath.includes("/create-employee") ||
        currentPath === "/employee-list") && (
        <div className="flex justify-between px-4 py-4 bg-blue-500 text-white">
          <div className="flex gap-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/employee-list">Employee List</NavLink>
          </div>

          <div className="flex gap-8">
            <p className="capitalize">Hii {username}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
