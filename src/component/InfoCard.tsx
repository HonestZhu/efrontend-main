import { useState, useMemo } from 'react';
import '../assets/css/InfoCard.css';

function InfoCard(props: any) {
  const [status, setStatus] = useState(props.status);

  const fontColor = useMemo(() => {
    if (status) {
      // 休市 灰色
      return { color: '#848484' };
    } else {
      // 涨 红色
      if (props.changePercent > 0) {
        return { color: '#FA2132' };
      } // 跌 绿色
      else if (props.changePercent < 0) {
        return { color: '#05AB49' };
      } // 不涨不跌 白色
      else {
        return { color: '#ffffff' };
      }
    }
  }, [props.changePercent, status]);

  return (
    <div className="card">
      <div className="title">{props.title}</div>
      <div className="data" style={fontColor}>
        {props.data}
      </div>
      <div className="detail" style={fontColor}>
        <div className="info">{props.changeNum}</div>&nbsp;
        <div className="info">{props.changePercent}%</div>
      </div>
    </div>
  );
}

export default InfoCard;