"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/components/navbar/navbar";
import { authCheck } from "../utils/authCheck";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/auth" && !authCheck()) {
      router.push("/auth");
    }
  }, [pathname, router]);

  return (
    <>
      {pathname !== "/auth" && <Navbar />}
      <main>{children}</main>
    </>
  );
}
