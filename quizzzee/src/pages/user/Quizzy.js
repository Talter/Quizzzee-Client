import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CaretLeftFilled,
  CaretRightOutlined,
  DownloadOutlined,
  HeartFilled,
  StepForwardOutlined,
  SwapOutlined,
  ShareAltOutlined,
  ExclamationCircleFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import Content from "../../components/quizzy/content";
import Tag from "../../components/quizzy/tag";
import QuizzzyCard from "../../components/layout/quizzzyCard/QuizzzyCard";
import QuestionSetOverview from "../../components/quizzy/questionSetOverview";
import Sharing from "../../components/quizzy/sharing";
import Report from "../../components/quizzy/report";
import { UserContext } from "../../context/UserContext";
import QuizzzySkeleton from "../../components/quizzy/loadingSkeleton";

function Quizzy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, userId, token, addFavorites, favorites } =
    useContext(UserContext);
  const [data, setData] = useState();
  const [quizzzies, setQuizzzies] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isSharing, setIsSharing] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [isLoadingQuizzzy, setIsLoadingQuizzzy] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDownloadPopupVisible, setIsDownloadPopupVisible] = useState(false);
  const [related, setRelated] = useState();
  const [tags, setTags] = useState();
  const popupRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/quizzzy/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
        setQuizzzies(data.quizzzes);
        setTags(data.tags);
        setTimeout(() => {
          setIsLoadingQuizzzy(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async (tags) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/quizzzy`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data2 = await response.json();
        let array = [];
        data2.forEach((d) => {
          const set = new Set(tags);
          for (const elem of d.tags) {
            if (set.has(elem)) {
              array.push(d);
              return;
            }
          }
        });
        setRelated(array);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (tags) {
      fetchData(tags);
    }
  }, [data]);

  useEffect(() => {
    if (favorites.includes(id)) {
      setIsFavorite(true);
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/quizzzy/${userId}/favorite`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        addFavorites(data);
        if (data.includes(id)) setIsFavorite(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userId) {
      fetchData();
    } else return;
  }, [userId]);

  useEffect(() => {
    let interval;
    if (isAuto) {
      interval = setInterval(() => {
        if (counter !== quizzzies.length * 100 - 100) {
          setCounter(counter + 100);
        } else setCounter(0);
      }, 5000);
    } else if (!isAuto && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isAuto, counter]);

  const handleAddFavorite = async (userId, id, event) => {
    event.preventDefault(); // Prevent default behavior that might cause a page reload

    let link = "";
    if (!isFavorite)
      link = `${process.env.REACT_APP_API_BASE_URL}/users/favorite/${userId}`;
    else
      link = `${process.env.REACT_APP_API_BASE_URL}/users/unfavorite/${userId}`;

    try {
      const response = await fetch(link, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quizzzyId: id }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDownload = (format) => {
    const link = document.createElement("a");
    link.href = `${process.env.REACT_APP_API_BASE_URL}/quizzzy/export/${id}?format=${format}`;
    link.setAttribute("download", `quizzzy.${format}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloadPopupVisible(false);
  };

  const handleMouseToggle = (enter) => {
    if (!isLoggedIn) {
      setShowTooltip(enter);
    }
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsDownloadPopupVisible(false);
    }
  };

  useEffect(() => {
    if (isDownloadPopupVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDownloadPopupVisible]);

  function shuffleArray() {
    let array = quizzzies;
    setIsLoadingQuizzzy(true);
    setTimeout(() => {
      setIsLoadingQuizzzy(false);
    }, 2000);
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    setQuizzzies(array);
    return;
  }

  return (
    <div className="bg-[#F6F6F6] min-h-screen py-12">
      <div className="mb-12 px-12 font-semibold text-2xl">
        {data && data.title}
      </div>
      <section className=" min-h-[30rem]">
        {isLoadingQuizzzy || !quizzzies ? (
          <div className="flex justify-center items-center h-[26rem] text-6xl text-mainColor">
            <LoadingOutlined />
          </div>
        ) : (
          <>
            <div className={"pb-12 px-12 flex overflow-hidden"}>
              {quizzzies.map((quizzzy, index) => (
                <motion.div
                  key={index}
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
                type="button"
                className="size-12 bg-gray-200 text-lg flex justify-center items-center rounded-full transform transition hover:scale-105 active:scale-90 active:bg-gray-400 active:text-sm"
                onClick={() => {
                  if (counter !== 0) setCounter(counter - 100);
                }}
              >
                <CaretLeftFilled />
              </button>
              <div className="flex justify-center items-center text-lg">
                {counter / 100 + 1}
              </div>
              <button
                type="button"
                className="size-12 bg-gray-200 text-lg flex justify-center items-center rounded-full transform transition hover:bg-gray-300 hover:scale-105 active:bg-gray-400 active:scale-90 active:text-sm"
                onClick={() => {
                  if (counter !== quizzzies.length * 100 - 100)
                    setCounter(counter + 100);
                }}
              >
                <CaretRightOutlined />
              </button>
            </div>
          </>
        )}
      </section>
      <section className="flex justify-evenly items-center pt-12 px-12">
        <div
          className={
            "w-36 h-12 flex justify-center items-center text-2xl rounded-lg text-white transform transition hover:scale-105 active:scale-90 active:bg-subColorBold hover:cursor-pointer " +
            (isAuto ? " bg-mainColor" : " bg-subColor")
          }
          onClick={() => {
            setIsAuto(!isAuto);
          }}
        >
          <StepForwardOutlined />
        </div>
        <div
          className="w-36 h-12 bg-subColor flex justify-center items-center text-2xl rounded-lg text-white transform transition hover:scale-105 active:scale-90 active:bg-subColorBold"
          onClick={() => {
            shuffleArray();
          }}
        >
          <SwapOutlined />
        </div>
        <div
          className="w-36 h-12 bg-subColor flex justify-center items-center text-2xl rounded-lg text-white transform transition hover:scale-105 active:scale-90 active:bg-subColorBold"
          onClick={() => setIsDownloadPopupVisible(true)}
        >
          <DownloadOutlined />
        </div>
        <div className="relative inline-block">
          <div
            className={`w-36 h-12 bg-subColor flex justify-center items-center text-2xl rounded-lg transform transition hover:scale-105 active:scale-90 active:bg-subColorBold ${isFavorite ? " text-red-500" : " text-white "
              }`}
            onClick={(event) => {
              if (isLoggedIn) handleAddFavorite(userId, id, event);
            }}
            onMouseEnter={() => handleMouseToggle("Favorite")}
            onMouseLeave={() => handleMouseToggle(false)}
          >
            <HeartFilled />
          </div>
          {showTooltip === "Favorite" && !isLoggedIn && (
            <div className="select-none tooltip absolute bg-gray-800 text-white p-2 rounded-md">
              Please log in to report.
            </div>
          )}
        </div>
        <div
          className="w-36 h-12 bg-subColor flex justify-center items-center text-2xl rounded-lg text-white transform transition hover:scale-105 active:scale-90 active:bg-subColorBold"
          onClick={() => setIsSharing(true)}
        >
          <ShareAltOutlined />
        </div>
        <div className="relative inline-block">
          <div
            className="w-36 h-12 bg-subColor flex justify-center items-center text-2xl rounded-lg text-white transform transition hover:scale-105 active:scale-90 active:bg-subColorBold"
            onClick={() => {
              if (isLoggedIn) setIsReport(true);
            }}
            onMouseEnter={() => handleMouseToggle("Report")}
            onMouseLeave={() => handleMouseToggle(false)}
          >
            <ExclamationCircleFilled />
          </div>
          {showTooltip === "Report" && !isLoggedIn && (
            <div className="select-none tooltip absolute bg-gray-800 text-white p-2 rounded-md">
              Please log in to report.
            </div>
          )}
        </div>
      </section>
      <section>
        <div className="bg-white max-w-full min-h-96 mx-24 mt-12 rounded-lg shadow-lg py-12 px-6">
          <div className="h-24 px-12 flex items-center gap-4">
            <div className="bg-gray-300 size-16 rounded-full" />
            <div className="grid grid-rows-2">
              <div className="font-semibold text-lg flex justify-center">
                {data && data.createdBy.username}
              </div>
              <div className="text-sm flex justify-center text-gray-700">
                {data && data.updatedAt.substring(0, 10)}
              </div>
            </div>
          </div>
          <div className="px-12 py-3">
            <span className="line-clamp-5">{data && data.description}</span>
          </div>
          <div
            className={
              "px-24 py-3 text-lg font-semibold " +
              (data && data.tags.length == 0 && " hidden")
            }
          >
            Tags:
          </div>
          <div className="px-16 py-2 grid grid-cols-6 grid-flow-row gap-10">
            {data && data.tags.map((tag) => <Tag key={tag} name={tag} />)}
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center gap-24 pt-12">
        <Link
          className="select-none bg-subColor w-48 h-16 rounded-lg flex justify-center items-center text-lg text-white font-semibold transform transition hover:scale-105 active:scale-90 active:bg-subColorBold hover:cursor-pointer"
          to={`/exam/${id}`}
          onClick={() => {window.scrollTo(0, 0)}}
        >
          Exam
        </Link>
      </section>
      <section>
        <div className="bg-white max-w-full min-h-96 mx-24 mt-12 rounded-lg shadow-lg py-12 px-6">
          <div className="text-2xl font-semibold pl-4">Related quizzy</div>
          <div className="grid grid-cols-4 grid-flow-rows gap-10 px-10 pt-12">
            {related ? related.map((r, index) => (<QuizzzyCard key={`Related ${index}`} quizzzy={r} />))

              : [...Array(4)].map((e, i) => {
                return <QuizzzySkeleton />
              })}
          </div>
        </div>
      </section>
      <section>
        <div className="pt-24 px-36 font-semibold text-2xl">
          All question in this quizzy
        </div>
        <div className="grid grid-flow-row gap-10 px-48 pt-12">
          {quizzzies &&
            quizzzies.map((quizzzy, index) => (
              <QuestionSetOverview key={index} quizzzy={quizzzy} />
            ))}
        </div>
      </section>

      {isSharing && (
        <Sharing setIsSharing={setIsSharing} url={window.location.href} />
      )}
      {isReport && <Report setIsReport={setIsReport} quizzzyId={id} />}

      {isDownloadPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Download As</h2>
            <div className="flex justify-around flex-col">
              <button
                onClick={() => handleDownload("excel")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
              >
                Excel
              </button>
              <button
                onClick={() => handleDownload("csv")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                CSV
              </button>
            </div>
            <button
              onClick={() => setIsDownloadPopupVisible(false)}
              className="mt-4 bg-red-600 rounded-md p-2 text-white ml-40"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quizzy;
