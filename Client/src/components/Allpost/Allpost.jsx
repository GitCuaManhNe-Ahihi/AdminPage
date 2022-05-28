import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { AppContext } from "../../Context/AppProvider";
import { throttle } from "../../Helper";
import { postService } from "../../Service/PostService";
import CardContainer from "../UI/Card/CardContainer";
import CardP from "../UI/Card/CardP";
import HeaderSearch from "../UI/HeaderSearch/HeaderSearch";

export default function Allpost() {
  const { handle } = useContext(AppContext)
  const { data, mutate } = useSWR("article", postService)
  const [search, setSearch] = useState("")
  useEffect(() => {
    mutate();
  }
    , [handle])
    // const handleSearch = async() => {
    //     data = await postService.getSearch(search)
    // }
  return (
    <>
      <HeaderSearch setSearch={setSearch}></HeaderSearch>
      <CardContainer>
        {
          data?.map((item, index) => {
            return item.validator == 1 ? <CardP type={0} key={index} data={item}></CardP> : null
          })
        }
      </CardContainer>
    </>
  );
}
