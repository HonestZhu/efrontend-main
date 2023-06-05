import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Outlet } from "react-router-dom";
import Login from "./login";
import Signup from "./logup";
import Remainder from "./Remainder";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import "./modalContent.css";

const ModalContent = (props: {
  username: string;
  onLoginSuccess: (isLoggedIn: boolean, username: string) => void;
}) => {
  const [mode, setMode] = useState<any>("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(props.username);
  const switchMode = (mode: any) => {
    setMode(mode);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginSuccess = (isLoggedIn: boolean, username: string) => {
    setLoggedIn(isLoggedIn);
    setUsername(username);
    props.onLoginSuccess(true, username);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
     {/*  {!loggedIn && ( */}
        <div>
          {(() => {
            switch (mode) {
              case "login":
                return (
                  <Login
                    username={username}
                    onLoginSuccess={handleLoginSuccess}
                  />
                );
              case "new":
                return <Signup />;
              case "forget":
                return <Remainder />;
            }
          })()}
          <div className="mode-switch-ctn">
            <Button
              type="link"
              style={
                mode !== "login" ? { display: "block" } : { display: "none" }
              }
              onClick={() => switchMode("login")}
            >
              <UserOutlined /> Login
            </Button>
            <Button
              type="link"
              style={
                mode !== "new"
                  ? { display: "block" }
                  : { display: "none", fontSize: 15 }
              }
              onClick={() => switchMode("new")}
            >
              <PlusOutlined /> New Account
            </Button>
            <Button
              type="link"
              style={
                mode !== "forget" ? { display: "block" } : { display: "none" }
              }
              onClick={() => switchMode("forget")}
            >
              Forget Password?
            </Button>
          </div>
        </div>
     {/*  )} */}
    </div>
  );
};
export default ModalContent;
