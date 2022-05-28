import React, { useContext } from "react";
import { TranslateContext } from "../../Context/TranslateProvider";
import { Empty } from "antd";
import base from "../Base.module.scss";
import { ThemeContext } from "../../Context/ThemeProvider";
import { ImSad } from "react-icons/im";
export default function Chat() {
  const { t } = useContext(TranslateContext);
  const { theme } = useContext(ThemeContext);
  return (
    <Empty
      image="https://gamek.mediacdn.vn/thumb_w/600/2018/9/21/avata-1537523384960737132555.gif"
      imageStyle={{
        height: 400,
        width: 400,
        border: "1px solid #e8e8e8",
        margin: "auto",
        borderRadius: "50%",
        overflow: 'hidden',
        boxShadow: '0px 0px 10px #080808'
      }}
      style={{ fontSize: "30px", marginTop: "50px" }}
      className={`${
        base[`text-color${theme == "dark" ? "--dark" : "--light"}`]
      }`}
      description={
        <span
          style={{
            display: "flex",
            alignItems: "center",
            margin: "auto",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {t("function_under_construction")}!<ImSad></ImSad>
        </span>
      }
    ></Empty>
  );
}
