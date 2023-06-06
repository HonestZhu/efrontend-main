import React, { useState } from "react";
import { Layout, Menu, Avatar, Button, Modal } from "antd";
import Icon, {
  StockOutlined,
  PlusOutlined,
  HeartOutlined,
  AlertTwoTone,
  BgColorsOutlined,
  createFromIconfontCN,
  UserOutlined,
  SlidersOutlined,
  LikeOutlined
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Login from "./login";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Signup from "./logup";
import ForgetPassword from "./Remainder";
import ModalComponent from "./modal";
import axios from "../config/axios";

const { Header, Sider, Content } = Layout;
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const Main = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("light"); // 默认主题颜色为浅色
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light"); // 切换主题颜色
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("undefined");

  const chooseColor = () => {
    if (theme === "dark") return "white";
    else return "#0965AE";
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLoginSuccess = (loggedIn: boolean, username: string) => {
    setLoggedIn(loggedIn);
    setUsername(username);
  };

  const handleClickSignOut = () => {
    setLoggedIn(false);
    window.location.reload();
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        theme={theme as "light" | "dark"}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Title
            level={2}
            style={{
              color: "#1890ff",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <AlertTwoTone /> E
              <span
                style={{
                  color: "#52c41a",
                  display: collapsed ? "none" : "block",
                }}
              >
                gos
              </span>
            </div>
          </Title>
        </div>
        <div
          style={{
            paddingTop: "0px",
            background: theme === "light" ? "#D6EAF8" : "#34495E ",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{ margin: "15px auto" }}
              size={64}
              icon={<UserOutlined />}
              onClick={() => { navigate('/user') }}
            />
          </div>

          <p
            style={{
              color: chooseColor(),
              textAlign: "center",
              margin: 0,
              fontSize: "16px",
              fontFamily: "Cascadia Code",
              display: collapsed ? "none" : "block",
            }}
          >
            {username}
          </p>

          <br></br>
        </div>
        <Menu
          theme={theme as "light" | "dark"}
          defaultSelectedKeys={["2"]}
          mode="inline"
          style={{
            fontSize: "16px",
            fontFamily: "Cascadia Code",
            marginTop: 15,
          }}
        >
          <Menu.Item key="1" icon={<SlidersOutlined />} style={{ height: 60 }}>
            <Link to="/screen">行情</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<StockOutlined />} style={{ height: 60 }}>
            <Link to="/stocklist">股票</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<PlusOutlined />} style={{ height: 60 }}>
            <Link to="/create">创建</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<HeartOutlined />} style={{ height: 60 }}>
            <Link to="/favorite">收藏</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<LikeOutlined />} style={{ height: 60 }}>
            <Link to="/recommend">推荐</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            textAlign: "right",
            height: " 87px",
            background: theme === "light" ? "white" : "#001529",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          <div>
            <Button
              type="primary"
              shape="round"
              onClick={toggleTheme}
              icon={<BgColorsOutlined />}
              style={{ marginTop: 28, marginLeft: 10, marginRight: 1250 }}
            ></Button>
            <div style={{ marginTop: -65, marginRight: 40 }}>
              {!loggedIn && (
                <>
                  <Button
                    onClick={handleClick}
                    style={{
                      fontSize: "14px",
                      fontFamily: "Cascadia Code",
                      background: theme === "light" ? "#D6EAF8" : "#34495E ",
                      color: theme === "dark" ? "#fff" : "#000",
                    }}
                    size="large"
                  /* type="link" */
                  >
                    <UserOutlined />
                    Sign in
                  </Button>
                </>
              )}

              <Modal
                visible={isModalOpen && (!loggedIn)}
                onCancel={handleCancel}
                footer={null}
              >
                <ModalComponent
                  username={username}
                  onLoginSuccess={handleLoginSuccess}
                />
              </Modal>
              {loggedIn && (
                <>
                  <Button
                    onClick={handleClickSignOut}
                    size="large"
                    style={{
                      fontSize: "14px",
                      fontFamily: "Cascadia Code",
                      marginLeft: 20,
                      marginRight: 20,
                      background: theme === "light" ? "#D6EAF8" : "#34495E ",
                      color: theme === "dark" ? "#fff" : "#000",
                    }}
                  /*  type="link" */
                  >
                    <IconFont type="icon-tuichu" />
                    Sign out
                  </Button>
                </>
              )}
            </div>
          </div>
        </Header>
        {loggedIn && (
          <>
            <Content style={{ margin: "16px" }}>
              <div
                style={{ padding: 24, background: "#fff", minHeight: "100%" }}
              >
                <Outlet />
              </div>
            </Content>
          </>
        )}
      </Layout>
    </Layout>
  );
};

export default Main;
