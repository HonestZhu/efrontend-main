import React, { useState } from "react";
import { Typography, Form, Input, Button, Row, Col, Alert } from "antd";
import {
  UserOutlined,
  LockOutlined,
  AlertTwoTone,
  createFromIconfontCN,
  PlusOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
const { Title, Text } = Typography;
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const ForgetPassword = () => {
  const [form] = Form.useForm();
  const [showAlert, setShowAlert] = useState(false);

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
    /*     <div
      style={{
        position: "relative",
        height: "85vh",
        backgroundColor: "#f5f5f5",
      }}
    > */
    <div
      style={{
        backgroundColor: "white",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        animation: "slideInRight 1s ease-out forwards",
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
          fontSize: 25,
          fontWeight: "bold",
          marginBottom: 10,
          marginTop: 30,
        }}
      >
        Don’t worry, we’ve got your back
      </Title>
      <Text
        type="secondary"
        style={{ fontSize: 20, display: "block", marginBottom: 20 }}
      >
        Please enter your username or email
      </Text>

      <Form form={form}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter a valid credential",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username or Email"
            style={{ width: "400px", height: "50px", marginTop: 10 }}
          />
        </Form.Item>
      </Form>
      <Button
        type="primary"
        style={{
          width: "400px",
          height: "50px",
          backgroundColor: "#D3EAFD",
          color: "#0965AE",
          marginTop: 30,
          fontSize: 18,
        }}
        onClick={handleSignup}
        icon={<InfoCircleTwoTone />}
      >
        Password Reminder
      </Button>
      <Row justify="center">
        <Col>
          {/*           <Button
            type="link"
            style={{
              marginTop: 10,
              fontSize: 16,
            }}
          >
            <IconFont type="icon-tuichu" />
            Sign in
          </Button> */}
        </Col>
      </Row>
    </div>
    /* </div> */
  );
};

export default ForgetPassword;
