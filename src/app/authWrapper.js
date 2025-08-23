"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/firebase/firebase.config";
import Navbar from "@/components/navbar/navbar";
import Loader from "@/components/loader/loader";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (pathname === "/auth") {
      setLoading(false); // Don't check auth on login page
      return;
    }

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push("/auth");
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [pathname, router]);

  if (loading)
    return (
      <div className="h-[100vh] flex flex-col justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <>
      {pathname !== "/auth" && <Navbar />}
      <main>{children}</main>
    </>
  );
}
