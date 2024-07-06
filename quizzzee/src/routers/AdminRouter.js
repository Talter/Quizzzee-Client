import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";

import MainPage from "../pages/admin/MainPage";
import UserList from "../pages/admin/UserList";
import UserDetail from "../pages/admin/UserDetail";
import QuizzzyList from "../pages/admin/QuizzzyList";
import QuizzzyDetail from "../pages/admin/QuizzzyDetail";
import ReportList from "../pages/admin/ReportList";
import ReportDetail from "../pages/admin/ReportDetail";
import { UserContext, UserProvider } from "../context/UserContext";

const { Header, Content, Footer } = Layout;

const AdminRouter = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const path = window.location.pathname;
  function NotFound() {
    return <h2>404 Not Found</h2>;
  }

  return (
    <UserProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <NavMenu path={path} />
        </Header>
        <Content style={{ padding: "48px 48px" }}>
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
              <Route path="/admin/report/" element={<ReportList />} />
              <Route path="/admin/report/:id" element={<ReportDetail />} />
              <Route path="/admin/*" element={<NotFound />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </UserProvider>
  );
};

const NavMenu = ({ path }) => {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);
  const handlePageChange = (e) => {
    const key = e.key;
    if (key !== "done") {
      navigate("/admin/" + key);
      return;
    }
    logout();
    window.location.href = "/";
  };
  const defaultSelectedKey = path.split("/")[2]
    ? path.split("/")[2]
    : "dashboard";
  return (
    <div className="flex w-full">
      <Menu
        mode="horizontal"
        theme="dark"
        defaultSelectedKeys={[defaultSelectedKey]}
        onClick={(e) => handlePageChange(e)}
        className="w-full"
      >
        <Menu.Item key="dashboard">Dash Board</Menu.Item>
        <Menu.Item key="user">User</Menu.Item>
        <Menu.Item key="quizzzy">Quizzzy</Menu.Item>
        <Menu.Item key="report">Report</Menu.Item>
        <Menu.Item key="done" style={{ marginLeft: "auto" }}>
          I'm done
        </Menu.Item>
      </Menu>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AdminRouter />
    </BrowserRouter>
  );
}

export default App;
