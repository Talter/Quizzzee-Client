import React from "react";
import { Link } from "react-router-dom";

function Tag(props) {
  const name = props.name;
  return (
    <Link
      to={`/search/tag=${name}`}
      className="select-none bg-mainColor w-36 h-12 rounded-lg flex justify-center items-center text-lg text-white font-semibold transform transition hover:scale-105 active:scale-90 active:bg-mainColorBold hover:cursor-pointer"
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </Link>
  );
}

export default Tag;
