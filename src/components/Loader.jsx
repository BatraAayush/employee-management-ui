import React from "react";

const Loader = ({ type = "page" }) => {
  const isPageLoader = type === "page";

  return (
    <div className={`flex items-center justify-center ${isPageLoader ? 'h-screen' : 'h-8 w-8'}`}>
      <div
        className={`loader  ${isPageLoader ? 'border-8 border-blue-500' : 'border-2 border-white'} border-t-transparent rounded-full ${isPageLoader ? 'w-16 h-16' : 'w-4 h-4'} animate-spin`}
      ></div>
    </div>
  );
};

export default Loader;
