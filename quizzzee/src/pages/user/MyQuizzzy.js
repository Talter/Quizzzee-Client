import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import {
  HeartOutlined,
  FileDoneOutlined,
  HeartFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import "../../css/MyQuizzzy.css";

function MyQuizzzy() {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className="sm:mx-0 xl:mx-20 mt-10">
      <Tabs
        tabPosition={windowDimensions.width < 640 ? "top" : "left"}
        indicator={{
          size: (origin) => origin - 20,
          align: "center",
        }}
        items={[
          {
            label: (
              <div>
                <FileDoneOutlined /> My Quizzzy
              </div>
            ),
            key: "0",
            children: <MyCreatedQuizzzy />,
          },
          {
            label: (
              <div>
                <HeartOutlined /> My Favorite
              </div>
            ),
            key: "1",
            children: <MyFavoriteQuizzzy />,
          },
        ]}
        size="large"
      />
    </div>
  );
}

function MyCreatedQuizzzy(myQuizzzy) {
  const [isFetching, setIsFetching] = useState(true);

  const [myQuizzzies, setMyQuizzzies] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setMyQuizzzies([
        {
          id: "0",
          name: "Sawconed",
          description: "Sawconed",
          author: "Sawconed",
          lastUpdate: "Sawconed",
        },
        {
          id: "1",
          name: "Sawconed",
          description: "Sawconed",
          author: "Sawconed",
          lastUpdate: "Sawconed",
        },
      ]);
      setIsFetching(false);
    }, 3000);
  });

  return (
    <>
      <div className="ml-6 text-blue-500 text-4xl font-bold title">
        My Quizzzy <FileDoneOutlined style={{ color: "#EFD59F" }} />
      </div>

      <div>
        {isFetching ? (
          <div className="flex justify-center items-center h-64">
            <LoadingOutlined style={{ fontSize: 24 }} spin />
          </div>
        ) : (
          <section className="mx-5 mt-10 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-16">
            {myQuizzzies.map((mq) => (
              <a
                className=" rounded-xl  bg-subColor shadow-inner grid grid-rows-2 transition transform hover:scale-105"
                href="/quizzzy/1"
                key={mq.id}
              >
                <div className="min-h-36 text-xl text-white text-center flex items-center justify-center">
                  Quizzzy name
                </div>
                <div className="min-h-36 bg-white border-extraColor border rounded-xl text-black px-4 py-2">
                  <div>Description: ABC</div>
                  <div>Author: ABC</div>
                  <div className="mt-12 text-gray-400">Last update: ABC</div>
                </div>
              </a>
            ))}
          </section>
        )}
      </div>
    </>
  );
}

function MyFavoriteQuizzzy(myFavoriteQuizzzy) {
  const [isFetching, setIsFetching] = useState(true);

  const [myFavoriteQuizzzies, setMyFavoriteQuizzzies] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setMyFavoriteQuizzzies([
        {
          id: "0",
          name: "Sawconed",
          description: "Sawconed",
          author: "Sawconed",
          lastUpdate: "Sawconed",
        },
        {
          id: "1",
          name: "Sawconed",
          description: "Sawconed",
          author: "Sawconed",
          lastUpdate: "Sawconed",
        },
        {
          id: "2",
          name: "Sawconed",
          description: "Sawconed",
          author: "Sawconed",
          lastUpdate: "Sawconed",
        },
        {
          id: "3",
          name: "Sawconed",
          description: "Sawconed",
          author: "Sawconed",
          lastUpdate: "Sawconed",
        },
        {
          id: "4",
          name: "Sawconed",
          description: "Sawconed",
          author: "Sawconed",
          lastUpdate: "Sawconed",
        },
      ]);
      setIsFetching(false);
    }, 3000);
  });

  return (
    <>
      <div className="ml-6 text-blue-500 text-4xl font-bold title">
        My Favorite <HeartFilled style={{ color: "#ffd2f3" }} />
      </div>

      <div>
        {isFetching ? (
          <div className="flex justify-center items-center h-64">
            <LoadingOutlined style={{ fontSize: 24 }} spin />
          </div>
        ) : (
          <section className="mx-5 mt-10 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-16">
            {myFavoriteQuizzzies.map((mfq) => (
              <a
                className=" rounded-xl  bg-subColor shadow-inner grid grid-rows-2 transition transform hover:scale-105"
                href="/quizzzy/1"
                key={mfq.id}
              >
                <div className="min-h-36 text-xl text-white text-center flex items-center justify-center">
                  Quizzzy name
                </div>
                <div className="min-h-36 bg-white border-extraColor border rounded-xl text-black px-4 py-2">
                  <div>Description: ABC</div>
                  <div>Author: ABC</div>
                  <div className="mt-12 text-gray-400">Last update: ABC</div>
                </div>
              </a>
            ))}
          </section>
        )}
      </div>
    </>
  );
}

const Content = () => {
  return (
    <a
      className=" rounded-xl  bg-subColor shadow-inner grid grid-rows-2 transition transform hover:scale-105"
      href="/quizzzy/1"
    >
      <div className="min-h-36 text-xl text-white text-center flex items-center justify-center">
        Quizzzy name
      </div>
      <div className="min-h-36 bg-white border-extraColor border rounded-xl text-black px-4 py-2">
        <div>Description: ABC</div>
        <div>Author: ABC</div>
        <div className="mt-12 text-gray-400">Last update: ABC</div>
      </div>
    </a>
  );
};

export default MyQuizzzy;
