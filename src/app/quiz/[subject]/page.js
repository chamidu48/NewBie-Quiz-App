"use client";

import Loader from "@/components/loader/loader";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectQuizBySubject,
  selectSession,
} from "@/store/selectors/quiz-selector";
import { setQuestions } from "@/store/slices/question-slice";
import {
  addToAnswered,
  setCurrentIndex,
  setFinished,
  setScore,
} from "@/store/slices/user-slice";
import { questions } from "@/app/constants/questions";
import { timer } from "@/app/constants/common";

export default function Quiz({ params }) {
  const dispatch = useDispatch();
  const { subject } = React.use(params);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(timer);

  const { currentIndex, score, answered, isFinished } =
    useSelector(selectSession);
  const quizQuestions = useSelector(selectQuizBySubject) || [];
  const currentQuestion = quizQuestions[currentIndex];
  const progress = ((currentIndex + 1) / quizQuestions.length) * 100;

  const handleFetchQuestionsForSubject = () => {
    //API fetch skip for now
    setIsloading(true);
    dispatch(setQuestions({ questions }));
  };

  useEffect(() => {
    if (isFinished) return;
    if (timeLeft === 0) {
      dispatch(setFinished());
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  useEffect(() => {
    if (quizQuestions.length == 0) {
      handleFetchQuestionsForSubject();
    } else {
      setIsloading(false);
    }
  }, [dispatch, quizQuestions]);

  const handleNext = () => {
    const answeredQ = {
      ...quizQuestions[currentIndex],
      userAnswer: selected,
      isCorrect: selected === quizQuestions[currentIndex].answer,
    };
    if (answeredQ.isCorrect) {
      dispatch(setScore());
    }
    dispatch(addToAnswered({ answeredQ }));
    setSelected(null);

    if (currentIndex + 1 < quizQuestions.length) {
      dispatch(setCurrentIndex({ currentIndex: currentIndex + 1 }));
    } else {
      dispatch(setFinished());
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center h-150">
          <Loader />
        </div>
      ) : (
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
                  Questions {currentIndex + 1} of {quizQuestions.length}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-end">
                  <p className="text-4xl font-bold text-white capitalize">
                    {timeLeft}
                  </p>
                  <p className="text-md font-bold text-white capitalize">s</p>
                </div>
                <p className="text-md font-md text-white capitalize">
                  Time-left
                </p>
              </div>

              <div className="flex flex-col items-end">
                <p className="text-4xl font-bold text-white capitalize">
                  {progress}%
                </p>
                <p className="text-md font-md text-white capitalize">
                  Complete
                </p>
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
          {!isFinished ? (
            <>
              <div className="max-w-2xl mx-auto mt-10 p-6 bg-white/20 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">
                  Question {currentIndex + 1} of {quizQuestions.length}
                </h2>
                <p className="mb-6 text-lg">{currentQuestion?.question}</p>

                <div className="space-y-3">
                  {currentQuestion?.options.map((option, idx) => (
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
                  className="mt-6 w-full py-3 bg-yellow-600 text-white font-semibold rounded-lg disabled:bg-gray-400 transition"
                >
                  {currentIndex + 1 === quizQuestions.length
                    ? "Finish"
                    : "Next"}
                </button>
              </div>
            </>
          ) : (
            <div className="px-40">
              {/* stats */}
              <div className=" mt-6 flex justify-between align-center w-full gap-4">
                <div className="w-3/5 p-6 py-12 bg-green-700 rounded-2xl shadow-lg flex flex-col items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-2">
                      Quiz Finished 🎉
                    </h2>
                    <p className="text-xl">
                      Your Score: {score} / {quizQuestions.length}
                    </p>
                    <div className="mt-6">
                      <Link
                        href={"/"}
                        className=" p-3 bg-green-800 text-white font-semibold rounded-lg hover:scale-115 hover:bg-green-900 transition-all duration-300 ease-in-out"
                      >
                        Done
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-2/5 grid grid-cols-2 gap-4 w-full items-center justify-center">
                  <div className="w-full p-6 bg-white/20 rounded-2xl shadow-lg flex justify-between items-center">
                    <div className="text-start">
                      <h2 className="text-3xl font-bold mb-2">Correct</h2>
                      <p className="text-4xl font-bold text-green-500">
                        {score}
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="cyan"
                      className="size-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <div className="w-full p-6 bg-white/20 rounded-2xl shadow-lg flex justify-between items-center">
                    <div className="text-start">
                      <h2 className="text-3xl font-bold mb-2">Wrong</h2>
                      <p className="text-4xl font-bold text-red-500">
                        {quizQuestions.length - score}
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="red"
                      className="size-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <div className="w-full p-6 bg-white/20 rounded-2xl shadow-lg flex justify-between items-center">
                    <div className="text-start">
                      <h2 className="text-3xl font-bold mb-2">Time Taken</h2>
                      <p className="text-4xl font-bold text-blue-500">
                        {timer - timeLeft}s
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="cyan"
                      className="size-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <div className="w-full p-6 bg-white/20 rounded-2xl shadow-lg flex justify-between items-center">
                    <div className="text-start">
                      <h2 className="text-3xl font-bold mb-2">Avg Time</h2>
                      <p className="text-4xl font-bold text-yellow-500">
                        {(timer - timeLeft) / answered.length}s
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="yellow"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      className="size-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* answers */}
              <p className="mt-5 mb-2 text-2xl font-bold">Question Review</p>
              {answered.length > 0 ? (
                <div className="flex flex-col items-center jusity-center gap-2 my-2">
                  {answered.map((quiz, index) => {
                    return (
                      <div
                        key={index}
                        className="p-4 w-full rounded-md bg-white/20"
                      >
                        <p className="font-bold mb-2 flex items-center">
                          {quiz.isCorrect ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="green"
                              className="size-4 me-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="red"
                              className="size-4 me-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          )}
                          Question {index + 1}: {quiz.question}
                        </p>
                        <div className="bg-black p-4 rounded-md">
                          <p className="">Your answer: {quiz.answer}</p>
                          <div className="flex items-center justify-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="green"
                              className="size-4 me-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                            <p className="text-green-500">
                              Correct answer: {quiz.answer}
                            </p>
                          </div>
                          <div className="flex items-center justify-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="yellow"
                              className="size-4 me-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                              />
                            </svg>
                            <p className="text-yellow-500">
                              Reason: {quiz.reason}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  <p className="text-red-500">No questions answered</p>
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
