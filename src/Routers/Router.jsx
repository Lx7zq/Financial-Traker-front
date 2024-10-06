import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Layout from "../Component/Layout";
import Dashbord from "../Pages/Dashbord";
import { FinancialRecordProvider } from "../contexts/financial.context";
import EditRecord from "../Pages/Dashbord/EditRecordform";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "Dashbord",
        element: (
          <FinancialRecordProvider>
            <Dashbord />
          </FinancialRecordProvider>
        ),
      },
      {
        path: "edit/:id", // แก้ไขเส้นทางให้ถูกต้อง
        element: <EditRecord />,
      },
    ],
  },
]);

export default router;
