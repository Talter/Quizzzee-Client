import React from 'react'

const EassayType = ({ result, questions, currentQuestionIndex, answers, handleInputChange, handleNextQuestion, handlePreviousQuestion }) => {
    const Cap = (string) => {
      console.log(string);
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    if (!result) {
      return (
        <section>
          <div className="flex items-center justify-between mt-4">
            <input
              type="text"
              className="border border-gray-300 px-4 py-2 rounded-lg flex-1 mr-4"
              placeholder="Your answer"
              value={
                questions[currentQuestionIndex]
                  ? answers[questions[currentQuestionIndex].id]
                  : ""
              }
              onChange={handleInputChange}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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
          <div className="flex items-center justify-between mt-4">
            <input
              type="text"
              className="border border-gray-300 px-4 py-2 rounded-lg flex-1 mr-4"
              value={
                "Your answer: " + (Cap(answers[questions[currentQuestionIndex].id].trim()))
              }
              readOnly
            />
          </div>
          {
            result.checkedAnswers[currentQuestionIndex].answer_fc && (
              <div className="flex items-center justify-between mt-4">
            <input
              type="text"
              className={ "border border-gray-300 px-4 py-2 rounded-lg flex-1 mr-4 " } 
              value={
                "Correct answer: " + (Cap(result.checkedAnswers[currentQuestionIndex].answer_fc))
              }
              readOnly
            />
          </div>
            )
          }
          
          <div className="flex items-evenly justify-between mt-6">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handlePreviousQuestion}
            >
              Previous Question
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          </div>
        </section>
      );
    }
  };
  

export default EassayType