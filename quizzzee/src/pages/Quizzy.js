import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  CaretLeftFilled,
  CaretRightOutlined,
  DownloadOutlined,
  HeartFilled,
  StepForwardOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import Content from "../components/quizzy/content";
import Tag from "../components/quizzy/tag";
import Related from "../components/quizzy/related";
import QuestionSetOverview from "../components/quizzy/questionSetOverview";

function Quizzy() {
  const { id } = useParams();
  const [counter, setCounter] = useState(0);

  return (
    <div className="bg-[#F6F6F6] min-h-screen py-12">
      <div className=" mb-12 px-12 font-semibold text-2xl">
        {id} Numa numa ei
      </div>
      <section>
        <div className={"pb-12 px-12 flex overflow-hidden"}>
          <motion.div
            className={"min-w-full"}
            animate={{ x: -counter + "%" }}
            transition={{ type: "tween" }}
          >
            <Content />
          </motion.div>
          <motion.div
            className={"min-w-full"}
            animate={{ x: -counter + "%" }}
            transition={{ type: "tween" }}
          >
            <Content />
          </motion.div>
          <motion.div
            className={"min-w-full"}
            animate={{ x: -counter + "%" }}
            transition={{ type: "tween" }}
          >
            <Content />
          </motion.div>
        </div>
        <div className="flex justify-evenly item-center w-2/3">
          <button
            className=" size-12 bg-gray-200 text-lg flex justify-center items-center rounded-full transform transition hover:scale-105 active:scale-90 active:bg-gray-400  active:text-sm "
            onClick={() => {
              setCounter(counter - 100);
            }}
          >
            <CaretLeftFilled />
          </button>
          <div className="flex justify-center items-center text-lg ">
            {counter / 100 + 1}
          </div>
          <button
            className="size-12 bg-gray-200 text-lg flex justify-center items-center rounded-full transform transition hover:bg-gray-300 hover:scale-105 active:bg-gray-400 active:scale-90 active:text-sm"
            onClick={() => {
              setCounter(counter + 100);
            }}
          >
            <CaretRightOutlined />
          </button>
        </div>
      </section>
      <section className="flex justify-evenly items-center pt-12 px-12">
        <div className="w-36 h-12 bg-subColor flex justify-center items-center text-2xl rounded-lg text-white transform transition hover:scale-105 active:scale-90 active:bg-subColorBold hover:cursor-pointer">
          <StepForwardOutlined />
        </div>
        <div className="w-36 h-12 bg-subColor flex justify-center items-center text-2xl rounded-lg text-white transform transition hover:scale-105 active:scale-90 active:bg-subColorBold">
          <SwapOutlined />
        </div>
        <div className="w-36 h-12 bg-subColor flex justify-center items-center text-2xl rounded-lg text-white transform transition hover:scale-105 active:scale-90 active:bg-subColorBold">
          <DownloadOutlined />
        </div>
        <div className="w-36 h-12 bg-subColor flex justify-center items-center text-2xl rounded-lg text-white transform transition hover:scale-105 active:scale-90 active:bg-subColorBold">
          <HeartFilled />
        </div>
      </section>
      <section>
        <div className="bg-white max-w-full min-h-96 mx-24 mt-12 rounded-lg shadow-lg py-12 px-6">
          <div className="h-24 px-12 flex items-center gap-4">
            <div className="bg-gray-300 size-16 rounded-full" />
            <div className="grid grid-rows-2">
              <div className=" font-semibold text-lg flex justify-center">
                Mai Nhat DoAn
              </div>
              <div className=" text-sm flex justify-center text-gray-700">
                xx/xx/xxxx
              </div>
            </div>
          </div>
          <div className=" px-12 py-3">
            <span className="line-clamp-5">
              lorem is lorem is lorem is lorem is lorem islorem islorem islorem
              islorem islorem islorem islorem islorem islorem islorem islorem
              islorem is lorem is lorem is lorem is lorem is lorem islorem
              islorem islorem islorem islorem islorem islorem islorem islorem
              islorem islorem islorem is lorem is lorem is lorem is lorem is
              lorem islorem lorem is lorem is lorem is lorem is lorem islorem
              islorem islorem islorem islorem islorem islorem islorem islorem
              islorem islorem islorem is lorem is lorem is lorem is lorem is
              lorem islorem islorem islorem islorem islorem islorem islorem
              islorem islorem islorem islorem islorem is lorem is lorem is lorem
              is lorem is lorem islorem islorem islorem islorem islorem islorem
              islorem islorem islorem islorem islorem islorem is lorem is lorem
              is lorem is lorem is lorem islorem islorem islorem islorem islorem
              islorem islorem islorem islorem islorem islorem islorem is
            </span>
          </div>
          <div className="px-24 py-3 text-lg font-semibold">Tags:</div>
          <div className="px-16 py-2 grid grid-cols-6 grid-flow-row gap-10">
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center gap-24 pt-12">
        <div className="select-none bg-subColor w-48 h-16 rounded-lg flex justify-center items-center text-lg text-white font-semibold transform transition hover:scale-105 active:scale-90 active:bg-subColorBold hover:cursor-pointer">
          ABC
        </div>
        <div className="select-none bg-subColor w-48 h-16 rounded-lg flex justify-center items-center text-lg text-white font-semibold transform transition hover:scale-105 active:scale-90 active:bg-subColorBold hover:cursor-pointer">
          ABC
        </div>
      </section>
      <section>
      <div className="bg-white max-w-full min-h-96 mx-24 mt-12 rounded-lg shadow-lg py-12 px-6">
          <div className="text-2xl font-semibold pl-4">
            Related quizzy
          </div>
          <div className="grid grid-cols-4 grid-flow-rows gap-10 px-10 pt-12">
            <Related />
            <Related />
            <Related />
            <Related />
            <Related />
            <Related />
          </div>
        </div>
      </section>
      <section>
          <div className=" pt-24 px-36 font-semibold text-2xl">
            All question in this quizzy
          </div>
          <div className="grid grid-flow-row gap-10 px-48 pt-12">
            <QuestionSetOverview />
            <QuestionSetOverview />
            <QuestionSetOverview />
          </div>
      </section>
    </div>
  );
}

export default Quizzy;
