import React, { useState } from 'react';
import { Pagination, Input, Table } from 'antd';

const { Search } = Input;

function MyComponent() {
  // Generate fake data
  const generateFakeData = (count) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
      data.push({ key: i, name: `Item ${i}`, fuck: `This ${i+1}` });
    }
    return data;
  };

  // Create fake data array
  const fakeData = generateFakeData(69);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize,setPageSize] = useState(10);

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const filteredData = fakeData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Fuck',
        dataIndex: 'fuck',
        key: 'fuck',
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
      />

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
      <Pagination current={currentPage} total={filteredData.length} pageSize={pageSize} onChange={handlePageChange} onShowSizeChange={onShowSizeChange}/>
      </div>
    </div>
  );
}

export default MyComponent;
