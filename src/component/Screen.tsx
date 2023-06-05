import { Menu } from "antd";
// import React from "react";
import logo from "../stock.svg"
import SiderMenu from "./SiderMenu";
import InfoCard from './InfoCard';
import '../assets/css/screen.css';


import React, { useState, useEffect } from 'react';
// import KLine from './components/KLine';
import axios from 'axios';
import { log } from "console";
// import { baseurl } from '../public/baseurl';

function Screen() {
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const titles = ['A股', '港股', '美股', '期货', '外汇', '基金'];
    const [responseData, setResponseData] = useState(new Array(7).fill([]));
    const status: boolean[][] = Array.from({ length: 7 }, () => []);
    const [selectItem, setSelectItem] = useState(null);

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 1000 * 10);
        return () => clearInterval(intervalId);
    }, []);



    async function fetchData() {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://120.48.78.248:10001/api/common?format=json&key=zjc`);
            setResponseData(response.data.message);

            // 获取当前时间
            const now = new Date();

            for (let i = 0; i < response.data.message.length; i++) {
                for (let key in response.data.message[i]) {
                    const item = response.data.message[i][key];
                    // 将要比较的日期和时间拼接成一个完整的时间字符串
                    const targetTimeString = item.date + ' ' + item.time;
                    const targetTime = new Date(targetTimeString);

                    // 计算时间差（单位：毫秒）
                    const timeDiff = now.getTime() - targetTime.getTime();

                    // 将时间差转换为分钟数
                    const diffInMinutes = timeDiff / (1000 * 60);

                    // 判断时间差是否大于10分钟
                    const isDiffGreaterThan10Minutes = diffInMinutes > 10;
                    status[i].push(isDiffGreaterThan10Minutes);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleClick = (i: number, j: number) => {
        setVisible(true);
        setSelectItem(responseData[i][j]);
    };
    const handleOk = () => {
        setVisible(false);
        setSelectItem(null);
    };
    const handleCancel = () => {
        setVisible(false);
        setSelectItem(null);
    };

    return (
        <>
            {/* 遍历七个类别，其中港股没有数据 */}
            {Array.from({ length: 7 }, (_, i) => (
                <div key={i}>
                    {/* 只显示有数据的 */}
                    {responseData[i]?.length > 0 && (
                        
                        <div>
                            <div className="main-title">{titles[i]}</div>
                            <div className="cards">
                                {/* 显示一行 */}
                                {responseData[i].map((item: any, j: number) => (
                                    <div key={j}>
                                        <InfoCard
                                            className="card"
                                            title={item.name}
                                            data={item.price}
                                            changeNum={item.diff}
                                            status={status[i][j]}
                                            changePercent={item.increase_rate}
                                            onClick={() => handleClick(i, j)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            </>
    );
}

export default Screen;

// function Screen() {
//     return <div><InfoCard
//     title="AAPL"
//     data="145.12"
//     changeNum="+1.23"
//     changePercent="0.85"
//     status={false}
//   /></div>
// }

// export default Screen;

// function Sider(props: any){
//     return <div className="sider">
//         <div className="sider-header">
//             <img className="sider-header-logo" src={logo} alt="Logo"/>
//             <h1 className="sider-header-brand">Stock Up</h1>
//         </div>
//         <div>
//             <SiderMenu/>
//         </div>
//     </div>
// }

// export default Sider;