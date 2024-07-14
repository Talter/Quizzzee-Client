import React from "react";
import notfound from "../../images/system/NotFound.png";

function NotFound() {
  return (
    <div className="min-h-screen py-0  text-white flex justify-center pt-24">
      <img
        src={notfound}
        alt="404 not found"
        className="w-1/2 h-1/2"
      />
      </div>
  );
}

export default NotFound;
