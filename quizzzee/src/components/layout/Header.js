import { Button, Input } from "antd";
import React from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const items = [
  {
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
    key: "0",
  },
  {
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item (disabled)",
    key: "3",
    disabled: true,
  },
];
const { Search } = Input;

function Header() {
  return (
    <div className="w-full min-h-[69px] grid grid-cols-12 shadow-lg bg-white">
      <div className="col-span-3 flex items-center justify-evenly">
        <div className="font-bold text-3xl">
          <span className="text-mainColorBold">Quizz</span>
          <span className="text-extraColor">zee</span>
        </div>
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
        <div className="font-semibold">About us</div>
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
        <div>Sign Up</div>
        <button className="bg-subColor mx-4 py-2 rounded-full hover:bg-subColorLight active:bg-subColorBold text-white">
          Login
        </button>
      </div>
    </div>
  );
}

export default Header;
