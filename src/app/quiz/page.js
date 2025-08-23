"use client";
import { useRouter } from "next/navigation";
import { slugify } from "@/utils/common";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { subjectIcons } from "@/utils/iconRenderer";
import { selectSubjects } from "@/store/selectors/subject-selector";
import { clearSession, setCurrentQuizSubject } from "@/store/slices/user-slice";

export default function QuizPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const subjects = useSelector(selectSubjects) || [];

  const handleSelectSubject = (subject) => {
    const subjectSlug = slugify(subject);
    dispatch(setCurrentQuizSubject({ subject: subjectSlug }));
    dispatch(clearSession());
    router.push(`/quiz/${subjectSlug}`);
  };

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
            <button
              key={index}
              onClick={() => handleSelectSubject(subject.name.toLowerCase())}
            >
              <div
                key={index}
                className="p-5 rounded-lg bg-white/20 h-60 flex flex-col items-center justify-center border border-transparent hover:border-indigo-500 
              hover:scale-105 hover:bg-indigo-800 transition-all duration-300 ease-in-out cursor-pointer"
              >
                {subjectIcons[subject.name]}
                <p className="font-bold text-2xl mt-4 capitalize">{subject.name}</p>
                <p className="text-center">{subject.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
