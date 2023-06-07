import React, { useState } from "react";
import {
    Button,
    message,
    notification,
    Modal
} from "antd";
import { Spin } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import axios from "../config/axios";
import { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import KLine from "./KLine";

const data = [
    [['300989', '蕾奥规划'], ['300964', '本川智能'], ['301085', '亚康股份'], ['688228', '开普云'], ['002175', '东方智造'], ['600683', '京投发展'], ['688076', '诺泰生物'], ['000802', '北京文化'], ['002806', '华锋股份'], ['603097', '江苏华辰'], ['002880', '卫光生物'], ['603038', '华立股份'], ['600822', '上海物贸'], ['600732', '爱旭股份'], ['600257', '大湖股份'], ['603629', '利通电子'], ['605588', '冠石科技'], ['603912', '佳力图'], ['300949', '奥雅股份'], ['000014', '沙河股份'], ['002697', '红旗连锁'], ['603825', '华扬联众'], ['603887', '城地香江'], ['603889', '新澳股份'], ['001223', '欧克科技'], ['300500', '启迪设计'], ['300776', '帝尔激光'], ['301313', '凡拓数创'], ['301263', '泰恩康'], ['002892', '科力尔'], ['688053', '思科瑞'], ['603000', '人民网'], ['002043', '兔 宝 宝'], ['300094', '国联水产'], ['603070', '万控智造'], ['002553', '南方精工'], ['002323', '雅博股份'], ['300778', '新城市'], ['000530', '冰山冷热'], ['002959', '小熊电器'], ['603869', '新智认知'], ['300911', '亿田智能'], ['000736', '中交地产'], ['000797', '中国武夷'], ['300917', '特发服务'], ['301317', '鑫磊股份'], ['603399', '吉翔股份'], ['002432', '九安医疗'], ['002038', '双鹭药业'], ['600576', '祥源文旅'], ['000821', '京山轻机'], ['002508', '老板电器'], ['002126', '银轮股份'], ['600225', '卓朗科技'], ['300036', '超图软件'], ['300602', '飞荣达'], ['000158', '常山北明'], ['603896', '寿仙谷'], ['002638', '勤上股份'], ['600068', '葛洲坝']],
    [['300499', '高澜股份'], ['000809', '铁岭新城'], ['002292', '奥飞娱乐'], ['603918', '金桥信息'], ['601949', '中国出版'], ['600088', '中视传媒'], ['872808', '曙光数创'], ['300842', '帝科股份'], ['832662', '方盛股份'], ['600629', '华建集团'], ['300678', '中科信息'], ['600636', '国新文化'], ['835305', '云创数据'], ['300426', '唐德影视'], ['600757', '长江传媒'], ['601595', '上海电影'], ['300148', '天舟文化'], ['301128', '强瑞技术'], ['300856', '科思股份'], ['601858', '中国科传'], ['300469', '信息发展'], ['601811', '新华文轩'], ['300654', '世纪天鸿'], ['301048', '金鹰重工'], ['301089', '拓新药业'], ['301185', '鸥玛软件'], ['603357', '设计总院'], ['688108', '赛诺医疗'], ['601333', '广深铁路'], ['603083', '剑桥科技'], ['603518', '锦泓集团'], ['002858', '力盛体育'], ['300684', '中石科技'], ['301270', '汉仪股份'], ['600415', '小商品城'], ['601801', '皖新传媒'], ['001337', '四川黄金'], ['002229', '鸿博股份'], ['688525', '佰维存储'], ['601336', '新华保险'], ['300972', '万辰生物'], ['835670', '数字人'], ['834033', '康普化学'], ['300799', '*ST左江'], ['600605', '汇通能源'], ['832225', '利通科技'], ['688569', '铁科轨道'], ['300573', '兴齐眼药'], ['603058', '永吉股份'], ['830799', '艾融软件'], ['300002', '神州泰岳'], ['603322', '超讯通信'], ['601857', '中国石油'], ['300502', '新易盛'], ['601019', '山东出版'], ['300551', '古鳌科技'], ['300389', '艾比森'], ['300494', '盛天网络'], ['000526', '学大教育'], ['300042', '朗科科技'], ['603156', '养元饮品'], ['301239', '普瑞眼科'], ['601326', '秦港股份'], ['605598', '上海港湾'], ['600488', '津药药业'], ['601998', '中信银行'], ['688121', '卓然股份'], ['872925', '锦好医疗'], ['601000', '唐山港'], ['300025', '华星创业'], ['688410', '山外山'], ['600239', '云南城投'], ['002605', '姚记科技'], ['300232', '洲明科技'], ['000521', '长虹美菱'], ['002558', '巨人网络'], ['301231', '荣信文化'], ['300624', '万兴科技'], ['300669', '沪宁股份'], ['002712', '思美传媒'], ['688095', '福昕软件'], ['000950', '重药控股'], ['300280', '紫天科技'], ['000410', '沈阳机床'], ['002174', '游族网络'], ['600129', '太极集团'], ['688072', '拓荆科技'], ['301226', '祥明智能'], ['601928', '凤凰传媒'], ['300192', '科德教育'], ['600066', '宇通客车'], ['300788', '中信出版'], ['600329', 'XD达仁堂'], ['688147', '微导纳米'], ['300434', '金石亚药'], ['601989', '中国重工'], ['300516', '久之洋'], ['300308', '中际旭创'], ['600686', '金龙汽车'], ['600373', '中文传媒'], ['000885', '城发环境'], ['603019', '中科曙光'], ['300461', '田中精机'], ['300559', '佳发教育'], ['300600', '国瑞科技'], ['300533', '冰川网络'], ['000028', '国药一致'], ['300058', '蓝色光标'], ['300315', '掌趣科技'], ['600023', '浙能电力'], ['300418', '昆仑万维'], ['300235', '方直科技'], ['300491', '通合科技'], ['002546', '新联电子'], ['002351', '漫步者'], ['600105', '永鼎股份'], ['301052', '果麦文化'], ['002315', '焦点科技'], ['600750', '江中药业'], ['300713', '英可瑞'], ['002517', '恺英网络'], ['603258', '电魂网络'], ['002291', '遥望科技'], ['688358', '祥生医疗'], ['300620', '光库科技'], ['301205', '联特科技'], ['000600', '建投能源'], ['688258', '卓易信息'], ['300024', '机器人'], ['301103', '何氏眼科'], ['301183', '东田微'], ['300882', '万胜智能'], ['600072', '中船科技'], ['300444', '双杰电气'], ['601900', '南方传媒'], ['300545', '联得装备'], ['300288', '朗玛信息'], ['603196', '日播时尚'], ['300475', '香农芯创'], ['300031', '宝通科技'], ['688496', '清越科技']],
    [['001309', '德明利'], ['000917', '电广传媒'], ['002582', '好想你'], ['002605', '姚记科技'], ['300280', '紫天科技'], ['000504', '南华生物'], ['300007', '汉威科技'], ['603228', '景旺电子'], ['300370', '*ST安控']],
    [['600629', '华建集团'], ['301048', '金鹰重工'], ['002941', '新疆交建'], ['301001', '凯淳股份'], ['836892', '广咨国际'], ['300153', '科泰电源'], ['601168', '西部矿业'], ['300027', '华谊兄弟'], ['000911', '南宁糖业'], ['600248', '陕西建工'], ['605577', '龙版传媒'], ['301025', '读客文化'], ['600667', '太极实业'], ['002602', '世纪华通'], ['688488', '艾迪药业'], ['002280', '联络互动'], ['301052', '果麦文化'], ['300846', '首都在线']],
    [['605588', '冠石科技'], ['688108', '赛诺医疗'], ['300042', '朗科科技'], ['002173', '创新医疗'], ['600129', '太极集团']],
    [['300989', '蕾奥规划'], ['301085', '亚康股份'], ['603680', '今创集团'], ['002175', '东方智造'], ['600683', '京投发展'], ['002599', '盛通股份'], ['688076', '诺泰生物'], ['000802', '北京文化'], ['002292', '奥飞娱乐'], ['600892', '大晟文化'], ['603918', '金桥信息'], ['603097', '江苏华辰'], ['002880', '卫光生物'], ['603038', '华立股份'], ['600822', '上海物贸'], ['603779', '威龙股份'], ['600732', '爱旭股份'], ['001314', '亿道信息'], ['002902', '铭普光磁'], ['603629', '利通电子'], ['605588', '冠石科技'], ['605298', '必得科技'], ['002217', '合力泰'], ['000014', '沙河股份'], ['002992', '宝明科技'], ['601086', '国芳集团'], ['872808', '曙光数创'], ['002697', '红旗连锁'], ['300913', '兆龙互连'], ['603889', '新澳股份'], ['301313', '凡拓数创'], ['301263', '泰恩康'], ['300779', '惠城环保'], ['002892', '科力尔'], ['002995', '天地在线'], ['300960', '通业科技'], ['600679', '上海凤凰'], ['000004', 'ST国华'], ['000530', '冰山冷热'], ['603129', '春风动力'], ['600266', '城建发展'], ['603163', '圣晖集成'], ['300917', '特发服务'], ['688392', '骄成超声'], ['301120', '新特电气'], ['603679', '华体科技'], ['300856', '科思股份'], ['002038', '双鹭药业'], ['002713', '东易日盛'], ['301098', '金埔园林'], ['301035', '润丰股份'], ['600558', '大西洋'], ['002638', '勤上股份'], ['603268', '松发股份'], ['605289', '罗曼股份'], ['603685', '晨丰科技'], ['300740', '水羊股份'], ['002919', '名臣健康'], ['601801', '皖新传媒'], ['600601', '*ST方科'], ['002429', '兆驰股份'], ['003020', '立方制药'], ['002229', '鸿博股份'], ['688700', '东威科技'], ['600250', '南纺股份'], ['600237', '铜峰电子'], ['600068', '葛洲坝'], ['002321', 'ST华英'], ['000680', '山推股份']],
    [['301368', '丰立智能']],
    [['600995', '南网储能'], ['002019', '亿帆医药'], ['688560', '明冠新材'], ['300101', '振芯科技']]
]

const Recom = () => {
    const [stratagy, setStratagy] = useState(0);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [stockData, setStockData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('Title');

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStratagy(parseInt(event.target.value));
    };

    const radioGroupStyle = {
        marginBottom: '25px',
        fontSize: '16px',
    };
    const radioLabelStyle = {
        marginRight: '25px',
        fontSize: '16px',
    };

    const clickQuestionaire = () => {
        navigate('/questionnaire');
    }

    function getCurrentDate() {
        var currentDate = new Date();
        var year = String(currentDate.getFullYear());     // 获取当前年份
        var month = String(currentDate.getMonth() + 1);  // 获取当前月份，需要加1
        var day = String(currentDate.getDate());          // 获取当前日期

        // 将月份和日期转换为两位数格式
        if (Number(month) < 10) {
            month = '0' + month;
        }
        if (Number(day) < 10) {
            day = '0' + day;
        }

        var formattedDate = year + '-' + month + '-' + day;
        return formattedDate;
    }

    const handleClick = (ticker: string, name: string) => {
        setOpen(true);
        setLoading(true);
        setTitle(name);
        ticker = 'sz' + ticker
        axios.get('https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=' + ticker + ',day,,2023-06-08,300,qfq').then((data) => {
            let info = data.data.data[ticker].qfqday || data.data.data[ticker].day
            let res: [string, number, number, number, number][] = []
            res = info.map((item: any) => ({
                date: item[0],
                open: item[1],
                close: item[2],
                low: item[4],
                hign: item[3]
              }));
            console.log(res)
            setStockData(res)
        }).finally(() => {
            setLoading(false);
        });
    }

    const renderStockList = () => {
        const stockItems = data[stratagy];

        return (
            <div style={{
                height: '600px',
                overflowY: 'scroll',
                marginTop: '20px',
                fontSize: '20px',
                lineHeight: '30px',
                textAlign: 'center',
                letterSpacing: '0.2em',
                cursor: 'pointer'
            }}>
                <ul>
                    {stockItems.map(([code, name]) => (
                        <li key={code} onClick={() => handleClick(code, name)}>{`${code} - ${name}`}</li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div>
            <div style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
            }}>
                <h1 style={{ fontFamily: 'KaiTi, Arial, sans-serif', fontSize: '25px', marginBottom: '10px' }}>推荐策略</h1>
                <div style={radioGroupStyle}>
                    <label style={radioLabelStyle}>
                        <input
                            type="radio"
                            value="0"
                            checked={stratagy === 0}
                            onChange={handleOptionChange}
                        />
                        放量上涨
                    </label>
                    <label style={radioLabelStyle}>
                        <input
                            type="radio"
                            value="1"
                            checked={stratagy === 1}
                            onChange={handleOptionChange}
                        />
                        均线多头
                    </label>
                    <label style={radioLabelStyle}>
                        <input
                            type="radio"
                            value="2"
                            checked={stratagy === 2}
                            onChange={handleOptionChange}
                        />
                        停机坪
                    </label>
                    <label style={radioLabelStyle}>
                        <input
                            type="radio"
                            value="3"
                            checked={stratagy === 3}
                            onChange={handleOptionChange}
                        />
                        回踩年线
                    </label>
                    <label style={radioLabelStyle}>
                        <input
                            type="radio"
                            value="4"
                            checked={stratagy === 4}
                            onChange={handleOptionChange}
                        />
                        无大幅回撤
                    </label>
                    <label style={radioLabelStyle}>
                        <input
                            type="radio"
                            value="5"
                            checked={stratagy === 5}
                            onChange={handleOptionChange}
                        />
                        海龟交易法则
                    </label>
                    <label style={radioLabelStyle}>
                        <input
                            type="radio"
                            value="6"
                            checked={stratagy === 6}
                            onChange={handleOptionChange}
                        />
                        高而窄的旗形
                    </label>
                    <label style={radioLabelStyle}>
                        <input
                            type="radio"
                            value="7"
                            checked={stratagy === 7}
                            onChange={handleOptionChange}
                        />
                        放量跌停
                    </label>
                    <Button
                        type="primary"
                        onClick={clickQuestionaire}
                        style={{
                            left: '200px',
                            position: 'relative'
                        }}
                    >
                        用户风险评估自测
                    </Button>
                </div>
            </div>
            {renderStockList()}
            <Modal
                title={title}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                {loading && <Spin />}
                {!loading && (
                    <div style={{
                        height: '600px'
                    }}>
                        <KLine stockData={stockData}/>
                    </div>
                )}
                
                
            </Modal>

        </div >
    );
};

export default Recom;