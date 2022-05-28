import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { statisticalFollowGenresService, statisticalFollowMonthService } from "../../Service/PostService";
import Posts from "./Chart/Posts";
import Spentime from "./Chart/Spentime";
import TrafficBar from "./Chart/TrafficBar";
import TypePost from "./Chart/TypePost";
import UserAndPost from "./Chart/UserAndPost";
import classes from "./Home.module.scss";
export default function Home() {
  const [statisticalPost, setStatisticalPost] = useState([])
  const [statisticalMoth, setStatisticalMoth] = useState([])
  useEffect(async () => {
    let data = await statisticalFollowGenresService()
    setStatisticalPost(data)
    let dataMoth = await statisticalFollowMonthService()
    setStatisticalMoth(dataMoth)

  }
    , [])
  return (
    <>
      <Row className={classes.row1} style={{ height: "30%", marginTop: 20 }}>
        <Col span={8}>
          <TrafficBar></TrafficBar>
        </Col>
        <Col span={8}>
          <Spentime></Spentime>
        </Col>
        <Col span={8}>
          <UserAndPost></UserAndPost>
        </Col>
      </Row>
      <Row className={classes.row2} style={{ height: "70%" }}>
        <Col span={16}>
          <Posts statisticalMoth={statisticalMoth}></Posts>
        </Col>
        <Col span={8}>
          <TypePost statisticalPost={statisticalPost}></TypePost>
        </Col>
      </Row>
    </>
  );
}
