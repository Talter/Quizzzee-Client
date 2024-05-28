import React from "react";

import AdminRouter from "./AdminRouter";
import BasicRouter from "./BasicRouter";

const Router = () => {
  if (window.location.pathname.startsWith("/admin")) {
    return (
      <AdminRouter />
    );
  } else
  return (
    <BasicRouter />
  )
};

export default Router;
