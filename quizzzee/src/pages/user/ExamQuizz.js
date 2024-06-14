import React, { useState } from "react";
import Modal from "react-modal";

const questionsData = [
    { id: 1, question: "Question 1?" },
    { id: 2, question: "Question 2?" },
    // Add more questions as needed
];

function ExamQuizz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [answers, setAnswers] = useState(questionsData.map(() => ""));
    const [answeredCount, setAnsweredCount] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal

    const handleNextQuestion = () => {
        // Check if current question is answered
        if (answers[currentQuestionIndex].trim() !== "") {
            // Add to answered questions if not already answered
            if (!answeredQuestions.includes(currentQuestionIndex)) {
                setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
                setAnsweredCount(answeredCount + 1);
            }
        }

        // Move to next question
        if (currentQuestionIndex === questionsData.length - 1) {
            setCurrentQuestionIndex(0);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleJumpToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = value;
        setAnswers(updatedAnswers);
    };

    const isQuestionAnswered = (index) => {
        return answeredQuestions.includes(index);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-6 flex">
            <style>
                {`
                    body {
                        overflow: hidden;
                    }
                    .modal-overlay {
                        z-index: 50;
                    }
                    .modal-content {
                        background-color: white;
                        max-width: 50%;
                    }
                `}
            </style>
            <div className="w-3/4 mr-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                        Question {currentQuestionIndex + 1}
                    </h2>
                    <button
                        className="bg-gray-300 text-gray-800 px-3 py-1 rounded ml-auto"
                        onClick={openModal}
                    >
                        Setting Exam
                    </button>
                </div>
                <div className="bg-white p-4 shadow-md rounded-lg mb-6 max-h-96 overflow-y-auto sticky bottom-0">
                    <p className="text-lg">
                        {questionsData[currentQuestionIndex].question}
                    </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <input
                        type="text"
                        className="border border-gray-300 px-4 py-2 rounded-lg flex-1 mr-4"
                        placeholder="Your answer"
                        value={answers[currentQuestionIndex]}
                        onChange={handleInputChange}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        onClick={handleNextQuestion}
                    >
                        Next Question
                    </button>
                </div>
            </div>
            <div className="w-1/4">
                <div className="bg-white p-4 shadow-md rounded-lg mb-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Question List</h2>
                        <p className="mb-2">
                            Questions answered: {answeredCount} / {questionsData.length}
                        </p>
                        <div className="overflow-y-auto max-h-80">
                            <ul>
                                {questionsData.map((question, index) => (
                                    <li
                                        key={index}
                                        className={`cursor-pointer ${index === currentQuestionIndex
                                            ? "font-semibold"
                                            : ""
                                            } ${isQuestionAnswered(index)
                                                ? "text-green-500"
                                                : ""
                                            }`}
                                        onClick={() => handleJumpToQuestion(index)}
                                    >
                                        Question {index + 1}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
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
                <div className="modal-content bg-white p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Setting Exam</h2>
                    {/* Modal content */}
                    <p>Hello World!</p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default ExamQuizz;
