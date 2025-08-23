"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSubjects } from "@/store/slices/subjects-slice";
import { subjects } from "./constants/subjects";

export default function Home() {
  const dispatch = useDispatch();


  const handleSaveSubjects = () => {
    dispatch(setSubjects({ subjects }));
  };

  useEffect(() => {
    handleSaveSubjects();
  }, [dispatch]);

  return (
    <>
      <div className="p-5 mx-10">
        <div>
          <p className="text-xl font-bold py-2">Your Progress Overview</p>
          <div className="flex items-start justify-between w-full gap-3">
            <div className="w-3/5 bg-white/20 rounded h-100"></div>
            <div className="w-2/5 flex flex-col gap-3">
              <div className="bg-white/20 rounded h-30"></div>
              <div className="bg-white/20 rounded h-30"></div>
              <div className="bg-white/20 rounded h-30"></div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xl font-bold py-2">Quick Actions</p>
          <div className="flex items-start justify-between w-full gap-3">
            <div className="w-1/4 bg-white/20 rounded h-30"></div>
            <div className="w-1/4 bg-white/20 rounded h-30"></div>
            <div className="w-1/4 bg-white/20 rounded h-30"></div>
            <div className="w-1/4 bg-white/20 rounded h-30"></div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xl font-bold py-2">Recent Activities</p>
          <div className="flex flex-col w-full gap-3">
            <div className="bg-white/20 rounded h-20"></div>
            <div className="bg-white/20 rounded h-20"></div>
            <div className="bg-white/20 rounded h-20"></div>
            <div className="bg-white/20 rounded h-20"></div>
          </div>
        </div>
      </div>
    </>
  );
}
