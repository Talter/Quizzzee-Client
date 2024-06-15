import React, { useState, useEffect } from "react";
import Modal from "react-modal";

function ExamQuizz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [answeredCount, setAnsweredCount] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [maxQuestions, setMaxQuestions] = useState(20);
    const [examType, setExamType] = useState("multipleChoice");
    const [maxQuestionsError, setMaxQuestionsError] = useState("");

    const generateRandomQuestions = (count) => {
        return Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            question: `Question ${i + 1}?`,
        }));
    };

    useEffect(() => {
        const initialQuestions = generateRandomQuestions(maxQuestions);
        setQuestions(initialQuestions);
        setAnswers(initialQuestions.map(() => ""));
    }, []);

    const handleNextQuestion = () => {
        if (answers[currentQuestionIndex].trim() !== "") {
            if (!answeredQuestions.includes(currentQuestionIndex)) {
                setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
                setAnsweredCount(answeredCount + 1);
            }
        }

        if (currentQuestionIndex === questions.length - 1) {
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
        setMaxQuestionsError("");
    };

    const handleConfirmSettings = () => {
        if (maxQuestions <= 0 || maxQuestions > 999 || isNaN(maxQuestions)) {
            setMaxQuestionsError("Max Questions must be between 1 and 999.");
            return;
        }

        const newQuestions = generateRandomQuestions(maxQuestions);
        setQuestions(newQuestions);
        setAnswers(newQuestions.map(() => ""));
        setCurrentQuestionIndex(0);
        setAnsweredQuestions([]);
        setAnsweredCount(0);

        closeModal();
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
                    .error-text {
                        color: red;
                        font-size: 0.75rem;
                        margin-top: 0.25rem;
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
                        Exam Setting
                    </button>
                </div>
                <div className="bg-white p-4 shadow-md rounded-lg mb-6 max-h-96 overflow-y-auto sticky bottom-0">
                    <p className="text-lg">
                        {questions[currentQuestionIndex]?.question || ""}
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
                            Questions answered: {answeredCount} / {questions.length}
                        </p>
                        <div className="overflow-y-auto max-h-80">
                            <ul>
                                {questions.map((question, index) => (
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
                <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-6">Exam Setting</h2>

                    {/* Part 1: Max Questions */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Max Questions</h3>
                        <input
                            type="number"
                            value={maxQuestions}
                            onChange={(e) => setMaxQuestions(parseInt(e.target.value))}
                            className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                        />
                        {maxQuestionsError && (
                            <p className="error-text">{maxQuestionsError}</p>
                        )}
                    </div>

                    {/* Part 2: Exam Type */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Exam Type</h3>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="multipleChoice"
                                name="examType"
                                value="multipleChoice"
                                checked={examType === "multipleChoice"}
                                onChange={(e) => setExamType(e.target.value)}
                                className="mr-2"
                            />
                            <label htmlFor="multipleChoice" className="mr-4">
                                Multiple Choice
                            </label>
                            <input
                                type="radio"
                                id="essay"
                                name="examType"
                                value="essay"
                                checked={examType === "essay"}
                                onChange={(e) => setExamType(e.target.value)}
                                className="mr-2"
                            />
                            <label htmlFor="essay">Essay</label>
                        </div>
                    </div>

                    {/* Part 3: Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            onClick={handleConfirmSettings}
                        >
                            Confirm Settings
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ExamQuizz;
