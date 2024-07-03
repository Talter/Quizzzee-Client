import { Tabs } from "antd";
import React, { useContext, useEffect, useState } from "react";
import {
  HeartOutlined,
  FileDoneOutlined,
  HeartFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import "../../css/MyQuizzzy.css";
import QuizzzyCard from "../../components/layout/quizzzyCard/QuizzzyCard";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

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
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeTab, setActiveTab] = useState("0");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    });
  }, [isScrolling]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <>
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
          onChange={(key) => setActiveTab(key)}
        />
      </div>

      {isScrolling && (
        <MyQuizzzyHeader
          title={
            activeTab === "0" ? (
              <span>
                My Quizzzy <FileDoneOutlined style={{ color: "#EFD59F" }} />
              </span>
            ) : (
              <span>
                My Favorite <HeartFilled style={{ color: "#ffd2f3" }} />
              </span>
            )
          }
          withCreate={activeTab === "0"}
        />
      )}
    </>
  );
}

function MyCreatedQuizzzy(myQuizzzy) {
  const [isFetching, setIsFetching] = useState(true);
  const [myQuizzzies, setMyQuizzzies] = useState([]);
  const { isLoggedIn, userId, token } = useContext(UserContext);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/quizzzy/${userId}/my_quizzzy`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setMyQuizzzies(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn)
      setTimeout(() => {
        fetchData();
        setIsFetching(false);
      }, 100);
    else window.location.href = "/myquizzzy";
  }, []);

  return (
    <>
      <div>
        <span className="ml-6 mr-7 text-blue-500 text-4xl font-bold title">
          My Quizzzy <FileDoneOutlined style={{ color: "#EFD59F" }} />
        </span>
        <span className="lg:float-end">
          <Link
            to="/addquizz"
            className="py-2 px-4 text-xl btn-create bg-subColorBold hover:bg-subColorLight text-white rounded hover:text-white"
          >
            Create new
          </Link>
        </span>
      </div>

      <div>
        {isFetching ? (
          <div className="flex justify-center items-center h-64">
            <LoadingOutlined style={{ fontSize: 24 }} spin />
          </div>
        ) : (
          <section className="mx-5 mt-10 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-16">
            {myQuizzzies.map((mq) => (
              <QuizzzyCard key={mq.id} quizzzy={mq} />
            ))}
          </section>
        )}
      </div>
    </>
  );
}

function MyFavoriteQuizzzy() {
  const [isFetching, setIsFetching] = useState(true);
  const [myFavoriteQuizzzies, setMyFavoriteQuizzzies] = useState([]);

  const { isLoggedIn, userId, token } = useContext(UserContext);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/quizzzy/${userId}/favorite`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setMyFavoriteQuizzzies(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn)
      setTimeout(() => {
        fetchData();
        setIsFetching(false);
      }, 100);
    else window.location.href = "/myquizzzy";
  }, []);

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
            {myFavoriteQuizzzies[0] &&
              myFavoriteQuizzzies[0].favorites.map((mfq) => (
                <QuizzzyCard key={mfq.id} quizzzy={mfq} />
              ))}
          </section>
        )}
      </div>
    </>
  );
}

function MyQuizzzyHeader({ title, withCreate }) {
  return (
    <div className="fixed sm:top-32 md:top-28 lg:top-16">
      <div className="w-screen pt-10 pb-5 px-14 bg-white shadow-lg">
        <span className="mr-7 text-blue-500 text-3xl font-bold title">
          {title}
        </span>
        {withCreate && (
          <span>
            <button className="md:float-end py-2 px-4 btn-create bg-subColorBold hover:bg-subColorLight text-white rounded">
              Create new
            </button>
          </span>
        )}
      </div>
    </div>
  );
}

export default MyQuizzzy;
