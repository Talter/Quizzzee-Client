import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/user/MainPage";
import LoginPage from "./pages/user/LoginPage";
import SignUp from "./pages/user/SignUp";
import Quizzy from "./pages/user/Quizzy";
import Header from "./components/layout/headerLayout";
import Footer from "./components/layout/footerLayout";
import AdminLogin from "./pages/AdminLogin";

import AdminRouter from "./pages/admin/AdminRouter";

const Router = () => {
  console.log(window.location.pathname.startsWith("/quizzzy"));
  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup" ||
    window.location.pathname === "/login/admin"
  ) {
    return (
      <BrowserRouter>
        <div className="">
          <div className="sticky top-0 z-10">
            <Header />
          </div>
          <Routes>
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  } else if ( window.location.pathname === "/admin"){
    return (
      <AdminRouter />
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
          <div
            className={
                window.location.pathname.startsWith("/quizzzy")
                ? " bg-[#F6F6F6]"
                : " bg-transparent"
            }
          >
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Router;
