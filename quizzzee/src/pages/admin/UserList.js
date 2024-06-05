import React, { useEffect, useState } from 'react';
import { Pagination, Input, Table } from 'antd';
import { useNavigate } from 'react-router-dom';


const { Search } = Input;

function MyComponent() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/`
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
      fetchData();
  },[])

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize,setPageSize] = useState(10);

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const filteredData = data  ?data.filter(item =>
    item.username.toLowerCase().includes(searchQuery.toLowerCase())
  ): "";

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setCurrentPage(1); // Reset to the first page when searching
    setSearchQuery(value);
  };

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize)
  };

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  // Table columns
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: '_id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: '_id',
    },
    {
      title: 'Join date',
      dataIndex: 'username',
      key: '_id',
    },
    {
      title: 'Last update',
      dataIndex: 'updatedAt',
      key: '_id',
    },
  ];

  return (
    <div>
      {/* Search Bar */}
      <div className="flex justify-end">
      <Search placeholder="Search..." onSearch={handleSearch} style={{ width: 200, marginBottom: 16 }} />
      </div>
      {/* Table */}
      <Table
        columns={columns}
        dataSource={currentPageData}
        pagination={false}
        rowKey="_id"
        onRow={(a) => ({
          onClick: () => {navigate(`/admin/user/${a._id}`)}
      })}
      />

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
      <Pagination current={currentPage} total={filteredData.length} pageSize={pageSize} onChange={handlePageChange} onShowSizeChange={onShowSizeChange}/>
      </div>
    </div>
  );
}

export default MyComponent;
