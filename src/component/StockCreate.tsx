import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  DatePicker,
  notification,
  message,
  FormInstance,
  Upload,
} from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import axios from "../config/axios";
import { UploadOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";

const StockCreate: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = (values: any) => {
    setLoading(true); // 发送请求前禁用提交按钮
    console.log("Success:", values);
    //校验通过后发送
    const body = {
      create_date: dayjs(values.create_date),
      code: values.code,
      max_high: values.max_high,
      min_low: values.min_low,
      name: values.name,
    };
    console.log(body);
    axios
      .post("/api/stock/add", body)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
        if (data.code === 200) {
          message.success("Create stock success!");
        } else {
          message.error("Create stock failed!");
        }
      })
      .catch((error) => {
        console.log(error);
        //alert("出现了网络错误");
        openNotification("bottomRight");
      })
      .finally(() => {
        setLoading(false); // 请求完成后启用提交按钮
      });

    const openNotification = (placement: NotificationPlacement) => {
      notification.error({
        message: "A network error has occurred",
        description: "Please check your network connection and try again later",
        placement: placement,
      });
    };
  };

  const handelUpload = (values: any) => {
    setLoading(true); // 发送请求前禁用提交按钮
    axios
      .post("/api/stock_data/upload")
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
        if (data.code === 200) {
          message.success("Upload success!");
        } else {
          message.error("Upload failed!");
        }
      })
      .catch((error) => {
        console.log(error);
        //alert("出现了网络错误");
      })
      .finally(() => {
        setLoading(false); // 请求完成后启用提交按钮
      });

    const openNotification = (placement: NotificationPlacement) => {
      notification.error({
        message: "A network error has occurred",
        description: "Please check your network connection and try again later",
        placement: placement,
      });
    };
  };

  /*   const openNotification2 = () => {
    notification.open({
      message: '添加成功！',
      description:
        '股票添加成功',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }; */
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm();
  const formRef = React.useRef<FormInstance>(null);
  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <div>
      <Form
        name="basic"
        ref={formRef}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="code"
          name="code"
          rules={[{ required: true, message: "Please input your stock code!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input your stock name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="create-date"
          name="create-date"
          rules={[
            {
              required: true,
              message: "Please input your stock's create-date!",
            },
            { type: "object", message: "Please select a valid date!" },
          ]}
        >
          <DatePicker />
        </Form.Item>

        {/*     <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </Button>
          <Button
            htmlType="button"
            onClick={onReset}
            disabled={loading}
            style={{
              marginLeft: 30,
            }}
          >
            {loading ? "Loading..." : "Reset"}
          </Button>
        </Form.Item>
      </Form>
      <Upload name="file" action="/api/stock/upload">
        <Button
          type="primary"
          disabled={loading}
          style={{
            marginLeft: 200,
          }}
        >
          <UploadOutlined /> Click to Upload
        </Button>
      </Upload>
    </div>
  );
};

export default StockCreate;
