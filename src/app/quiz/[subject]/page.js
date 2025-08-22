"use client";

import { questions } from "@/app/constants/questions";
import { useState } from "react";

export default function Quiz({ params }) {
  const { subject } = params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const scienceQuestions = questions[0].questions;
  const currentQuestion = scienceQuestions[currentIndex];
  const progress = ((currentIndex+1) / scienceQuestions.length) * 100;

  const handleNext = () => {
    if (selected === currentQuestion.answer) {
      setScore(score + 1);
    }

    setSelected(null);

    if (currentIndex + 1 < scienceQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <>
      <div className="px-40 py-10 bg-indigo-800 flex flex-col items-between justify-center ">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-4xl font-bold text-white capitalize">
              {subject}
            </p>

            <p className="text-md font-medium flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="red"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
              </svg>
              Questions {currentIndex + 1} of {scienceQuestions.length}
            </p>
          </div>

          <div className="flex flex-col items-end">
            <p className="text-4xl font-bold text-white capitalize">{progress}%</p>
            <p className="text-md font-md text-white capitalize">Complete</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-gray-300 rounded-full h-4 mt-6">
          <div
            className="h-4 rounded-full transition-all duration-500 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white/20 rounded-2xl shadow-lg">
        {!isFinished ? (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Question {currentIndex + 1} of {scienceQuestions.length}
            </h2>
            <p className="mb-6 text-lg">{currentQuestion.question}</p>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <label
                  key={idx}
                  className={`block p-3 rounded-lg border cursor-pointer transition 
                  ${
                    selected === option
                      ? "bg-indigo-500 text-white"
                      : "bg-white text-gray-500 font-semibold hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selected === option}
                    onChange={() => setSelected(option)}
                    className="hidden"
                  />
                  {option}
                </label>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!selected}
              className="mt-6 w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg disabled:bg-gray-400 transition"
            >
              {currentIndex + 1 === scienceQuestions.length ? "Finish" : "Next"}
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Quiz Finished 🎉</h2>
            <p className="text-xl">
              Your Score: {score} / {scienceQuestions.length}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
