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
        for (let data of dataArray) {
          data.create_date = data.create_date.slice(0, 10)
        }
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
      title: "stock-code",
      dataIndex: "id",
      key: "StockId",
    },
    {
      title: "stock-name",
      dataIndex: "name",
      key: "StockName",
    },

    {
      title: "record-low",
      dataIndex: "min_low",
      key: "StockMaxlow",
      sorter: (a: { min_low: any }, b: { min_low: any }) =>
        a.min_low - b.min_low,
    },
    {
      title: "record-high",
      dataIndex: "max_high",
      key: "StockMaxhigh",
      sorter: (a: { max_high: any }, b: { max_high: any }) =>
        a.max_high - b.max_high,
    },
    {
      title: "create-date",
      dataIndex: "create_date",
      key: "StockCreateDate",
      filters: [
        {
          text: "最近一周",
          value: "week",
        },
        {
          text: "最近一个月",
          value: "month",
        },
        {
          text: "最近三个月",
          value: "3month",
        },
        {
          text: "自定义时间",
          value: "custom",
        },
      ],
      onFilter: (value: string, record: { create_date: dayjs.Dayjs }) => {
        const now = dayjs();
        if (value === "week") {
          // 筛选最近一周的数据
          const weekAgo = now.subtract(7, "day");
          return record.create_date.isAfter(weekAgo);
        } else if (value === "month") {
          // 筛选最近一个月的数据
          const monthAgo = now.subtract(1, "month");
          return record.create_date.isAfter(monthAgo);
        } else if (value === "3month") {
          // 筛选最近三个月的数据
          // 筛选最近三个月的数据
          const threeMonthsAgo = now.subtract(3, "month");
          return record.create_date.isAfter(threeMonthsAgo);
        } else if (value === "custom") {
          // 筛选自定义时间的数据
          return (
            record.create_date.isAfter(startDate) &&
            record.create_date.isBefore(endDate)
          );
        }
      },
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: FilterDropdownProps) => (
        <div style={{ padding: 8 }}>
          <RangePicker
            value={[startDate, endDate]}
            onChange={(
              dates: RangeValue<Dayjs>,
              dateStrings: [string, string]
            ) => onDateFilterChange(dates)}
            onOk={() => {
              confirm();
            }}
          />
        </div>
      ),
    },

    {
      title: "action",
      key: "action",
      render: (_: any, record: any) => {
        return (
          <>
            {contextHolder}
            <Space size="middle">
              <Link to={`/stocklist/${record.id}?name=` + record.name}>
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
