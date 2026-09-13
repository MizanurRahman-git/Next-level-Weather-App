import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import Weather from "../pages/Weather";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
      {
        index: true,
        Component: Home
      },
      {
        path:"weather",
        Component: Weather
      }
    ]
  },
]);

export default router