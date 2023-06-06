import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { Stock } from "../type";
import KLine from "./KLine";
import "./../assets/css/user.css";
import axios from "../config/axios";

const User = () => {
  const [loading, setLoading] = useState(true);

  return (
      <div className="new-content">
          <div className="main-body">
              <div className="main-info">
                  <div className="main-title">
                      <span>股票管理推荐系统</span>
                  </div>
                  <div className="main-info-list">
                      <div className="main-info-list-item">
                          <div className="main-info-list-item-top">
                              <span>股票信息难以获取</span>
                          </div>
                          <div className="main-info-list-item-body">
                              <img src="https://img95.699pic.com/photo/40172/2015.jpg_wh300.jpg!/fh/300/quality/90" alt=""/>
                              <span className="main-info-list-item-body-h">信息推送</span>
                              <span className="main-info-list-item-body-t">股票信息推送<br/>各类股票信息详细获取</span>
                          </div>
                      </div>
                      <div className="main-info-list-item">
                          <div className="main-info-list-item-top">
                              <span>股票趋势难以判断</span>
                          </div>
                          <div className="main-info-list-item-body">
                              <img src="https://ts1.cn.mm.bing.net/th/id/R-C.949653a21497f5e83e727efe69d8e572?rik=QEhoiTvLJ30jvQ&riu=http%3a%2f%2fimg95.699pic.com%2fphoto%2f40170%2f6556.jpg_wh300.jpg!%2ffh%2f300%2fquality%2f90&ehk=THZFl60AGo%2f%2bKXupLPY49ODZprRCH%2bV01I7j9xxGiKE%3d&risl=&pid=ImgRaw&r=0" alt=""/>
                              <span className="main-info-list-item-body-h">可视化趋势</span>
                              <span className="main-info-list-item-body-t">股票涨跌可视化<br/>股票风险类型评估</span>
                          </div>
                      </div>
                      <div className="main-info-list-item">
                          <div className="main-info-list-item-top">
                              <span>不知道该买什么股票</span>
                          </div>
                          <div className="main-info-list-item-body">
                              <img src="https://img95.699pic.com/photo/50107/3929.jpg_wh300.jpg!/fh/300/quality/90" alt=""/>
                              <span className="main-info-list-item-body-h">个性化推荐</span>
                              <span className="main-info-list-item-body-t">股票信息定制化推荐<br/>了解更适合自己的股票</span>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="main-content">
                  {/*<div className="main-title">*/}
                  {/*    <span>功能详解</span>*/}
                  {/*</div>*/}
                  <div className="main-content-list">
                      <div className="main-content-list-item">
                          <div className="main-content-list-item-left">
                              <img src="https://pic2.zhimg.com/v2-bb6ee6c1110322be0e5c6d5c98f539c7_r.jpg" alt=""/>
                          </div>
                          <div className="main-content-list-item-right">
              <span className="main-content-list-item-title">
                股票信息推送
              </span>
                              <span className="main-content-list-item-text">
                一键获得各股市的详细股票信息
              </span>
                          </div>
                      </div>
                      <div className="main-content-list-item">
                          <div className="main-content-list-item-left">
                              <img src="https://ts1.cn.mm.bing.net/th/id/R-C.b9db646769cfb4d1f99e9515e24f0dcb?rik=RXuN2Kf2Q1889Q&riu=http%3a%2f%2fwww.yingjia360.com%2fuploadfile%2f2017%2f0301%2f20170301101922269.jpg&ehk=BjRSj%2bPClZhuQ7ZPaXLpIj%2bZotO8QLiZgsDte9nbxaE%3d&risl=&pid=ImgRaw&r=0" alt=""/>
                          </div>
                          <div className="main-content-list-item-right">
              <span className="main-content-list-item-title">
                股票趋势可视化
              </span>
                              <span className="main-content-list-item-text">
                可视化股票涨停跌，使股票信息一目了然
              </span>
                          </div>
                      </div>
                      <div className="main-content-list-item">
                          <div className="main-content-list-item-left">
                              <img src="https://ts1.cn.mm.bing.net/th/id/R-C.189188ba9e09dba2d3ea5b3ffca53f64?rik=QQoM8pUn8IHSyQ&riu=http%3a%2f%2fimg95.699pic.com%2fphoto%2f50091%2f7275.jpg_wh300.jpg!%2ffh%2f300%2fquality%2f90&ehk=nSldjyyvczXvXdheoFZ61wwr%2f7Bv3BE9uouzIzGtdho%3d&risl=&pid=ImgRaw&r=0" alt=""/>
                          </div>
                          <div className="main-content-list-item-right">
              <span className="main-content-list-item-title">
                个性化股票推荐
              </span><span className="main-content-list-item-text">
                选择更适合自己的股票
              </span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default User;
