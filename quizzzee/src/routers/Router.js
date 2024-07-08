import React from "react";

import AdminRouter from "./AdminRouter";
import BasicRouter from "./BasicRouter";

const Router = () => {
  if (window.location.pathname.startsWith("/admin") || window.location.pathname.startsWith("/sadmin")) {
    return <AdminRouter />;
  } else return <BasicRouter />;
};

export default Router;
