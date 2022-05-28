import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import SwitchTheme from "../../UI/Switch/SwitchTheme";
import Menu from "./Menu";
import classes from "./Menusidebar.module.scss";
export default function MenuSideBar({ collapsed, toggleCollapsed }) {
  return (
    <div className={classes["menuSideBar"]} >
      <Button
        type="primary"
        onClick={() => toggleCollapsed()}
        style={{ marginBottom: 16, marginTop: 20, marginLeft: 15 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
        <Menu collapsed={collapsed}></Menu>
      <div className={classes['theme-imposible-mobile']}>
        <SwitchTheme forStyle={'sidebar'} collapsed={{ collapsed }}></SwitchTheme>
      </div>

    </div>
  );
}
