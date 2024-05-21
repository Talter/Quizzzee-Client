import React from "react";
import { useParams } from "react-router-dom";
import Question from "../images/system/question.png";

function Quizzy() {
  const { id } = useParams();
  return (
    <div className="bg-[#F6F6F6] min-h-screen">
      <div>{id}</div>
      <section
        className="bg-cover pt-36"
        style={{ backgroundImage: `url(${Question})` }}
      >AAAAAAAAAAAAAAA</section>
    </div>
  );
}

export default Quizzy;
