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
    <div className=" flex  align-middle   flex-col  items-center h-screen ">
      <div
        className="border-2 border-white  p-6 rounded-md m-auto mb-0 sm:w-[50vw]"
        key={Questions[currentQuestionIndex].id}
      >
        <h2 className="vertical-center m-2 mb-6">
          <span className="border-2 border-white  vertical-top px-2 py-[0.12rem] rounded-full text-[0.9rem] font-bold">
            {Questions[currentQuestionIndex].id}
          </span>
          &nbsp;&nbsp;&nbsp;
          <span className="text-2xl font-bold">
            {Questions[currentQuestionIndex].Ques}
          </span>
        </h2>
        <div className="">
          {Questions[currentQuestionIndex].options.map((option, index) => (
            <p
              key={index}
              onClick={(event) =>
                handleOptions(Questions[currentQuestionIndex].id, index, event)
              }
              className="pl-4 mb-5 border-2 border-white rounded-xl py-2 text-lg"
            >
              {option}
            </p>
          ))}
        </div>
        <div key={Questions[currentQuestionIndex].id}>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === Questions.length - 1}
            className="font-bold mt-3"
          >
            Next
          </button>
        </div>
      </div>
      <div
        key={Questions[currentQuestionIndex]}
        className={`${
          isVisible ? "border-2 border-white" : ""
        } m-auto mt-3 p-3 rounded-md`}
      >
        <button
          onClick={() => handleToggle(Questions[currentQuestionIndex].id)}
          className={`${
            isVisible ? "w-[57vw] sm:w-[47vw]" : "w-[60vw] sm:w-[50vw]"
          } border-none border-0  rounded-md`}
        >
          {isVisible ? "Hide" : "show"} Para
        </button>
        {isVisible === Questions[currentQuestionIndex].id && (
          <p className="p-3">
            {Questions[currentQuestionIndex].ans}
            {isVisible ? "hide" : "show"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
