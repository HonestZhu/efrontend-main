import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { Stock } from "../type";
import KLine from "./KLine";
import "./../assets/css/stock.css";
import axios from "../config/axios";

const User = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
        个人页面
    </div>
  );
};

export default User;
