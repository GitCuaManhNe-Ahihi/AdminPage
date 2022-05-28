import { Col, Form, Input, Radio, Row } from "antd";
import React, { useContext, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { TranslateContext } from "../../../../Context/TranslateProvider";
import styled from "styled-components";
import { format } from "date-fns";
const StyleFormI = styled.div`
  &&& {
    display: flex !important;
    width: 600px;
    height: 30px;
    margin-bottom: 12px;
    .lable {
      display: block;
      width: 100px;
    }
    .input-Modal {
      display: flex;
      align-items: center;
      input {
        border: none;
        border-bottom: 1px dashed #ccc;
        height: 20px !important;
        width: ${(props) => props.size}px;
        &[disabled] {
          background: transparent !important;
          color: rgba(0, 0, 0, 0.7) !important;
        }
      }
      svg {
        margin-left: 10px;
        font-size: 20px;
      }
    }
  }
`;
const RowModel = (props, ref) => {
  const { t } = useContext(TranslateContext);
  const [change, SetChange] = useState(true);
  const changeHandle = (e) => {
    props.setObject(pre => ({ ...pre, [e.target.name]: e.target.value }))
  };
  return (
    <Row style={{ margin: '10px 0 !important' }}>
      <Col span={5}></Col>
      <Col span={19}>
        <StyleFormI size={props.size} type={props.type} name={props.name}>
          <span className="lable">{t(props.name)}</span>
          <div className="input-Modal">
            {props.type === "input" ? (
              <Input
                disabled={change}
                defaultValue={props.value}
                onChange={(e) => changeHandle(e)}
                onPressEnter={() => SetChange(true)}
                name={props.nameAttribute}
              ></Input>
            ) : props.type === "date" ? (
              <Input
                defaultValue={format(new Date(props.value), "yyyy-MM-dd")}
                name={props.nameAttribute}
                onChange={(e) => changeHandle(e)}
                onPressEnter={() => SetChange(true)}
                type={"date"}
                disabled={change}
              ></Input>
            ) : (
              <Radio.Group
                name={props.nameAttribute}
                defaultValue={props.defaultvalue}
                onChange={(e) => changeHandle(e)}
                disabled={change}
              >
                <Radio value={0}>{props.options[0]}</Radio>
                <Radio value={1}>{props.options[1]}</Radio>
              </Radio.Group>
            )}
            {
              !props.canchange ? <BsPencil
                style={{ opacity: `${change ? 0.6 : 1}` }}
                onClick={() => SetChange(pre => !pre)}
              ></BsPencil> : null
            }
          </div>
        </StyleFormI>
      </Col>
    </Row>
  );
}

export default RowModel;