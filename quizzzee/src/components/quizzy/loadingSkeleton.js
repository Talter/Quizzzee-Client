import { Skeleton } from "antd";
import React from "react";

const QuizzzySkeleton = () => {
  return (

    <div
      className=" rounded-xl bg-gray-200 shadow-inner grid grid-rows-2 transition transform hover:scale-105 active:scale-90"
    >
      <div className="min-h-36 text-2xl text-white text-center flex items-center justify-center font-bold">
        <Skeleton.Input active size="small" />
      </div>
      <div className="min-h-36 bg-white border-gray border rounded-xl px-4 py-2">
        <Skeleton active />
        <div className="mt-7 text-gray-400">
          <Skeleton.Input active={true} size="small" />
        </div>
      </div>
    </div>
  )
}

export default QuizzzySkeleton;
