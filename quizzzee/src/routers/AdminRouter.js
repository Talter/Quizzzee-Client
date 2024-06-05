import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, Menu, theme } from "antd";

import MainPage from "../pages/admin/MainPage";
import UserList from "../pages/admin/UserList";
import UserDetail from "../pages/admin/UserDetail";
import QuizzzyList from "../pages/admin/QuizzzyList"
import QuizzzyDetail from "../pages/admin/QuizzzyDetail"

const { Header, Content, Footer } = Layout;
const items = [
  { key: 1, label: 'Dash Board', location: 'dashboard' },
  { key: 2, label: 'User', location: 'user' },
  { key: 3, label: 'Quizzzy', location: 'quizzzy' },
  { key: 4, label: 'nav 3' }
]
const AdminRouter = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const path = window.location.pathname;

  function handlePageChange(e) {
    const key = e.key;
    const selectedItem = items.find(item => String(item.key) === key);
    if (selectedItem) {
      const location = selectedItem.location;
      window.location.href = "/admin/" + location;
    }
  }
  

  function NotFound() {
    return <h2>404 Not Found</h2>;
  }
  return (
    <BrowserRouter>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={(path.endsWith("/admin") || path.endsWith("/dashboard")) ? ["1"] : ["2"]}
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
            }}
            onClick={(e) => {
              handlePageChange(e);
            }}
          />
        </Header>
        <Content
          style={{
            padding: "48px 48px",
          }}
        >
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/admin" element={<MainPage />} />
              <Route path="/admin/dashboard" element={<MainPage />} />
              <Route path="/admin/user" element={<UserList />} />
              <Route path="/admin/user/:id" element={<UserDetail />} />
              <Route path="/admin/quizzzy" element={<QuizzzyList />} />
              <Route path="/admin/quizzzy/:id" element={<QuizzzyDetail />} />
              <Route path="/admin/*" element={<NotFound />} />
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </BrowserRouter>
  );
};
export default AdminRouter;
