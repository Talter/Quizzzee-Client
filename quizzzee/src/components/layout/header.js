import { Button, Divider, Input, Skeleton } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { UserContext } from "../../context/UserContext";
import DefaultProFileImage from "../../images/default/default-avatar.png";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { Search } = Input;
  const navi = useNavigate();
  const { isLoggedIn, userId, token, logout, updateFavorites } =
    useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [search, setSearch] = useState("");

  const tagSearch = (subject) => {
    const location = window.location.pathname.split("/");

    if (location[1] !== "search") {
      return `/search/tag=${subject}`;
    }

    const searchParams = new URLSearchParams(location[2]);
    const name = searchParams.get("name");

    return name
      ? `/search/name=${name}&tag=${subject}`
      : `/search/tag=${subject}`;
  };

  const subjects = [
    "math",
    "literature",
    "science",
    "history",
    "geography",
    "art",
    "music",
    "physics",
  ];

  const items = subjects.map((subject, index) => ({
    label: (
      <div
        rel="noopener noreferrer"
        onClick={() => {
          navi(tagSearch(subject));
        }}
      >
        {subject.charAt(0).toUpperCase() + subject.slice(1)}
      </div>
    ),
    key: index.toString(),
  }));

  const users = [
    <div rel="noopener noreferrer" onClick={() => navi("/me/detail")}>
      Account Detail
    </div>,
    <div rel="noopener noreferrer" onClick={() => navi("/me/quizzzies")}>
      My Quizzzy
    </div>,
    <div className="border-b-2 border-roseWater my-2"></div>,
    <div
      rel="noopener noreferrer"
      className="text-red-500 font-semibold"
      onClick={() => logout()}
    >
      Logout
    </div>,
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data);
        updateFavorites(data.favorites);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userId) {
      fetchData();
    } else return;
  }, [userId]);

  function capitalizeFirstLetter(string) {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const location = window.location.pathname.split("/");

    if (location[1] !== "search") {
      navi(`/search/name=${search}`);
      return;
    }

    const searchParams = new URLSearchParams(location[2]);
    const subject = searchParams.get("tag");

    navi(
      subject
        ? `/search/name=${search}&tag=${subject}`
        : `/search/name=${search}`
    );
    return;
  };
  return (
    <div className="w-full min-h-[69px] grid grid-cols-12 shadow-lg bg-white">
      <div className="col-span-3 flex items-center justify-evenly">
        <Link
          to="/"
          className="font-bold text-3xl relative select-none"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <span className="text-mainColorBold">Quizz</span>
          <span className="text-extraColor">zee</span>
        </Link>
        <div>
          <Dropdown
            dropdownRender={(menu) => (
              <div
                className="bg-white border-2 border-roseWater rounded-lg p-4"
                style={{ fontFamily: "Quicksand" }}
              >
                <div className="flex flex-col flex-wrap h-52 border-b-2 border-roseWater">
                  {subjects.map((subject) => (
                    <div
                      rel="noopener noreferrer"
                      onClick={() => {
                        navi(tagSearch(subject));
                      }}
                      className="hover:bg-gray-100 rounded-md p-2 text-lg font-semibold mr-24 cursor-pointer"
                    >
                      {subject.charAt(0).toUpperCase() + subject.slice(1)}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-lg font-semibold mt-3 ml-2 cursor-pointer"
                    onClick={() => {
                      navi(tagSearch(subjects[Math.floor(Math.random() * 8)]));
                    }}
                  >
                    Random
                  </span>
                  <form className="relative" onSubmit={handleSubmit}>
                    <input
                      className="w-full py-1.5 px-6 mt-3 rounded-full border-2 focus:outline-none focus:ring-0 focus:ring-extraColor focus:border-extraColor  active:border-gray-500 font-semibold"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    <button className="absolute right-0 bottom-0 bg-subColor text-white rounded-full py-1.5 px-6">
                      <SearchOutlined className="text-lg" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Button
                  type="primary"
                  className="bg-subColorLight hover:bg-subColor flex justify-center items-center p-2.5"
                >
                  <CaretDownOutlined />
                </Button>
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      <div className="col-span-6 grid grid-cols-5 justify-center items-center text-center ">
        <a className="font-semibold" href="/#quizzz">
          Quizzzy
        </a>
        <Link
          to="/aboutus"
          className="font-semibold"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          About us
        </Link>
        <div className="col-span-3 mx-6 relative">
          <form onSubmit={handleSubmit}>
            <input
              className="w-full py-1.5 px-6 rounded-full border-2 focus:outline-none focus:ring-0 focus:ring-extraColor focus:border-extraColor active:border-gray-500 font-semibold"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button className="absolute top-1/2 transform -translate-y-1/2 right-[0.1rem] bg-subColor text-white font-semibold py-[0.33rem] mt-[0.018745rem] px-8 rounded-full">
              <SearchOutlined className="text-lg" />
            </button>
          </form>
        </div>
      </div>
      {isLoggedIn ? (
        <div className="col-span-3 ps-12 pe-16 flex justify-center items-center pt-1">
          <div className="text-lg mr-6 font-bold">
            {userData.username ? (
              "Welcome, " + capitalizeFirstLetter(userData.username) + "!"
            ) : (
              <Skeleton.Input active />
            )}
          </div>
          <Dropdown
            // menu={{
            //   items: users,
            // }}]
            placement="bottomCenter"
            dropdownRender={(menu) => (
              <div
                className="bg-white border-2 border-roseWater rounded-lg p-4"
                style={{ fontFamily: "Quicksand" }}
              >
                {users.map((item) => (
                  <div className="text-lg font-semibold text-right cursor-pointer hover:bg-gray-100 p-1 rounded-md">
                    {item}
                  </div>
                ))}
              </div>
            )}
          >
            <div>
              <div className="size-12 bg-subColor border-2 border-subColorBold rounded-full overflow-hidden">
                <img
                  className="object-cover h-full w-full"
                  src={userData.image || DefaultProFileImage}
                />
              </div>
            </div>
          </Dropdown>
        </div>
      ) : (
        <div className="col-span-3 grid grid-cols-2 justify-center items-center text-center ps-12 pe-16 font-bold">
          <a
            href="/signup"
            className="hover:cursor-pointer transition transform hover:scale-110 duration-500"
          >
            Sign Up
          </a>
          <a
            href="/login"
            className="bg-subColor mx-4 py-2 rounded-full hover:bg-subColorLight active:bg-subColorBold text-white"
          >
            Login
          </a>
        </div>
      )}
    </div>
  );
}

export default Header;
