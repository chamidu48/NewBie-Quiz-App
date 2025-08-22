import { slugify } from "@/utils/common";
import Link from "next/link";

export default function QuizPage() {
  const subjects = [
    {
      name: "Science",
      description:
        "Explore the universe through biology, physics, and chemistry",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-12 text-cyan-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          />
        </svg>
      ),
    },
    {
      name: "Math",
      description: "Numbers, equations, and problem-solving for logical minds",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-12 text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12h15m-7.5-7.5v15"
          />
        </svg>
      ),
    },
    {
      name: "History",
      description: "Discover events and people that shaped the world",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-12 text-yellow-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: "Geography",
      description: "Understand Earth, its landscapes, climates, and people",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-12 text-blue-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9
               4.03-9 9 4.03 9 9 9zm0-18v18m9-9H3"
          />
        </svg>
      ),
    },
    {
      name: "Art",
      description: "Express creativity through drawing, painting, and design",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-12 text-pink-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232a3 3 0 0 1 4.243
               4.243L7.5 21H3v-4.5l12.232-11.268z"
          />
        </svg>
      ),
    },
    {
      name: "Computer Science",
      description: "Learn coding, algorithms, and the magic of software",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-12 text-purple-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7h18M3 12h18M3 17h18"
          />
        </svg>
      ),
    },
  ];

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
            <Link key={index} href={`/quiz/${slugify(subject.name.toLowerCase())}`}>
              <div
                key={index}
                className="p-5 rounded-lg bg-white/20 h-60 flex flex-col items-center justify-center border border-transparent hover:border-indigo-500 
              hover:scale-105 hover:bg-indigo-800 transition-all duration-300 ease-in-out cursor-pointer"
              >
                {subject.icon}
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
