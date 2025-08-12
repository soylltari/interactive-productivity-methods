import React from "react";

export default function Quiz() {
  return (
    <div className="flex flex-col justify-center items-center text-center h-[calc(100vh-5rem)] md:h-[calc(100vh-56px)] px-10 gap-8">
      <div className="space-y-2">
        <h1>Do you often procrastinate on tasks?</h1>
        <p className="text-yellow-400">Question 1/3</p>
      </div>
      <div className="space-y-6 flex flex-col items-center">
        <div className="main-gradient p-[2px] rounded-3xl w-fit">
          <button className="bg-gray-50 rounded-[1.4rem] px-6 py-4 cursor-pointer text-lg">
            Yes, I miss deadlines and leave everything till the last minute.
          </button>
        </div>
        {/* Temporary elements */}
        <div className="main-gradient p-[2px] rounded-3xl w-fit">
          <button className="bg-gray-50 rounded-[1.4rem] px-6 py-4 cursor-pointer text-lg">
            Sometimes, but I work gradually.
          </button>
        </div>
        <div className="main-gradient p-[2px] rounded-3xl w-fit">
          <button className="bg-gray-50 rounded-[1.4rem] px-6 py-4 cursor-pointer text-lg">
            No, I finish tasks on time.
          </button>
        </div>
      </div>
    </div>
  );
}
