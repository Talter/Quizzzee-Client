import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);

export default function Router() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="flex-grow">
        <RouterProvider router={router} />
      </div>
      <Footer />
    </div>
  );
}
