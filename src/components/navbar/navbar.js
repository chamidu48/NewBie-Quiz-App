"use client"; // needed if using state/hooks

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/firebase/firebase.config";

export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/auth");
  };

  return (
    <nav className="px-10 py-4 flex justify-between items-center shadow-sm">
      <img alt="NewBie Quiz" src="/quiz-logo.png" className=" h-16" />
      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className={`${
            pathName == "/" ? "bg-indigo-500 p-2 rounded-md " : "text-white "
          } font-bold flex gap-1 items-center transition-all duration-300 ease-in-out`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Home
        </Link>
        <Link
          href="/quiz"
          className={`${
            pathName.startsWith("/quiz") ? "bg-indigo-500 p-2 rounded-md" : "text-white "
          } font-bold  flex gap-1 items-center transition-all duration-300 ease-in-out`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
          Quiz
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="p-2 bg-red-500 text-white rounded font-bold "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
