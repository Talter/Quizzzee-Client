import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

function ExamQuizz() {
    const { id } = useParams();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [answeredCount, setAnsweredCount] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [maxQuestionsError, setMaxQuestionsError] = useState("");
    const [maxQuestions, setMaxQuestions] = useState("");
    const [examData, setExamData] = useState(null); // State to store fetched exam data

    useEffect(() => {
        // Function to fetch exam data from server
        const fetchExamData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/quizzzy/exam/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ mode: "1" }),
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch exam data");
                }
                const data = await response.json();
                console.log(data);

                // Determine maxQuestions based on returned data
                const maxQuestions =
                    data.amount >= 20 ? 20 : data.amount;

                // Extract questions from quizzzes
                const selectedQuizzzes = data.quizzzes.slice(0, maxQuestions);
                const newQuestions = selectedQuizzzes.map((quizzze) => ({
                    id: quizzze.id,
                    question: quizzze.text,
                }));

                // Initialize answers state with empty object for each question
                const initialAnswers = {};
                newQuestions.forEach((question) => {
                    initialAnswers[question.id] = "";
                });

                setExamData(data); // Set examData state for later use
                setQuestions(newQuestions);
                setAnswers(initialAnswers);
            } catch (error) {
                console.error("Error fetching exam data:", error);
            }
        };

        fetchExamData(); // Fetch exam data on component mount
    }, []);

    const handleNextQuestion = () => {
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

        try {
            const response = await fetch(`http://localhost:8080/api/exam/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mode: "1",
                }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            const { amount, quizzzes } = data;

            if (amount >= 20) {
                setMaxQuestions(20);
            } else {
                setMaxQuestions(amount);
            }

            const selectedQuizzzes = quizzzes.slice(0, maxQuestions).map((quizzze) => ({
                id: quizzze.id,
                question: quizzze.text,
            }));

            const initialAnswers = {};
            selectedQuizzzes.forEach((question) => {
                initialAnswers[question.id] = "";
            });

            setQuestions(selectedQuizzzes);
            setAnswers(initialAnswers);
            setCurrentQuestionIndex(0);
            setAnsweredQuestions([]);
            setAnsweredCount(0);

            closeModal();
        } catch (error) {
            console.error("Error confirming settings:", error);
        }
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
                        Exam Settings
                    </button>
                </div>
                <div className="bg-white p-4 shadow-md rounded-lg mb-6 max-h-96 overflow-y-auto sticky bottom-0">
                    <p className="text-lg">{questions[currentQuestionIndex]?.question || ""}</p>
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
                                        className={`cursor-pointer ${index === currentQuestionIndex ? "font-semibold" : ""} ${isQuestionAnswered(index) ? "text-green-500" : ""}`}
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
                    <h2 className="text-xl font-semibold mb-6">Exam Settings</h2>

                    {/* Part 1: Max Questions */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Max Questions</h3>
                        <input
                            type="number"
                            value={examData?.amount || ""}
                            readOnly
                            className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                        />
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
