import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { Stock } from "../type";
import KLine from "./KLine";
import "./../assets/css/help.css";
import axios from "../config/axios";

const Help = () => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="help">
            <div className="group">
                <div className="quetion">k线图是什么？</div>
                <div className="answer">
                    <div className="line indent">K 线图是一种用于展示股票价格走势的图表，它是日本股市分析技术中的一种重要工具。K 线图通常由一组矩形组成，每个矩形代表一段时间内（如一天、一周或一个月）的股票价格波动情况。</div>
                    <div className="line indent">每个矩形的上下端分别表示开盘价和收盘价，矩形的上下两条线段则表示最高价和最低价。如果收盘价高于开盘价，则矩形通常用实心表示，反之则用空心表示。如果收盘价低于开盘价，那么这个矩形就被称为“阴线”；如果收盘价高于开盘价，那么这个矩形就被称为“阳线”。</div>
                    <div className="line indent">K 线图可以帮助投资者了解股票价格的走势和波动情况，从而更好地做出投资决策。例如，如果连续出现多个阳线，说明股票价格可能会上涨；如果出现多个阴线，则说明股票价格可能会下跌。此外，K 线图还可以结合其他技术指标和分析方法，如移动平均线、MACD、RSI 等，进一步分析股票的走势和趋势。</div>
                </div>
            </div>
            <div className="group">
                <div className="quetion">k线图中的那些参数是什么？</div>
                <div className="answer">
                    <div className="line"><b>时间周期：</b>K 线所代表的时间周期，例如日 K 线、周 K 线、月 K 线等。</div>
                    <div className="line"><b>开盘价：</b>K 线的开盘价，也就是该时间周期内的第一笔交易成交价。</div>
                    <div className="line"><b>收盘价：</b>K 线的收盘价，也就是该时间周期内的最后一笔交易成交价。</div>
                    <div className="line"><b>最高价：</b>K 线的最高价，也就是该时间周期内的最高成交价。</div>
                    <div className="line"><b>最低价：</b>K 线的最低价，也就是该时间周期内的最低成交价。</div>
                    <div className="line"><b>涨跌幅：</b>K 线的涨跌幅，是当前收盘价与前一时间周期的收盘价之间的差值，通常以百分比的形式表示。</div>
                    <div className="line"><b>成交量：</b>K 线的成交量，是该时间周期内的总成交量。</div>
                    <div className="line"><b>成交额：</b>K 线的成交额，是该时间周期内的总成交额，即成交量乘以该时间周期的平均价格。</div>
                </div>
            </div>
            <div className="group">
                <div className="quetion">MA5、MA10、MA20、MA30是什么？</div>
                <div className="answer">
                    <div className="line indent">MA5、MA10、MA20 和 MA30 是股票分析中常用的技术指标，它们分别代表了股票价格的五日、十日、二十日和三十日移动平均线。</div>
                    <div className="line indent">移动平均线是一种用来平滑股票价格走势的技术指标，它是以一段时间内的股票价格平均值为基础计算出来的。例如，MA5 就是每五个交易日的收盘价的平均值，MA10 就是每十个交易日的收盘价的平均值，以此类推。</div>
                    <div className="line indent">移动平均线能够帮助投资者更好地了解股票价格的趋势和波动情况。当股票价格在移动平均线上方时，通常被认为是一个上涨趋势，而当股票价格在移动平均线下方时，则被认为是一个下跌趋势。此外，当短期移动平均线上穿长期移动平均线时，也被认为是一个买入信号，而当短期移动平均线下穿长期移动平均线时，则被认为是一个卖出信号。</div>
                </div>
            </div>
            <div className="group">
                <div className="quetion">介绍一些这些股票策略</div>
                <div className="answer">
                    <div className="line"><b>放量上涨：</b>当股票价格在放量上涨时，通常意味着市场上存在大量的买单，预示着股票价格可能会继续上涨，投资者可以考虑买入该股票。</div>
                    <div className="line"><b>均线多头：</b>当股票价格的短期移动平均线（如 MA5 或 MA10）上穿长期移动平均线（如 MA20 或 MA30）时，被称为均线多头，预示着股票价格可能会上涨，投资者可以考虑买入该股票。</div>
                    <div className="line"><b>停机坪：</b>在股票价格上涨一段时间后，出现了一段时间的横盘整理，形成一个平台，这个平台就被称为停机坪。当股票价格突破停机坪时，通常意味着股票价格将继续上涨，投资者可以考虑买入该股票。</div>
                    <div className="line"><b>回踩年线：</b>年线是股票价格一年的移动平均线，回踩年线意味着股票价格回到了年线附近，通常被认为是一个买入机会，因为年线被认为是股票价格长期趋势的重要参考线。</div>
                    <div className="line"><b>无大幅回撤：</b>当股票价格连续上涨时，如果在上涨过程中没有出现大幅回撤，通常被认为是一个好的买入机会，因为这意味着市场上的买盘较强。</div>
                    <div className="line"><b>海龟交易法则：</b>海龟交易法则是一种趋势跟踪交易策略，它基于股票价格的趋势，通过设定止损和止盈来控制风险。该策略要求投资者在股票价格突破一定时间内的最高价时买入，同时设定止损和止盈点，以控制风险。</div>
                    <div className="line"><b>高而窄的旗形：</b>高而窄的旗形是一种图表形态，它形成于股票价格快速上涨后的一段时间内，价格波动范围缩小并形成一个三角形，这意味着股票价格可能会再次上涨，投资者可以考虑买入该股票。</div>
                    <div className="line"><b>放量跌停：</b>当股票价格在放量下跌时，通常意味着市场上存在大量的卖单，预示着股票价格可能会继续下跌，投资者可以考虑卖出该股票。</div>
                </div>
            </div>
        </div>
    )
};

export default Help;
