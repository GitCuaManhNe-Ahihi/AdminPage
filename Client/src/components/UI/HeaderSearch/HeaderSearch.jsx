import { Button, Col, Row } from 'antd';
import React, { useContext } from "react";
import { FcSearch } from 'react-icons/fc';
import { AppContext } from "../../../Context/AppProvider";
import { TranslateContext } from "../../../Context/TranslateProvider";
import SelectType from "../Select/SelectType";
import classes from './Search.module.scss';
const HeaderSearch = (props) => {
  const { t } = useContext(TranslateContext)
  const { setAddNewMember } = useContext(AppContext)
  return (
    <>
      <Row align="middle">
        <Col span={15}>
          <div className={classes["field-search"]}>
            <input name="searh" id="search" type="search" autoComplete='off' placeholder={t("input_search_text")} onChange={(e) => props.setSearch(e.target.value)}></input>
            <FcSearch size={35} className={classes['field-search__icon']}></FcSearch>
          </div>
        </Col>
        {!props.type && <>
          <Col span={4}>
            <SelectType type={0}></SelectType>
          </Col>
          <Col span={4}>
            <SelectType type={1}></SelectType>
          </Col></>}
        {
          props.type && <>
            <Col span={1}>
            </Col>
            <Col span={5} >
              <Button type="primary" onClick={() => setAddNewMember(true)}>
                {
                  t('add_member')
                }
              </Button>
            </Col>
          </>
        }

      </Row>
    </>
  );
}
export default HeaderSearch