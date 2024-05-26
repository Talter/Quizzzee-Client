import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";

import MainPage from "./MainPage";

const { Header, Content, Footer } = Layout;
const items = new Array(3).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
            defaultSelectedKeys={["2"]}
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
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
export default App;
