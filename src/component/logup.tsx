import React, { useEffect, useState } from "react";
import {
  Typography,
  Form,
  Input,
  Button,
  Row,
  Col,
  Alert,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  AlertTwoTone,
  createFromIconfontCN,
  PlusOutlined,
  MailOutlined,
} from "@ant-design/icons";
import axios from "../config/axios";
const { Title, Text } = Typography;
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const Signup = () => {
  const [form] = Form.useForm();
  const [showAlert, setShowAlert] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShowSignup(true); // 组件渲染完成后将showSignup设置为true
    return () => {
      setShowSignup(false); // 组件卸载时将showSignup设置为false
    };
  }, []);

  const onFinish = (values: any) => {
    console.log("finish");
    setLoading(true); // 发送请求前禁用提交按钮
    const body = {
      name: values.name,
      password: values.password,
      username: values.username,
    };
    console.log(body);

    axios
      .post("/api/register", body)
      .then((response) => {
        return response.data; // 返回JSON格式的响应结果
      })
      .then((response) => {
        console.log(response);
          if (response.code===400) {
          message.success("Sign up success!");
          setShowSignup(false);
        } else  {
          message.error("User already exsist!");
        }
        return response.josn; // 返回JSON格式的响应结果
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        message.error("Sign up failed!");
      });
  };
  const handleSignup = () => {
    form.validateFields().then((values) => {
      if (values.password !== values.confirmPassword) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
        console.log(values);
      }
    });
  };

  return (
    <div
      /*  className="center" */
      style={{
        backgroundColor: "white",
        /*         boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        animation: "slideInRight 1s ease-out forwards", */
        zIndex: 1,
        padding: 50,
      }}
    >
      <Title level={2} style={{ color: "#1890ff" }}>
        <AlertTwoTone />E<span style={{ color: "#52c41a" }}>gos</span>
      </Title>
      <Title
        level={3}
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        Create New Account
      </Title>
      <Text
        type="secondary"
        style={{ fontSize: 20, display: "block", marginBottom: 20 }}
      >
        Please add your details
      </Text>
      {showAlert && (
        <Alert
          message="Password and Confirm Password do not match"
          type="error"
          closable
          style={{ marginBottom: 10 }}
        />
      )}
      <Form form={form} onFinish={onFinish} className="signup-form">
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="name"
            style={{ width: "400px", height: "40px", marginTop: 10 }}
          />
        </Form.Item>
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
            prefix={<UserOutlined />}
            placeholder="UserName"
            style={{ width: "400px", height: "40px", marginTop: 10 }}
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
            prefix={<LockOutlined />}
            placeholder="Password"
            style={{ width: "400px", height: "40px", marginTop: 10 }}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please provide a password",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
            style={{ width: "400px", height: "40px", marginTop: 10 }}
          />
        </Form.Item>{" "}
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "400px",
            height: "50px",
            backgroundColor: "#a0d911",
            marginTop: 30,
            fontSize: 18,
          }}
          onClick={handleSignup}
          icon={<PlusOutlined />}
          disabled={loading}
        >
          {loading ? "Loading..." : "Create Account"}
        </Button>
      </Form>

      <Row justify="center">
        <Col></Col>
      </Row>
    </div>
    /* </div> */
  );
};

export default Signup;
