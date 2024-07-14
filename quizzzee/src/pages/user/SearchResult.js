import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Pagination, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function SearchResult() {
  
  const navi = useNavigate();
  const { searchvalue } = useParams();
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [quizzzy, setQuizzzy] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setQuizzzy([]);
    const parts = searchvalue.split("&");
    parts.forEach((part) => {
      const [key, value] = part.split("=");
      if (key === "name") {
        setName(value);
      } else if (key === "tag") {
        setTag(value);
      }
    });
    setCurrentPage(1);
  }, [searchvalue]);

  useEffect(() => {
    fetchData(name, tag);
  }, [name, tag]);

  const fetchData = async (name, tag) => {
    try {
      const response1 = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/commons/search?quizzzy=${name}`
      );
      if (!response1.ok) {
        throw new Error("Network response was not ok");
      }
      const data1 = await response1.json();

      const response2 = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/quizzzy/`
      );
      if (!response2.ok) {
        throw new Error("Network response was not ok");
      }
      const data2 = await response2.json();
      const data2Filtered = data2.filter((d) => d.tags.includes(tag));
      const finalData = data1.filter((data) => {
        return data2Filtered.some(
          (filteredData) => filteredData._id === data._id
        );
      });
      if (name !== "" && tag !== "") {
        setQuizzzy(finalData);
      } else if (name !== "") {
        setQuizzzy(data1);
      } else if (tag !== "") {
        setQuizzzy(data2Filtered);
      }
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
      {(name !== "" || tag !== "") && (
        <div className="flex justify-center gap-3 items-center">
          <span>
            Searching for {name} {name !== "" && tag !== "" && "with "}
            {tag}
          </span>
        </div>
      )}
      <section className="px-36 grid grid-cols-4 grid-flow-rows justify-center items-center gap-12 mt-12">
        {currentQuizzzy.map((data) => (
          <QuizzzyCard quizzzy={data} key={data._id} />
        ))}
      </section>
      {currentQuizzzy.length === 0 ? (
        <div className="text-center text-xl">Sorry, we can't find what you are looking for ...</div>
      ) : (
        <div className="flex justify-center mt-12">
          <Pagination
            current={currentPage}
            total={quizzzy.length}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default SearchResult;
