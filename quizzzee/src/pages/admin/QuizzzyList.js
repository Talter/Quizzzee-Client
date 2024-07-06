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
          `${process.env.REACT_APP_API_BASE_URL}/quizzzy`
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
  const filteredData = data  ? data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
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
      title: 'title',
      dataIndex: 'title',
      key: '_id',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: '_id',
      },
      {
        title: 'createdAt',
        dataIndex: 'createdAt',
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
        onRow={(a) => ({
            onClick: () => {navigate(`/admin/quizzzy/${a._id}`)}
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
