import React, { useContext, useEffect, useState } from "react";
import { Pagination, Input, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const { Search } = Input;

function MyComponent() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const { token } = useContext(UserContext);
  const navi = useNavigate();
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/admins/`,
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
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data
    ? data.filter((item) =>
        item.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : "";

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setCurrentPage(1); // Reset to the first page when searching
    setSearchQuery(value);
  };

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "_id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "_id",
    },
    {
      title: "Join date",
      dataIndex: "username",
      key: "_id",
    },
    {
      title: "Last update",
      dataIndex: "updatedAt",
      key: "_id",
    },
  ];
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/admins/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchData();
      setIsDelete(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="flex justify-end">
        <Search
          placeholder="Search..."
          onSearch={handleSearch}
          style={{ width: 200, marginBottom: 16 }}
        />
      </div>
      {/* Table */}
      <Table
        columns={columns}
        dataSource={currentPageData}
        pagination={false}
        rowKey="_id"
        onRow={(a) => ({
          onClick: () => {
            if(!isDelete)
            navigate(`/sadmin/admin/${a._id}`);
            else
            handleDelete(a._id)
          },
        })}
      />

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          total={filteredData.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          onShowSizeChange={onShowSizeChange}
        />
      </div>
      <div className="mt-12 flex justify-evenly">
        <button className="bg-mainColorBold text-white py-2 px-2 rounded-lg transform transition hover:scale-105 active:scale-90"
        onClick={() => {navi("/sadmin/admin/create")}}>
          Create new Admin
        </button>
        <button
          onClick={() => setIsDelete(!isDelete)}
          className="bg-red-500 text-white py-2 px-2 rounded-lg transform transition hover:scale-105 active:scale-90"
        >
          Delete Admin
        </button>
      </div>
      {isDelete && (
        <div className="text-red-500 text-center font-semibold">
          **Click on an admin to delete**
        </div>
      )}
    </div>
  );
}

export default MyComponent;
