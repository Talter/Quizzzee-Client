import { Button, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
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
    {
      label: (
        <div rel="noopener noreferrer" onClick={() => navi("/me/detail")}>
          Account Detail
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          rel="noopener noreferrer"
          onClick={() => (window.location.href = "/me/quizzzies")}
        >
          My Quizzzy
        </div>
      ),
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div
          rel="noopener noreferrer"
          className="text-red-500 font-semibold"
          onClick={() => logout()}
        >
          Logout
        </div>
      ),
      key: "0",
    },
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
          onClick={() => {window.scrollTo(0, 0)}}
        >
          <span className="text-mainColorBold">Quizz</span>
          <span className="text-extraColor">zee</span>
        </Link>
        <div>
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Button
                  type="primary"
                  className="bg-mainColor hover:bg-mainColorBold flex justify-center items-center p-2.5"
                >
                  <CaretDownOutlined />
                </Button>
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      <div className="col-span-6 grid grid-cols-5 justify-center items-center text-center ">
        <a className="font-semibold" 
          href="/#quizzz"
          >
          Quizzzy
        </a>
        <Link to="/aboutus" className="font-semibold">
          About us
        </Link>
        <div className="col-span-3 mx-6 relative">
          <form onSubmit={handleSubmit}>
            <input
              className="w-full py-1.5 px-6 rounded-full border active:border-gray-500 font-semibold"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button className="absolute top-1/2 transform -translate-y-1/2 right-[0.1rem] bg-subColor text-white font-semibold py-[0.33rem] mt-[0.018745rem] px-3 rounded-full">
              Search
            </button>
          </form>
        </div>
      </div>
      {isLoggedIn ? (
        <div className="col-span-3 ps-12 pe-16 flex justify-center items-center pt-1">
          <div className="text-lg mr-6 font-bold">
            {userData.username
              ? "Welcome, " + capitalizeFirstLetter(userData.username) + "!"
              : "I'm loading god darn it"}
          </div>
          <Dropdown
            menu={{
              items: users,
            }}
          >
            <div>
              <div className="size-12 bg-mainColor rounded-full overflow-hidden">
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
