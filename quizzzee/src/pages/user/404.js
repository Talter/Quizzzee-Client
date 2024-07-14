import React from "react";
import notfound from "../../images/system/NotFound.png";

function NotFound() {
  return (
    <div className="relative">
      <img
        src={notfound}
        alt="404 not found"
        className="absolute top-0 scale-50"
      />
    </div>
  );
}

export default NotFound;
