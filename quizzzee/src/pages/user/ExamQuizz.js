import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import AnswerRender from "../../components/exam/answer/AnswerRender";

function ExamQuizz() {
  const { id } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [answeredCount, setAnsweredCount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [maxQuestionsError, setMaxQuestionsError] = useState("");
  const [maxQuestions, setMaxQuestions] = useState(0);
  const [examData, setExamData] = useState(null); // State to store fetched exam data
  const [result, setResult] = useState("");
  const [mode, setMode] = useState(1);
  const [modeRender, setModeRender] = useState(1);
  const [resultPopupIsOpen, setResultPopupIsOpen] = useState(false);

  const fetchExamData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/quizzzy/${id}/exam`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:
            maxQuestions !== 0
              ? JSON.stringify({ mode, amount: maxQuestions })
              : JSON.stringify({ mode }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch exam data");
      }
      const data = await response.json();
      const selectedQuizzzes = data.quizzzes;
      const newQuestions = selectedQuizzzes.map((quizzze) => ({
        id: quizzze._id,
        question: quizzze.text,
        answer_qt: quizzze.answer_qt
      }));

      const initialAnswers = {};
      newQuestions.forEach((question) => {
        initialAnswers[question.id] = "";
      });
      setMaxQuestions(newQuestions.length);
      setExamData(data); // Set examData state for later use
      setQuestions(newQuestions);
      setAnswers(initialAnswers);
      setModeRender(data.mode)
    } catch (error) {
      console.error("Error fetching exam data:", error);
    }
  };

  useEffect(() => {
    fetchExamData(); // Fetch exam data on component mount
  }, []);

  useEffect(() => {
    let counter = 0;
    if (answers == {}) return;
    let check = Object.entries(answers);
    check.map((answer) => {
      if (answer[1] !== "" && answer[1] !== undefined) ++counter;
    });
    setAnsweredCount(counter);
  }, [answers]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex === 0) {
      setCurrentQuestionIndex(questions.length - 1);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    const updatedAnswers = { ...answers };
    updatedAnswers[questions[currentQuestionIndex].id] = value;
    setAnswers(updatedAnswers);
  };

  const isQuestionAnswered = (index) => {
    const questionId = questions[index].id;
    return answers[questionId] !== "";
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setMaxQuestionsError("");
  };

  const handleConfirmSettings = async () => {
    if (maxQuestions <= 0 || maxQuestions > 999 || isNaN(maxQuestions)) {
      setMaxQuestionsError("Max Questions must be between 1 and 999.");
      return;
    }
    fetchExamData();
    setResult("");
    closeModal();
  };

  const handleSubmit = async () => {
    const exam = questions.map((question) => ({
      _id: question.id,
      answer_qt: question.answer_qt,
      text: question.question,
      answer_us: answers[question.id] === "true" ? true : answers[question.id] === "false" ? false : answers[question.id]
    }))
    // console.log(JSON.stringify({ answers: exam, mode, amount: 1 }));
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/quizzzy/${id}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers: exam, mode, amount: 1 }),
        }
      );
      if (!response.ok) {
        throw new Error("I succ :<");
      }
      const data = await response.json();
      setResult(data);
      setResultPopupIsOpen(true);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const ExamResult = () => {
    return (
      <>
        {resultPopupIsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="absolute z-50 bg-white p-6 rounded-lg shadow-lg max-w-lg transform transition-all duration-500 -translate-y-1/2  w-full md:w-1/2">
              <button
                className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-800"
                onClick={() => setResultPopupIsOpen(false)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="content">
                <p className="text-lg font-semibold">
                  You got {result.point}/{maxQuestions}
                </p>
                <p
                  className={
                    "pl-4 font-bold " +
                    (result.point / maxQuestions >= 0.5
                      ? "text-green-500"
                      : "text-red-500")
                  }
                >
                  You {result.point / maxQuestions >= 0.5 ? "Passed" : "Failed"}
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6 flex">
      {/* <style> */}
      {/*   {` */}
      {/*     body { */}
      {/*       overflow: hidden; */}
      {/*     } */}
      {/*     .modal-overlay { */}
      {/*       z-index: 50; */}
      {/*     } */}
      {/*     .modal-content { */}
      {/*       background-color: white; */}
      {/*       max-width: 50%; */}
      {/*     } */}
      {/*     .error-text { */}
      {/*       color: red; */}
      {/*       font-size: 0.75rem; */}
      {/*       margin-top: 0.25rem; */}
      {/*     } */}
      {/*   `} */}
      {/* </style> */}
      <div className="w-3/4 mr-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Question {currentQuestionIndex + 1}
          </h2>
          <button
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded ml-auto"
            onClick={openModal}
          >
            Exam Settings
          </button>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg mb-6 max-h-96 overflow-y-auto sticky bottom-0">
          <p className="text-lg">
            Question: {questions[currentQuestionIndex]?.question || ""}
          </p>
          <p className={"text-lg " + (modeRender != 2 && "hidden ")}>
            Answer: {questions[currentQuestionIndex]?.answer_qt || ""}
          </p>
        </div>
        <AnswerRender
          result={result}
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          handleInputChange={handleInputChange}
          handleNextQuestion={handleNextQuestion}
          handlePreviousQuestion={handlePreviousQuestion}
          mode={modeRender}
        />
      </div>
      <div className="w-1/4">
        <div className="bg-white p-4 shadow-md rounded-lg mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Question List</h2>
            <p className="mb-2">
              Questions answered: {answeredCount} / {questions.length}
            </p>
            <div className="overflow-y-auto max-h-80">
              <ul>
                {questions.map((question, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer ${index === currentQuestionIndex ? "font-semibold" : ""
                      } ${isQuestionAnswered(index) ? "text-green-500" : ""}`}
                    onClick={() => handleJumpToQuestion(index)}
                  >
                    Question {index + 1}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-auto">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Setting Exam */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal fixed inset-0 flex items-center justify-center"
        overlayClassName="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50"
      >
        <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Exam Settings</h2>

          {/* Part 1: Max Questions */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Max Questions</h3>
            <input
              type="number"
              value={maxQuestions ? maxQuestions : ""}
              onChange={(e) => {
                setMaxQuestions(e.target.value);
              }}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              min={0}
              max={999}
            />
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Max Questions</h3>
            <select
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              value={mode}
              onChange={(e) => {
                setMode(parseInt(e.target.value));
              }}
            >
              <option value="1">Eassay</option>
              <option value="2">True/False</option>
            </select>
          </div>
          {/* Part 2: Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => handleConfirmSettings()}
            >
              Confirm Settings
            </button>
          </div>
        </div>
      </Modal>
      <ExamResult />
    </div>
  );
}

export default ExamQuizz;
