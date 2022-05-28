import React,{useContext} from 'react'
import { Select } from 'antd'
import { CountryFlag } from "@kiwicom/orbit-components";
import { TranslateContext } from "../../../Context/TranslateProvider"
export default function SelectLanguage(props) {
  const  trans = useContext(TranslateContext);
  const changeLanguageHandle = (e) => {
    console.log(e)
    trans.changeLanguage(e);
}
  return (
    <Select
        showArrow={false}
        defaultValue={trans.lang}
        size="middle"
        bordered={false}
        style={{ marginTop: 15 }}
        onChange={(e)=>changeLanguageHandle(e)}
      >
        <Select.Option value="vie" >
          <CountryFlag code="vn"></CountryFlag>
        </Select.Option>
        <Select.Option value="en">
          <CountryFlag code="gb"></CountryFlag>
        </Select.Option>
        <Select.Option value="cn">
          <CountryFlag code="cn"></CountryFlag>
        </Select.Option>
      </Select>
  )
}
