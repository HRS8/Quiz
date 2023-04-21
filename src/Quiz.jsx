import { Questions } from "./data";
import React, { useState, useEffect } from "react";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleToggle = (id) => {
    setIsVisible(isVisible ? !isVisible : id);
  };

  const handleOptions = (questionId, optionIndex, event) => {
    const question = Questions.find((q) => q.id === questionId);
    if (question.Correct === optionIndex) {
      setIsCorrect(true);
      setIsVisible(questionId);
      console.log("correct");
      event.target.classList.add("text-green-500");

      const options = event.target.parentNode.childNodes;
      options.forEach((option, index) => {
        if (index !== optionIndex) {
          option.classList.add("text-white");
        }
      });
    } else {
      console.log("wrong");
      event.target.classList.add("text-red-500");
    }
  };

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsVisible(null);
  };

  return (
    <div className=" flex justify-center items-center align-middle  h-screen ">
      <div
        className="border-2 border-white  p-6 rounded-md m-auto sm:w-[50vw]"
        key={Questions[currentQuestionIndex].id}
      >
        <h2 className="vertical-center m-2">
          <span className="border-2 border-white rounded-lg p-1">{Questions[currentQuestionIndex].id}</span>&nbsp;&nbsp;&nbsp;
          {Questions[currentQuestionIndex].Ques}
        </h2>
        <div className="">
          {Questions[currentQuestionIndex].options.map((option, index) => (
            <p
              key={index}
              onClick={(event) =>
                handleOptions(Questions[currentQuestionIndex].id, index, event)
              }
              className="ml-10"
            >
              {option}
            </p>
          ))}
        </div>
        <div key={Questions[currentQuestionIndex]}>
          <button
            onClick={() => handleToggle(Questions[currentQuestionIndex].id)}
          >
            {isVisible ? "Hide" : "show"} Para
          </button>
          {isVisible === Questions[currentQuestionIndex].id && (
            <p>
              {Questions[currentQuestionIndex].ans}
              {isVisible ? "hide" : "show"}
            </p>
          )}
        </div>
        <div key={Questions[currentQuestionIndex].id}>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === Questions.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
