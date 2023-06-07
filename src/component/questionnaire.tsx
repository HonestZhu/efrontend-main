import React, { useState } from "react";
import {
    Button,
    message,
    notification,
} from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import axios from "../config/axios";
import { CSSProperties } from 'react';

function Questionnaire() {
    const [age, setAge] = useState(''); // 年龄
    const [income, setIncome] = useState(''); // 年收入
    const [investmentGoal, setInvestmentGoal] = useState(''); // 投资目标
    const [investmentExperience, setInvestmentExperience] = useState(''); // 投资经验
    const [loading, setLoading] = useState(false);

    const formGroup = {
        marginBottom: '25px',
        fontSize: '16px',
    };
    const formContainer: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '50%',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        const ageScore = parseInt(age, 10);
        const incomeScore = parseInt(income, 10);
        const investmentGoalScore = parseInt(investmentGoal, 10);
        const investmentExperienceScore = parseInt(investmentExperience, 10);

        // 计算总得分
        const score = ageScore + incomeScore + investmentGoalScore + investmentExperienceScore;

        axios
            .get("api/userstock/RiskType/" + score)
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .then((data) => {
                console.log(data);
                setLoading(false);
                if (data.code === 200) {
                    message.success(data.result);
                } else {
                    message.error("something wrong");
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
        console.log('提交表单');
    }

    const openNotification = (placement: NotificationPlacement) => {
        notification.error({
            message: "A network error has occurred",
            description: "Please check your network connection and try again later",
            placement: placement,
        });
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={formContainer}>
                <h1 style={{ fontFamily: 'KaiTi, Arial, sans-serif', fontSize: '25px' }}>用户问卷</h1>
                <form onSubmit={handleSubmit}>
                    <div style={formGroup}>
                        <label>1. 你的年龄是多少？</label>
                        <br />
                        <input type="radio" name="age" value="1" onChange={(e) => setAge(e.target.value)} /> 18-25
                        <br />
                        <input type="radio" name="age" value="2" onChange={(e) => setAge(e.target.value)} /> 26-35
                        <br />
                        <input type="radio" name="age" value="3" onChange={(e) => setAge(e.target.value)} /> 36-45
                        <br />
                        <input type="radio" name="age" value="4" onChange={(e) => setAge(e.target.value)} /> 46-55
                        <br />
                        <input type="radio" name="age" value="5" onChange={(e) => setAge(e.target.value)} /> 56-65
                        <br />
                        <input type="radio" name="age" value="6" onChange={(e) => setAge(e.target.value)} /> 65以上
                    </div>
                    <div style={formGroup}>
                        <label>2. 你的年收入是多少？</label>
                        <br />
                        <input type="radio" name="income" value="1" onChange={(e) => setIncome(e.target.value)} /> 5万以下
                        <br />
                        <input type="radio" name="income" value="2" onChange={(e) => setIncome(e.target.value)} /> 5万-10万
                        <br />
                        <input type="radio" name="income" value="3" onChange={(e) => setIncome(e.target.value)} /> 10万-20万
                        <br />
                        <input type="radio" name="income" value="4" onChange={(e) => setIncome(e.target.value)} /> 20万-50万
                        <br />
                        <input type="radio" name="income" value="5" onChange={(e) => setIncome(e.target.value)} /> 50万以上
                    </div>
                    <div style={formGroup}>
                        <label>3. 你的投资目标是什么？</label>
                        <br />
                        <input type="radio" name="investmentGoal" value="1" onChange={(e) => setInvestmentGoal(e.target.value)} /> 资产保值
                        <br />
                        <input type="radio" name="investmentGoal" value="2" onChange={(e) => setInvestmentGoal(e.target.value)} /> 稳定收入
                        <br />
                        <input type="radio" name="investmentGoal" value="3" onChange={(e) => setInvestmentGoal(e.target.value)} /> 资产增值
                        <br />
                        <input type="radio" name="investmentGoal" value="4" onChange={(e) => setInvestmentGoal(e.target.value)} /> 高风险高收益
                    </div>
                    <div style={formGroup}>
                        <label>4. 你有多少投资经验？</label>
                        <br />
                        <input type="radio" name="investmentExperience" value="1" onChange={(e) => setInvestmentExperience(e.target.value)} /> 无经验
                        <br />
                        <input type="radio" name="investmentExperience" value="2" onChange={(e) => setInvestmentExperience(e.target.value)} /> 1-3年
                        <br />
                        <input type="radio" name="investmentExperience" value="3" onChange={(e) => setInvestmentExperience(e.target.value)} /> 3-5年
                        <br />
                        <input type="radio" name="investmentExperience" value="4" onChange={(e) => setInvestmentExperience(e.target.value)} /> 5年以上
                    </div>
                    <Button type="primary" htmlType="submit" disabled={loading}>
                        {loading ? "Loading..." : "Submit"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Questionnaire;