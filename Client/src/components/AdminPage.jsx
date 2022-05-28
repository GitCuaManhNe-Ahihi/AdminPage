import { Layout } from "antd";
import React, { useContext, useState,useEffect } from "react";
import { RiCopyrightLine } from "react-icons/ri";
import styled from "styled-components";
import { ThemeContext } from "../Context/ThemeProvider";
import Container from "./Layout/Contain/Container";
import Header from "./Layout/Header/Header";
import MenuSideBar from "./Layout/SideBar/MenuSideBar";
import base from "./Base.module.scss";
import classes from "./AdminPage.module.scss";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminPage() {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useContext(ThemeContext);
  const pathDefault = useNavigate()
  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };
  const nameBackGroundClass = `background-color${
    theme == "dark" ? "--dark" : "--light"
  }`;
  useEffect(() => {
    pathDefault("/home/statistical")
  },[])
  return (
    <>
    
      <Layout className={base[nameBackGroundClass]}>
        <Layout.Sider
          width={300}
          className={`${base[nameBackGroundClass]} ${classes['Layout__side']}`}
          collapsed={!collapsed}
        >
          <MenuSideBar
            collapsed={collapsed}
            toggleCollapsed={toggleCollapsed}
          ></MenuSideBar>
        </Layout.Sider>
        <Layout className={base[nameBackGroundClass]}>
          <Layout.Header
            className={`${base[nameBackGroundClass]} ${
              classes["Layout__header"]
            } ${
              classes[`Layout__header${theme == "dark" ? "--dark" : "--light"}`]
            } `}
          >
            <Header theme={theme}></Header>
          </Layout.Header>
          <Layout.Content>
            <Container>
              <Outlet></Outlet>
            </Container>
          </Layout.Content>
          <Layout.Footer
            className={`${base[nameBackGroundClass]} ${
              classes["Layout__footer"]
            } ${
              classes[`Layout__footer${theme == "dark" ? "--dark" : "--light"}`]
            }`}
          >
            <span>
              Copyright
              <RiCopyrightLine /> 2022 by GitCuaManhNe-Ahihi
            </span>
          </Layout.Footer>
        </Layout>
      </Layout>
    </>
  );
}
