"use client"; // needed if using state/hooks

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth"); 
  };

  return (
    <nav className="bg-indigo-500 px-6 py-4 flex justify-center items-center shadow-md">

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-gray-800 dark:text-gray-100 fw-bold hover:underline">
          Home
        </Link>
        <Link href="/quiz" className="text-gray-800 dark:text-gray-100 hover:underline">
          Quiz
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
