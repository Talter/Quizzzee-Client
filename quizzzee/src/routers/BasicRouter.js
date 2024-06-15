import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MainPage from "../pages/user/MainPage";
import LoginPage from "../pages/user/LoginPage";
import SignUp from "../pages/user/SignUp";
import Quizzy from "../pages/user/Quizzy";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import AdminLogin from "../pages/AdminLogin";
import UserDetail from "../pages/user/UserDetail";
import AboutUs from "../pages/user/AboutUs";
import AddQuizz from "../pages/user/AddQuizz";
import MyQuizzzy from "../pages/user/MyQuizzzy";
import ExamQuizz from "../pages/user/ExamQuizz";

import { UserProvider } from "../context/UserContext";
import SearchResult from "../pages/user/SearchResult";

function BasicRouter() {
  const location = useLocation();

  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <div className="sticky top-0 z-10">
          <Header />
        </div>
        <div className="relative">
          <div
            className={
              !["/login", "/signup", "/login/admin", "detail"].includes(
                location.pathname
              ) && "min-h-screen"
            }
          >
            <Routes>
              <Route path="/login/admin" element={<AdminLogin />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<MainPage />} />
              <Route path="/quizzzy/:id" element={<Quizzy />} />
              <Route path="/me/detail" element={<UserDetail />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/search" element={<SearchResult />} />
              <Route path="/search/:searchvalue" element={<SearchResult />} />
              <Route path="/addquizz" element={<AddQuizz />} />
              <Route path="/myquizzzy" element={<MyQuizzzy />} />
              <Route path="/exam/:id" element={<ExamQuizz />} />
              <Route path="/me/quizzzies" element={<MyQuizzzy />} />
            </Routes>
          </div>
          {!["/login", "/signup", "/login/admin", "/aboutus", "/exam"].includes(
            location.pathname
          ) && (
              <div
                className={
                  location.pathname.startsWith("/quizzzy")
                    ? " bg-[#F6F6F6]"
                    : " bg-transparent"
                }
              >
                <Footer />
              </div>
            )}
        </div>
      </div>
    </UserProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <BasicRouter />
    </BrowserRouter >
  );
}

export default App;
