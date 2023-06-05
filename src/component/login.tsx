import React, { useEffect, useState } from "react";
import { Typography, Form, Input, Button, Row, Col, message } from "antd";
import Icon, { AlertTwoTone, createFromIconfontCN } from "@ant-design/icons";
import axios from "../config/axios";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const { Title, Text } = Typography;

const Login = (props: {
  username: string;
  onLoginSuccess: (isLoggedIn: boolean, username: string) => void;
}) => {
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(props.username);

  useEffect(() => {
    setShowSignup(true); // 组件渲染完成后将showSignup设置为true
    return () => {
      setShowSignup(false); // 组件卸载时将showSignup设置为false
    };
  }, []);
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    props.onLoginSuccess(true, username);
  };

  const onFinish = (values: any) => {
    setLoading(true); // 发送请求前禁用提交按钮
    const body = {
      username: values.username,
      password: values.password,
    };
    console.log(body);
    setLoading(true);
    axios
      .post("/api/login", body)
      .then((response) => {
        return response.data; // 返回JSON格式的响应结果
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
        if (data.code === 200) {
          message.success("Sign in success!");
          setShowSignup(false);
          props.onLoginSuccess(true, data.result);
        } else {
          message.error("Username or password incorrect!");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        message.error("Sign in failed!");
      });
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          /* boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", */
          /*  animation: "slideInRight 1s ease-out forwards", */
          zIndex: 1,
          padding: 50,
        }}
      >
        <Title
          level={2}
          style={{
            color:
              "#1890ff                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ",
          }}
        >
          <AlertTwoTone /> E<span style={{ color: "#52c41a" }}>gos</span>
        </Title>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 700,
            display: "block",
            marginBottom: 10,
            marginTop: 20,
          }}
        >
          Welcome to Our System
        </Text>
        <Text
          type="secondary"
          style={{ fontSize: 20, display: "block", marginBottom: 30 }}
        >
          Please sign in
        </Text>
        <Form onFinish={onFinish} className="login-form">
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter a username",
              },
            ]}
          >
            <Input
              placeholder="username"
              style={{ width: "400px", height: "50px" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please provide a password",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              style={{ width: "400px", height: "50px", marginTop: 10 }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "400px",
                height: "50px",
                marginTop: 10,
                marginBottom: 10,
                fontSize: 18,
              }}
              disabled={loading}
            >
              <IconFont type="icon-tuichu" />
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </Form.Item>
        </Form>
        <Row justify="space-between"></Row>
      </div>
    </>
  );
};

export default Login;
