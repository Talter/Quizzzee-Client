import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/user/MainPage";
import LoginPage from "../pages/user/LoginPage";
import SignUp from "../pages/user/SignUp";
import Quizzy from "../pages/user/Quizzy";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import AdminLogin from "../pages/AdminLogin";
import UserDetail from "../pages/user/UserDetail";
import AboutUs from "../pages/user/AboutUs";

function BasicRouter() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <div className="sticky top-0 z-10">
          <Header />
        </div>
        <div className="relative">
          <div
            className={
              !["/login", "/signup", "/login/admin", "detail"].includes(
                window.location.pathname
              ) && "min-h-screen"
            }
          >
            <Routes>
              <Route path="/login/admin" element={<AdminLogin />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<MainPage />} />
              <Route path="/quizzzy/:id" element={<Quizzy />} />
              <Route path="/detail" element={<UserDetail />} />
              <Route path="/aboutus" element={<AboutUs />} />
            </Routes>
          </div>
          {!["/login", "/signup", "/login/admin", "detail", "/aboutus"].includes(
            window.location.pathname
          ) && (
            <div
              className={
                window.location.pathname.startsWith("/quizzzy")
                  ? " bg-[#F6F6F6]"
                  : " bg-transparent"
              }
            >
              <Footer />
            </div>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default BasicRouter;
