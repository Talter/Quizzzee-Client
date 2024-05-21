import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const Router = () => {
  if(window.location.pathname === "/login"){
    return(
      <div className="">
        <LoginPage/>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Router;
