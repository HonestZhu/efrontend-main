import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Button, DatePicker, Space, Table, Tag, message } from "antd";
import { Link } from "react-router-dom";
import { Stock } from "../type";
import SearchStock from "./SearchStock";
import { EyeTwoTone, StarTwoTone } from "@ant-design/icons";
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import dayjs, { Dayjs } from "dayjs";
import { ColumnType } from "antd/lib/table";
import { FilterDropdownProps } from "antd/es/table/interface";
import axios from "../config/axios";
import "./../assets/css/stock.css";

function Favorite(props: any) {
  interface RecordType {
    create_date: string;
  }
  const [messageApi, contextHolder] = message.useMessage();
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

  const fetchDataFromAPI = () => {
    setLoading(true);
    axios
      .get("/api/userstock/favorite/page=0/size=10")
      .then((rst) => {
        setLoading(false);
        console.log(rst);
        const dataArray = Array.isArray(rst.data.result.content) ? rst.data.result.content : [];
        // for (let data of dataArray) {
        //   data.create_date = data.create_date.slice(0, 10)
        // }
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

  const onDateFilterChange = (dates: any) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  };

  const columns: any = [
    {
      title: "股票代码",
      dataIndex: "code",
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
      title: "操作",
      key: "action",
      render: (_: any, record: any) => {
        return (
          <>
            {contextHolder}
            <Space size="middle">
              <Link to={`/stocklist/${record.code}?name=` + record.name}>
                <EyeTwoTone />
              </Link>
              <button
                className="favorite-btn"
                onClick={() => {
                  axios
                    .post(`/api/userstock/delete`, {
                      id: 0,
                      sid: record.id,
                      uid: 0,
                    })
                    .then(function (response) {
                      console.log(response);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }}
              >
                <StarTwoTone />
              </button>
            </Space>
          </>

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
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        /* data = data.result.content; */
        const dataArray = Array.isArray(data) ? data : [data];
        setDataSource(dataArray);
      })
      .catch((error: any) => {
        setLoading(false);
        console.error(error);
      });
  };

  const data = searchResult.length > 0 ? searchResult : dataSource;
  /* console.log(dataSource); */

  return (
    <div className="stocklist">
      <Table
        loading={loading}
        dataSource={data}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
}
export default Favorite;
