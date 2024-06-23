import React from "react";

const TrueFalseType = ({
  result,
  questions,
  currentQuestionIndex,
  answers,
  handleInputChange,
  handleNextQuestion,
  handlePreviousQuestion,
}) => {
  const selected =
    "cursor-pointer select-none col-span-5 px-4 py-2 bg-mainColor shadow-md rounded-lg text-white text-lg font-semibold text-center transform transition-all hover:scale-105 active:scale-90";
  const selectedNot =
    "cursor-pointer select-none col-span-5 px-4 py-2 border-2 bg-white shadow-md rounded-lg text-lg font-semibold text-center transform transition-all hover:scale-105 active:scale-90";

  const Cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  if (!result) {
    return (
      <section>
        <div className="grid grid-cols-12 gap-4 items-center justify-between mt-4">
          <button
            value={Boolean(true)}
            onClick={handleInputChange}
            className={answers[questions[currentQuestionIndex].id] == "true" ? selected : selectedNot}
          >
            True
          </button>
          <button
            value={Boolean(false)}
            onClick={handleInputChange}
            className={answers[questions[currentQuestionIndex].id] == "false" ? selected : selectedNot}
          >
            False
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg col-start-11 col-span-2"
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <div className="grid grid-cols-12 gap-4 items-center justify-between mt-4">
          <button
            className={"text-white text-lg font-semibold px-2 py-2 rounded-lg col-start-1 col-span-3" + (result.checkedAnswers[currentQuestionIndex].correct ? " bg-green-500" : " bg-red-500") }
            disabled
          >
            {Cap(answers[questions[currentQuestionIndex].id])}
          </button>
          <button
            className={"bg-green-500 text-white text-lg font-semibold px-2 py-2 rounded-lg col-span-9 " + (result.checkedAnswers[currentQuestionIndex].correct && " hidden")}
            disabled
          >
            {!result.checkedAnswers[currentQuestionIndex].correct && Cap(result.checkedAnswers[currentQuestionIndex].answer_fc)}
          </button>
        </div>
        <div className="grid grid-cols-12 gap-4 items-center justify-between mt-4">
          <button
            className="bg-blue-500 text-white px-2 py-2 rounded-lg col-start-1 col-span-2"
            onClick={handlePreviousQuestion}
          >
            Previous Question
          </button>
          <button
            className="bg-blue-500 text-white px-2 py-2 rounded-lg col-start-11 col-span-2"
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        </div>
      </section>
    );
  }
};

export default TrueFalseType;
