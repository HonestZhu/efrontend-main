import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Sider from "./component/Sider";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Login from "./component/login";
import Signup from "./component/logup";
import ForgetPassword from "./component/Remainder";
import Main from "./component/Main";
function App() {
  return (
    <div className="App">
      <Main />

      {/*   <Login /> */}
      {/*   <Signup /> */}
      {/*  <ForgetPassword /> */}
    </div>
  );
}

export default App;
