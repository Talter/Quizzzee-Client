import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  CaretLeftFilled,
  CaretRightOutlined,
  DownloadOutlined,
  HeartFilled,
  StepForwardOutlined,
  SwapOutlined,
  ShareAltOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import Content from "../../components/quizzy/content";
import Tag from "../../components/quizzy/tag";
import Related from "../../components/quizzy/related";
import QuestionSetOverview from "../../components/quizzy/questionSetOverview";
import Sharing from "../../components/quizzy/sharing";
import Report from "../../components/quizzy/report";

function Quizzy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [quizzzies, setQuizzzies] = useState();
  const [counter, setCounter] = useState(0);
  const [isSharing, setIsSharing] = useState(false);
  const [isReport, setIsReport] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/quizzzy/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setData(data);
        setQuizzzies(data.quizzzes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleExamClick = () => {
    navigate(`/exam?id=${id}`);
  };

  return (
    <div className="bg-[#F6F6F6] min-h-screen py-12">
      <div className=" mb-12 px-12 font-semibold text-2xl">
        {data && data.title}
      </div>
      <section>
        <div className={"pb-12 px-12 flex overflow-hidden"}>
          {quizzzies &&
            quizzzies.map((quizzzy) => (
              <motion.div
                className={"min-w-full"}
                animate={{ x: -counter + "%" }}
                transition={{ type: "tween" }}
              >
                <Content quizzzy={quizzzy} />
              </motion.div>
            ))}
        </div>
        <div className="flex justify-evenly item-center w-2/3">
          <button
            className=" size-12 bg-gray-200 text-lg flex justify-center items-center rounded-full transform transition hover:scale-105 active:scale-90 active:bg-gray-400  active:text-sm "
            onClick={() => {
              if (counter !== 0) setCounter(counter - 100);
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
              if (counter !== (quizzzies.length * 100 - 100)) setCounter(counter + 100);
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

        <div
          className="w-36 h-12 bg-subColor flex justify-center items-center text-2xl rounded-lg text-white transform transition hover:scale-105 active:scale-90 active:bg-subColorBold"
          onClick={() => setIsSharing(true)}
        >
          <ShareAltOutlined />
        </div>

        <div
          className="w-36 h-12 bg-subColor flex justify-center items-center text-2xl rounded-lg text-white transform transition hover:scale-105 active:scale-90 active:bg-subColorBold"
          onClick={() => setIsReport(true)}
        >
          <ExclamationCircleFilled />
        </div>
      </section>
      <section>
        <div className="bg-white max-w-full min-h-96 mx-24 mt-12 rounded-lg shadow-lg py-12 px-6">
          <div className="h-24 px-12 flex items-center gap-4">
            <div className="bg-gray-300 size-16 rounded-full" />
            <div className="grid grid-rows-2">
              <div className=" font-semibold text-lg flex justify-center">
                {data && data.createdBy.username}
              </div>
              <div className=" text-sm flex justify-center text-gray-700">
                {data && data.updatedAt.substring(0, 10)}
              </div>
            </div>
          </div>
          <div className=" px-12 py-3">
            <span className="line-clamp-5">{data && data.description}</span>
          </div>
          <div className="px-24 py-3 text-lg font-semibold">Tags:</div>
          <div className="px-16 py-2 grid grid-cols-6 grid-flow-row gap-10">
            {data && data.tags.map((tag) => <Tag name={tag} />)}
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center gap-24 pt-12">
        <div className="select-none bg-subColor w-48 h-16 rounded-lg flex justify-center items-center text-lg text-white font-semibold transform transition hover:scale-105 active:scale-90 active:bg-subColorBold hover:cursor-pointer"
          onClick={handleExamClick}
        >
          Exam
        </div>
        <div className="select-none bg-subColor w-48 h-16 rounded-lg flex justify-center items-center text-lg text-white font-semibold transform transition hover:scale-105 active:scale-90 active:bg-subColorBold hover:cursor-pointer">
          ABC
        </div>
      </section>
      <section>
        <div className="bg-white max-w-full min-h-96 mx-24 mt-12 rounded-lg shadow-lg py-12 px-6">
          <div className="text-2xl font-semibold pl-4">Related quizzy</div>
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
          {quizzzies &&
            quizzzies.map((quizzzy) => (
              <QuestionSetOverview quizzzy={quizzzy} />
            ))}
        </div>
      </section>

      {isSharing && (
        <Sharing setIsSharing={setIsSharing} url={window.location.href} />
      )}
      {isReport && <Report setIsReport={setIsReport} quizzzyId={id} />}
    </div>
  );
}

export default Quizzy;
