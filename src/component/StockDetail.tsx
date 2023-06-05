import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { Stock } from "../type";
import KLine from "./KLine";
import "./../assets/css/stock.css";
import axios from "../config/axios";
import { AxiosResponse } from "axios";

const StockDetail = () => {
  const [loading, setLoading] = useState(true);
  const [stockData, setStockData] = useState<any>();
  const { stock_id } = useParams();
  let name = decodeURI(useLocation().search.split("=")[1]);

  useEffect(() => {
    console.log("useEffect stock_id:", stock_id);
    setLoading(true);

    // let rst;
    // if(stock_id) rst = localStorage.getItem(stock_id);
    // if(rst) {
    //   let data : any = JSON.parse(rst);
    //   setStockData(data);
    // } else {
      
    // }

    axios
        .get(`/api/stock_data/get/?sid=` + stock_id)
        .then((data) => {
          data = data.data.result;
          console.log(data);
          if(stock_id) localStorage.setItem(stock_id, JSON.stringify(data));
          setStockData(data);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));

  }, [stock_id]);

  var rst = analyse(stockData);

  const upStyle = { color: "red" };
  const downStyle = { color: "green" };

  return (
    <div>
      {loading && <Spin />} {/* 展示加载中状态 */}
      {!loading && (
        <div className="stock-detail-container">
          <KLine stockData={stockData} />
          <div className="stock-detail-basic-info">
            <div className="stock-detail-title">{name}</div>
            <div className="stock-detail-data">
              <div className="stock-detail-data-left">
                <div className="stock-detail-text">
                  总成交量：{formatNumber(rst.volume)} 元
                </div>
                <div className="stock-detail-text">
                  历史最高：{formatNumber(rst.max)} 元
                </div>
                <div className="stock-detail-text">
                  历史最低：{formatNumber(rst.min)} 元
                </div>
                <div
                  className="stock-detail-text"
                  style={rst.delta > 0 ? upStyle : downStyle}
                >
                  日涨跌额：{formatNumber(rst.delta)} 元
                </div>
                <div
                  className="stock-detail-text"
                  style={rst.delta > 0 ? upStyle : downStyle}
                >
                  日涨跌率：{formatNumber(rst.deltaPercent * 100)}%
                </div>
              </div>
            </div>
            <div
              className="stock-detail-favorite-btn"
              onClick={() => {
                console.log("favorite");
                axios
                  .post(`/api/userstock/add`, {
                    id: 0,
                    sid: stock_id,
                    uid: 0,
                  })
                  .then(function (response) {
                    console.log(response);
                    alert("收藏成功！");
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }}
            >
              收藏
            </div>
            <a
              className="stock-detail-export-btn"
              href={
                `http://192.168.1.115:9595/api/stock_data/export/?sid=` +
                stock_id
              }
            >
              导出
            </a>
          </div>
        </div>
      )}
      {/* 当无数据时展示暂无数据文案 */}
    </div>
  );
};

function formatNumber(number: number): string {
  var inum = (number - (number % 1) || 0).toString(),
    result = "";
  while (inum.length > 3) {
    result = "," + inum.slice(-3) + result;
    inum = inum.slice(0, inum.length - 3);
  }
  if (inum) {
    result = inum + result;
  }
  var fnum = number.toString().split(".")[1];
  if (fnum) {
    result = result + "." + fnum.toString().slice(0, 2);
  }
  return result;
}

function analyse(data: Stock[]): {
  max: number;
  min: number;
  volume: number;
  delta: number;
  deltaPercent: number;
} {
  if (!data || !data.length)
    return { max: 0, min: 0, volume: 0, delta: 0, deltaPercent: 0 };
  var max = Number.MIN_VALUE,
    min = Number.MAX_VALUE,
    volume = 0,
    delta = data[data.length - 1].close - data[data.length - 1].open;
  var deltaPercent = delta / data[data.length - 1].open;
  for (let stock of data) {
    if (stock.high > max) max = stock.high;
    if (stock.low < min) min = stock.low;
    volume += Number(stock.volume);
  }

  return { max, min, volume, delta, deltaPercent };
}

export default StockDetail;
