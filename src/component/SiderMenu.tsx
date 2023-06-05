import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Stock", "stock", <MailOutlined />),

  getItem("Create", "create", <AppstoreOutlined />),

  getItem("Favorite", "favorite", <SettingOutlined />),

  getItem(
    "Group",
    "grp",
    null,
    [getItem("Option 13", "13"), getItem("Option 14", "14")],
    "group"
  ),
];

const SiderMenu: React.FC = () => {
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    const menuKey = e.key;

    if (menuKey === "stock") {
      navigate("/stocklist");
    } else if (menuKey === "create") {
      navigate("/create");
    } else if (menuKey === "favorite") {
      navigate("/favorite");
    }
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 300, marginTop: 0 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};

export default SiderMenu;
