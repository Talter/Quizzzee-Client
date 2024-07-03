import React, { useContext, useEffect, useState } from "react";
import "../../css/AddQuizz.css";
import { UserContext } from "../../context/UserContext";
// import defaultImage from "../../images/default/picture-default.png";

const AddQuizz = () => {
  // const [questions, setQuestions] = useState([
  //     { text1: '', text2: '', image: null, imageUploaded: false },
  //     { text1: '', text2: '', image: null, imageUploaded: false },
  //     { text1: '', text2: '', image: null, imageUploaded: false },
  // ]);
  const { isLoggedIn, userId, token } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/";
    }
  });

  const [questions, setQuestions] = useState([
    { text1: "", text2: "" },
    { text1: "", text2: "" },
    { text1: "", text2: "" },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    questions: questions.map(() => ({ text1: "", text2: "" })),
  });
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const subjects = [
    "Math",
    "Literature",
    "Science",
    "History",
    "Geography",
    "Art",
    "Music",
    "Physics",
  ];
  const [isPrivate, setIsPrivate] = useState(false);
  const handleQuestionChange = (index, key, value) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;
    setQuestions(newQuestions);

    // Clear error when the user starts typing
    const newErrors = { ...errors };
    newErrors.questions[index][key] = "";
    setErrors(newErrors);
  };

  const handleAddQuestion = () => {
    // setQuestions([...questions, { text1: '', text2: '', image: null, imageUploaded: false }]);
    setQuestions([...questions, { text1: "", text2: "" }]);

    setErrors({
      ...errors,
      questions: [...errors.questions, { text1: "", text2: "" }],
    });
  };

  // const handleFileChange = (index, event) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //         const newQuestions = [...questions];
  //         newQuestions[index].image = file;
  //         newQuestions[index].imageUploaded = true;
  //         setQuestions(newQuestions);
  //     }
  // };

  const handleDeleteQuestion = (index) => {
    if (questions.length > 2) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
      const newErrors = { ...errors };
      newErrors.questions = newErrors.questions.filter((_, i) => i !== index);
      setErrors(newErrors);
    } else {
      alert("You must have at least 2 questions.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {
      title: "",
      description: "",
      questions: questions.map(() => ({ text1: "", text2: "" })),
    };
    let valid = true;

    if (!title) {
      newErrors.title = "Title is required";
      valid = false;
    }

    if (!description) {
      newErrors.description = "Description is required";
      valid = false;
    }

    questions.forEach((question, index) => {
      if (!question.text1) {
        newErrors.questions[index].text1 = "Question is required";
        valid = false;
      } else if (!question.text2) {
        newErrors.questions[index].text1 = "Answer is required";
        valid = false;
      }
    });

    setErrors(newErrors);

    if (!valid) {
      return;
    }

    const quizzzes = questions.map((question) => ({
      text: question.text1,
      answer_fc: question.text2,
      // image: question.image ? URL.createObjectURL(question.image) : null,
    }));

    const quizData = {
      createdBy: userId,
      title,
      description,
      quizzzes: quizzzes,
      tags: selectedSubjects,
      isPrivate,
    };
    console.log(JSON.stringify(quizData));

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/quizzzy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(quizData),
      });

      if (response.ok) {
        console.log("Quiz saved successfully!");
      } else {
        console.error("Failed to save quiz");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="quiz-page">
      <form className="quiz-container" onSubmit={handleSubmit}>
        <h2 className="quiz-title">Quizzzeefy your Knowledge</h2>
        <div className="form-group title-form">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span>
            {errors.title && (
              <div className="error-message">{errors.title}</div>
            )}
          </span>
        </div>
        <div className="form-group describe-form">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <span>
            {errors.description && (
              <div className="error-message">{errors.description}</div>
            )}
          </span>
        </div>
        <div className="form-group describe-form">
          <label>Tags:</label>
          <div className="grid grid-cols-4 grid-flow-row gap-4">
            {selectedSubjects.map((subject, index) => (
              <div
                className=" cursor-pointer bg-subColor py-3 px-5 mx-3 rounded-lg select-none transform transition hover:bg-red-500 hover:scale-105 active:scale-90"
                key={"subject" + index}
                onClick={() => {
                  const update = selectedSubjects.filter(
                    (item) => item !== subject
                  );
                  setSelectedSubjects(update);
                }}
              >
                {subject}
              </div>
            ))}
          </div>
          <select
            className="rounded-lg border border-black py-4 px-5"
            onChange={(e) => {
              if (!selectedSubjects.includes(e.target.value))
                setSelectedSubjects((prevs) => [...prevs, e.target.value]);
            }}
            defaultValue={""}
          >
            <option value="" disabled>
              Please select a subject
            </option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          
          <div>Publicity:</div>
          <div className="pl-4 font-semibold text-base">I want my Quizzzy to be <span className={"py-2 px-5 rounded-lg select-none cursor-pointer " + (isPrivate ? "bg-red-300" : "bg-green-300")} onClick={() => {setIsPrivate(!isPrivate)}}>{isPrivate ? "Private" : "Public" }</span></div>
          <span>
            {errors.description && (
              <div className="error-message">{errors.description}</div>
            )}
          </span>
        </div>
        {questions.map((question, index) => (
          <div className="form-group question-group" key={index}>
            <label>Question {index + 1}:</label>
            <div className="question-inputs">
              <div className="txt-input-quizz">
                <input
                  type="text"
                  placeholder="Question"
                  value={question.text1}
                  onChange={(e) =>
                    handleQuestionChange(index, "text1", e.target.value)
                  }
                />
                {errors.questions[index].text1 && (
                  <div className="error-message">
                    {errors.questions[index].text1}
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Answer"
                  value={question.text2}
                  onChange={(e) =>
                    handleQuestionChange(index, "text2", e.target.value)
                  }
                />
              </div>
              {/* <div className="img-quizz-container">
                                <img
                                    src={question.image ? URL.createObjectURL(question.image) : defaultImage}
                                    alt=""
                                    className="img-quizz-placeholder"
                                />
                                <label className={`custom-file-upload ${question.imageUploaded ? 'hide' : ''}`}>
                                    <span>Upload</span>
                                    <input
                                        type="file"
                                        className="img-quizz"
                                        onChange={(e) => handleFileChange(index, e)}
                                    />
                                </label>
                            </div> */}
              <button
                type="button"
                className="delete-question-btn"
                onClick={() => handleDeleteQuestion(index)}
                disabled={questions.length <= 2}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="btn-div">
          <button
            type="button"
            className="add-question-btn"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
      <div className="setting-page-cloud"></div>
      <div className="setting-page-cloud-1"></div>
      <div className="setting-page-cloud-2"></div>
    </div>
  );
};

export default AddQuizz;
