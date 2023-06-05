import { Menu } from "antd";
import React from "react";
import logo from "../stock.svg"
import SiderMenu from "./SiderMenu";
function Sider(props: any){
    return <div className="sider">
        <div className="sider-header">
            <img className="sider-header-logo" src={logo} alt="Logo"/>
            <h1 className="sider-header-brand">Stock Up</h1>
        </div>
        <div>
            <SiderMenu/>
        </div>
    </div>
}

export default Sider;