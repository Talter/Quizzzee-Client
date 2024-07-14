import React, { useContext, useEffect, useState } from "react";
import { Pagination, Input, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const { Search } = Input;

function MyComponent() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const { token } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/report`,
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
        data.map((d) => {
          d.createdAt = d.createdAt.slice(0, 10);
          if (d.status === "Not Checked") d.updatedAt = "Not Checked";
          else d.updatedAt = d.updatedAt.slice(0, 10);
        });

        data.sort((a, b) => {
          if (a.status === "Not Checked" && b.status !== "Not Checked") {
            return -1;
          } else if (a.status !== "Not Checked" && b.status === "Not Checked") {
            return 1;
          } else {
            return 0;
          }
        });
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data ? data.filter((d) => d.createdAt.includes(searchQuery)) : "";

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

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  // Table columns
  const columns = [
    {
      title: "Id",
      dataIndex: "quizzzyId",
      key: "_id",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "_id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "_id",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "_id",
    },
    {
      title: "Resolved Date",
      dataIndex: "updatedAt",
      key: "_id",
    },
  ];

  const getRowClassName = (record, index) => {
    return record.isPrivate ? "bg-gray-200 hover:cursor-not-allowed" : "";
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="flex justify-end">
        <Search
          placeholder="Search by Created Date"
          onSearch={handleSearch}
          style={{ width: 200, marginBottom: 16 }}
        />
      </div>
      {/* Table */}
      <Table
        columns={columns}
        dataSource={currentPageData}
        rowClassName={getRowClassName}
        pagination={false}
        onRow={(a) => ({
          onClick: () => {
            navigate(`/admin/report/${a._id}`);
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
    </div>
  );
}

export default MyComponent;
