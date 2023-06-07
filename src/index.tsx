import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StockList from "./component/StockList";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Favorite from "./component/Favorite";
import StockDetail from "./component/StockDetail";
import StockCreate from "./component/StockCreate";
import User from "./component/User";
import Screen from "./component/Screen";
import Recommend from "./component/Recommend";
import Help from "./component/help";
import Recom from "./component/Recom";
import Questionnaire from "./component/questionnaire";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <StockList /> },
      {
        path: "/stocklist",
        element: <StockList />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "/recom",
        element: <Recom />,
      },
      {
        path: "/create",
        element: <StockCreate />,
      },
      {
        path: "/stocklist/:stock_id",
        element: <StockDetail />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/screen",
        element: <Screen />,
      },
      {
        path: "/recommend",
        element: <Recom />,
      },
      {
        path: "/questionnaire",
        element: <Questionnaire />,
      },
      {
        path: "/help",
        element: <Help />,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  //+  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
