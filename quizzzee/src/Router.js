import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Quizzy from "./pages/Quizzy";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

const Router = () => {
  console.log(window.location.pathname.startsWith("/quizzzy"));
  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup"
  ) {
    return (
      <BrowserRouter>
        <div className="">
          <div className="sticky top-0 z-10">
            <Header />
          </div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
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
                && " bg-[#F6F6F6] "
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
