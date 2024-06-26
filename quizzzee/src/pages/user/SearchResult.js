import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Pagination, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizzzyCard from "../../components/layout/quizzzyCard/QuizzzyCard";

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
    label: "4th menu item",
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
  const [name, setName] = useState("");
  const [tag, setTag] = useState("None");
  const [quizzzy, setQuizzzy] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setQuizzzy([]);
    const parts = searchvalue.split("&");
    parts.forEach((part) => {
      const [key, value] = part.split("=");
      if (key === "name") {
        setName(value);
        fetchData(value);
      } else if (key === "tag") {
        if (value === "") setTag("None");
        else setTag(value);
      }
    });
    setCurrentPage(1);
  }, [searchvalue]);

  const fetchData = async (name) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/commons/search?quizzzy=${name}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQuizzzy(data);
    } catch (error) {
      setQuizzzy([]);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pageSize = 8;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentQuizzzy = quizzzy.slice(startIndex, endIndex);

  return (
    <div className="py-24">
      <div className="flex justify-center gap-3 items-center">
        <span>Searching for</span>
        <span>{name}</span>
        <span>with</span>{" "}
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              {tag}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>{" "}
        tags
      </div>
      <section className="px-36 grid grid-cols-4 grid-flow-rows justify-center items-center gap-12 mt-12">
        {currentQuizzzy &&
          currentQuizzzy.map((data) => (
            <QuizzzyCard quizzzy={data} key={data._id} />
          ))}
      </section>
      <div className="flex justify-center mt-12">
        <Pagination
          current={currentPage}
          total={quizzzy.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default SearchResult;
