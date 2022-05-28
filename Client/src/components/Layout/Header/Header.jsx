import { Row, Typography } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TranslateContext } from "../../../Context/TranslateProvider";
import base from "../../Base.module.scss";
import HeaderOption from "./HeaderOption";
export default function Header({ theme }) {
  const { t } = useContext(TranslateContext);
  return (
    <Row justify="space-between" align="middle">
      <Typography.Title level={1}>
        <Link className={base[`text-color${theme=='dark'?'--dark':'--light'}`]} to={{ pathname: "/home/statistical" }}>
          {t("Admin Báo Chí")}
        </Link>
      </Typography.Title>
      <HeaderOption></HeaderOption>
    </Row>
  );
}
