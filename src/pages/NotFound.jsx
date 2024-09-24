import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center mt-12 flex-col gap-2">
      <h1 className="text-4xl">404</h1>
      <p className="text-2xl">Page Not Found</p>
      <p>
        Go Back To <Link to="/" className="font-bold text-blue-600">HOME</Link>
      </p>
    </div>
  );
};

export default NotFound;
