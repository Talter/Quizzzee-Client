import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Pagination, Space } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

const Content = () => {
  return (
    <a
      className=" rounded-xl  bg-subColor shadow-inner grid grid-rows-2 transition transform hover:scale-105 active:scale-90"
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
const items = [
  {
    label: "1st menu item",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "2nd menu item",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "3rd menu item",
    key: "3",
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: "4rd menu item",
    key: "4",
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];
const menuProps = {
  items,
};

function SearchResult() {
  const { searchvalue } = useParams();
  const parts = searchvalue.split("&");
  let name, tag;
  parts.forEach((part) => {
    const [key, value] = part.split("=");
    if (key === "name") {
      name = value;
    } else if (key === "tag") {
      tag = value;
    }
  });
  return (
    <div className="py-24">
      <div className="flex justify-center gap-3 items-center">
        <span>Searching for</span>
        <span>{ name }</span>
        <span>with</span>{" "}
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              { tag}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>{" "}
        tags
      </div>
      <section className="px-36 grid grid-cols-4 grid-flow-rows justify-center items-center gap-12 mt-12">
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
      </section>
      <div className="flex justify-center mt-12">
      <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
}

export default SearchResult;
