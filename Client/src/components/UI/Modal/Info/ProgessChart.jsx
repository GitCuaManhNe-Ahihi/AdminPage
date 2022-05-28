import React,{useContext}from "react";
import { Progress, Col, Row } from "antd";
import styled from "styled-components";
import { TranslateContext } from "../../../../Context/TranslateProvider";
const Infor = styled.div`
  margin-left: 50px;
  margin-top: 20px;
  .row {
    width: 200px;
    height: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .circle {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    span {
      margin-left: 10px;
    }
    p{
        margin-top: 10px;
    }
  }
`;

export default function ProgessChart({setDatacountpost}) {
const {t} = useContext(TranslateContext)
let data_ =  setDatacountpost.length >0?setDatacountpost:[{validator: -1, count: 0}];
let arr = [0,0,0]
data_?.map(item => arr[item.validator+1] = item.count)
let total = arr.reduce((a,b) => a+b)
  return (
    <>
      <Row>
        <Progress

          type="circle"
          strokeColor={{
            "0%": "#ccffcc",
            "100%": "#00e600",
          }}
          percent={Math.floor(arr[2]/total*100)}
        />
        <Progress
          type="circle"
          strokeColor={{
            "0%": "#ffff00",
            "100%": "#ffff00",
          }}
          percent={Math.floor(arr[1]/total*100)}
        />
        <Progress
          type="circle"
          strokeColor={{
            "0%": "#ffe6e6",
            "100%": "#990000",
          }}
          percent={Math.floor(arr[0]/total*100)}
        />

        <Infor>
          <div className="row">
            <div
              className="circle"
              style={{ backgroundColor: "#00ff00" }}
            ></div>{" "}
            <span>{t('post_success')}: {arr[2]}</span>
          </div>
          <div className="row">
            <div
              className="circle"
              style={{ backgroundColor: "#ffff00" }}
            ></div>{" "}
            <span>{t('post_wait')}: {arr[1]}</span>
          </div>
          <div className="row">
            <div
              className="circle"
              style={{ backgroundColor: "#ff0000" }}
            ></div>{" "}
            <span>{t('post_fail')}: {arr[0]}</span>
          </div>
          <div className="row">
            <p>{t('total')}: {total}</p>
          </div>
        </Infor>
      </Row>
    </>
  );
}
