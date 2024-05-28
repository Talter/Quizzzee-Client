import { Button, Divider, Input } from "antd";
import React from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const items = [
  
  {
    label: (
      <a
        rel="noopener noreferrer"
        href="/aboutus"
      >
        1st menu item
      </a>
    ),
    key: "0",
  },
  // {
  //   type: "divider",
  // },
];
const { Search } = Input;

function Header() {
  return (
    <div className="w-full min-h-[69px] grid grid-cols-12 shadow-lg bg-white">
      <div className="col-span-3 flex items-center justify-evenly">
        <a href="/" className="font-bold text-3xl relative select-none">
          <span className="text-mainColorBold">Quizz</span>
          <span className="text-extraColor">zee</span>
        </a>
        <div>
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
      </div>
      <div className="col-span-6 grid grid-cols-5 justify-center items-center text-center ">
        <div className="font-semibold">Quizzy</div>
        <a href="/aboutus" className="font-semibold">About us</a>
        <div className="col-span-3">
          {" "}
          <Search
            className="px-12 rounded-full"
            placeholder="Search . . ."
            onSearch={() => {
              console.log("test");
            }}
            enterButton
          />
        </div>
      </div>
      <div className="col-span-3 grid grid-cols-2 justicy-center items-center text-center ps-12 pe-16 font-bold">
        <a href="/signup" className="hover:cursor-pointer transition transform hover:scale-110 duration-500">Sign Up</a>
        <a
          href="/login"
          className="bg-subColor mx-4 py-2 rounded-full hover:bg-subColorLight active:bg-subColorBold text-white"
        >
          Login
        </a>
      </div>
    </div>
  );
}

export default Header;
