"use client"
import { slugify } from "@/utils/common";
import Link from "next/link";
import { useSelector } from "react-redux";
import { subjectIcons } from "@/utils/iconRenderer";
import { selectSubjects } from "@/store/selectors/subject-selector";

export default function QuizPage() {
  const subjects = useSelector(selectSubjects) || []
  return (
    <>
      <div className="flex flex-col items-center justify-start mt-10">
        <p className="text-4xl font-bold text-indigo-500">
          Choose Your Subject
        </p>
        <p className="text-sm mt-1">
          Dive into knowledge across various fields. Select a subject to sharpen
          your skills and test your expertise.
        </p>

        {/* cards */}
        <div className="px-20 mt-10 grid grid-cols-3 gap-4 w-full items-center justify-center">
          {subjects.map((subject, index) => (
            <Link
              key={index}
              href={`/quiz/${slugify(subject.name.toLowerCase())}`}
            >
              <div
                key={index}
                className="p-5 rounded-lg bg-white/20 h-60 flex flex-col items-center justify-center border border-transparent hover:border-indigo-500 
              hover:scale-105 hover:bg-indigo-800 transition-all duration-300 ease-in-out cursor-pointer"
              >
                {subjectIcons[subject.icon]} 
                <p className="font-bold text-2xl mt-4">{subject.name}</p>
                <p className="text-center">{subject.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
