import { Questions } from "./data";
import React, { useState, useEffect } from "react";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleToggle = (id) => {
    setIsVisible(isVisible ? !isVisible : id);
  };

  const handleOptions = (questionId, optionIndex, event) => {
    const question = Questions.find((q) => q.id === questionId);
    if (question.Correct === optionIndex) {
      setIsCorrect(true);
      setIsVisible(questionId);
      console.log("correct");
      event.target.classList.add("bg-green-500");
      setIsFinished(true);

      const options = event.target.parentNode.childNodes;
      options.forEach((option, index) => {
        if (index !== optionIndex) {
          option.disabled=true;
          if(option.classList.contains("bg-red-500")){
            option.classList.remove("bg-red-500");
          }
        }
      });
    } else {
      console.log("wrong");
      event.target.classList.add("bg-red-500");
    }
  };

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsVisible(null);
  };

  const handleToggleDarkMode = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div
      className={`${
        isDark ? "bg-black text-white" : "bg-gray-100 text-black"
      }  flex flex-col items-center h-screen`}
    >
      <div
        className="fixed top-0 right-0 m-4 cursor-pointer inline-flex"
        onClick={handleToggleDarkMode}
      >
        {isDark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            style={{ transform: "rotate(40deg)" }}
          >
            <mask id="mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <circle cx="12" cy="4" r="9" fill="black" />
            </mask>
            <circle fill="black" cx="12" cy="12" r="9" mask="url(#mask)" />
            {/* <g stroke="currentColor">
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </g> */}
          </svg>
        )}
      </div>
      <div
        className={`${
          isDark ? "bg-neutral-900 text-white" : " text-black bg-amber-100"
        }  border-2 border-neutral-400  p-6 rounded-md m-auto mb-0 sm:w-[50vw]`}
        key={Questions[currentQuestionIndex].id}
      >
        <h2 className="vertical-center m-2 mb-6">
          <span className="border-2 border-neutral-400  vertical-top px-2 py-[0.12rem] rounded-full text-[0.9rem] font-bold">
            {Questions[currentQuestionIndex].id}
          </span>
          &nbsp;&nbsp;&nbsp;
          <span className="text-2xl font-bold">
            {Questions[currentQuestionIndex].Ques}
          </span>
        </h2>
        <div className="">
          {Questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={(event) =>
                handleOptions(Questions[currentQuestionIndex].id, index, event)
              }
              className="pl-4 mb-5 border-2 border-neutral-400 rounded-xl py-2 w-full   hover:shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
            >
              {option}
            </button>
          ))}
        </div>
        <div key={Questions[currentQuestionIndex].id}>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === Questions.length - 1}
            className="text-white bg-orange-600 button1"
          >
            Next
          </button>
        </div>
      </div>
      <div
        key={Questions[currentQuestionIndex]}
        className={`${
          isVisible ? "border-2 border-neutral-400 " : ""
        } m-auto mt-3 p-5 rounded-md  `}
      >
        <button
          onClick={() => handleToggle(Questions[currentQuestionIndex].id)}
          className={`${
            isVisible ? "w-[57vw] sm:w-[47vw]" : "w-[60vw] sm:w-[50vw]"
          } border-none border-0  rounded-md text-white bg-[#1a1a1a] button1`}
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
