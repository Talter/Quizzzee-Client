import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import Quizzy from "./pages/Quizzy";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

const Router = () => {
  console.log(window.location.pathname.startsWith("/quizzzy"))
  if (window.location.pathname === "/login") {
    return (
      <div className="">
        <div className="sticky top-0 z-10">
          <Header />
          </div>
        <LoginPage />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10">
          <Header />
          </div>
        <div className="relative">
          <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/quizzzy/:id" element={<Quizzy />} />
          </Routes>
          </div>
          <div className={"absolute min-w-full bottom-0 " + window.location.pathname.startsWith("/quizzzy")?" bg-red-100 ":"bg-blue-100"}>
        <Footer />
        </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Router;
