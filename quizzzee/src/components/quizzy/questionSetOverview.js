import React from "react";

function QuestionSetOverview(props) {
  const quizzzy = props.quizzzy;
  return (
    <div className="min-h-72 bg-mainColor text-white text-2xl font-semibold grid grid-cols-5 divide-x-2 divide-white py-12 px-4 rounded-lg">
      <div className="col-span-2">{quizzzy.text}</div>
      <div className="col-span-3 px-4">{quizzzy.answer_fc}</div>
    </div>
  );
}

export default QuestionSetOverview;
