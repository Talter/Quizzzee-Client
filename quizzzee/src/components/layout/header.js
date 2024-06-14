import { Button, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { UserContext } from "../../context/UserContext";
import DefaultProFileImage from "../../images/default/default-avatar.png";
import { Link } from "react-router-dom";

function Header() {
  const { Search } = Input;
  const { isLoggedIn, userId, logout } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const items = [
    {
      label: (
        <a rel="noopener noreferrer" href="/aboutus">
          1st menu item
        </a>
      ),
      key: "0",
    },
  ];

  const users = [
    {
      label: (
        <div
          rel="noopener noreferrer"
          onClick={() => (window.location.href = "/me/detail")}
        >
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
        <div rel="noopener noreferrer" onClick={() => logout()}>
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
          `http://localhost:8080/api/users/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data);
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

  return (
    <div className="w-full min-h-[69px] grid grid-cols-12 shadow-lg bg-white">
      <div className="col-span-3 flex items-center justify-evenly">
        <Link
          to="/"
          className="font-bold text-3xl relative select-none"
          onClick={window.scrollTo(0, 0)}
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
        <div className="font-semibold">Quizzzy</div>
        <Link to="/aboutus" className="font-semibold">
          About us
        </Link>
        <div className="col-span-3 mx-6 relative">
          <input
            className="w-full py-1.5 px-6 rounded-full border active:border-gray-500 font-semibold"
            placeholder="Search..."
          />
          <button className="absolute top-1/2 transform -translate-y-1/2 right-[0.1rem] bg-subColor text-white font-semibold py-[0.33rem] mt-[0.018745rem] px-3 rounded-full">
            Search
          </button>
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
                <img src={DefaultProFileImage} />
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
