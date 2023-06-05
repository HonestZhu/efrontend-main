import React, { useEffect, useState } from "react";
import { Button, DatePicker, Space, Table, Tag, Upload, message } from "antd";
import { Link } from "react-router-dom";
import { Stock } from "../type";
import SearchStock from "./SearchStock";
import { EyeTwoTone, StarTwoTone, UploadOutlined } from "@ant-design/icons";
import { RangeValue } from "rc-picker/lib/interface";
import dayjs, { Dayjs } from "dayjs";
import axios from "../config/axios";
import "./../assets/css/stock.css";
import { NotificationPlacement } from "antd/es/notification/interface";
import { log } from "console";

function SearchList(props: any) {
  const [dataSource, setDataSource] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<Stock[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchField, setSearchField] = useState("name");

  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);

  const { RangePicker } = DatePicker;

  interface FilterDropdownProps {
    setSelectedKeys: (keys: string[]) => void;
    selectedKeys: string[];
    confirm: () => void;
    clearFilters: () => void;
  }
  const handelUpload = (values: any) => {
    setLoading(true); // 发送请求前禁用提交按钮
    axios
      .post("/api/stock/upload")
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
  };
  const fetchDataFromAPI = () => {
    setLoading(true);
    axios
      .post("/api/stock?pages=0&size=10&sort=id")
      .then((response) => {
        return response.data; // 返回JSON格式的响应结果
      })
      .then((data) => {
        setLoading(false);
        console.log(data)
        data = data.result.content;
        const dataArray = Array.isArray(data) ? data : [data];
        // for(let data of dataArray) {
        //   data.create_date = data.create_date.slice(0, 10)
        // }
        setSearchResult(dataArray);
        setDataSource(dataArray);
      })
      .catch((error: any) => {
        setLoading(false);
        console.error(error);
      });
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const onDateFilterChange = (dates: RangeValue<Dayjs>) => {
    console.log(dates);
    if (dates) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);

      const filteredData = dataSource.filter((record) => {
        const date = dayjs(record.create_date);
        return (
          date.isAfter(dates[0] ?? "1970-01-01") &&
          date.isBefore(dates[1] ?? dayjs())
        );
      });
      setSearchResult(filteredData);
      console.log(searchResult);
    }
  };

  const columns: any = [
    {
      title: "股票代码",
      dataIndex: "sid",
      key: "StockId",
    },
    {
      title: "股票名",
      dataIndex: "name",
      key: "StockName",
    },

    {
      title: "最低价",
      dataIndex: "min_low",
      key: "StockMaxlow",
      sorter: (a: { min_low: any }, b: { min_low: any }) =>
        a.min_low - b.min_low,
    },
    {
      title: "最高价",
      dataIndex: "max_high",
      key: "StockMaxhigh",
      sorter: (a: { max_high: any }, b: { max_high: any }) =>
        a.max_high - b.max_high,
    },
    {
      title: "买入价",
      dataIndex: "buy_price",
      key: "BuyPrice",
      sorter: (a: { value: any }, b: { value: any }) => a.value - b.value,
    },
    {
      title: "卖出价",
      dataIndex: "sell_price",
      key: "SellPrice",
      sorter: (a: { value: any }, b: { value: any }) => a.value - b.value,
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: any) => {
        return (
          <Space size="middle">
            <Link to={`/stocklist/${record.sid}?name=` + record.name}>
              <EyeTwoTone />
            </Link>
            <button
              className="favorite-btn"
              onClick={() => {
                axios
                  .post(`/api/userstock/add`, {
                    id: 0,
                    sid: record.id,
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
              <StarTwoTone />
            </button>
          </Space>
        );
      },
    },
  ];

  const handleSearch = (keyword: string, field: string) => {
    setLoading(true);
    let url;
    if (field === "name") {
      url = `/api/stock/get_name?stockName=${keyword}`;
    } else if (field === "code") {
      url = `/api/stock/get_code?stockCode=${keyword}`;
    } else {
      url = "/api/stock?pages=0&size=10&sort=id";
    }
    setSearchKeyword(keyword);
    setSearchField(field);
    axios
      .post(url)
      .then((response) => {
        return response.data.result; // 返回JSON格式的响应结果
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
        const dataArray = Array.isArray(data) ? data : [data];
        setSearchResult(dataArray);
        console.log(searchResult);
      })
      .catch((error: any) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <div className="stocklist">
      <div style={{ display: "flex", alignItems: "center" }}>
        <SearchStock onSearch={handleSearch} />
        <Upload
          name="file"
          action="/api/stock_data/upload"
          //onChange={handelUpload}
        >
          <Button
            type="primary"
            disabled={loading}
            style={{ marginLeft: 500, marginBottom: 20 }}
          >
            <UploadOutlined /> Click to Upload
          </Button>
        </Upload>
      </div>
      <Table
        loading={loading}
        dataSource={searchResult}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
}

export default SearchList;
