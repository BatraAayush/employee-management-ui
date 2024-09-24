import React from "react";
import { useNavigate } from "react-router";

const Popoup = ({ title, redirectTo }) => {
  const navigate = useNavigate();
  const goToPage = () => {
    navigate(redirectTo);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
      <div className="bg-white rounded-md flex flex-col gap-8 p-10 items-center">
        <h1 className="text-xl font-bold text-blue-700">{title}</h1>
        <button
          className="bg-green-800 text-white px-4 py-1 rounded-md"
          onClick={goToPage}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Popoup;
