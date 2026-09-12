import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
  },
]);

export default router