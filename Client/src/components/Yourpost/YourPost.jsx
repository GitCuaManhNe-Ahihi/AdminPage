import React, { useContext, useEffect, useState } from "react";
import HeaderSearch from "../UI/HeaderSearch/HeaderSearch";
import { yourPostService } from "../../Service/PostService";
import { AppContext } from "../../Context/AppProvider";
import { Spin } from "antd";
import classes from "./YourPost.module.scss";
import CardContainer from "../UI/Card/CardContainer";
import CardP from "../UI/Card/CardP";
import { AuthContext } from "../../Context/AuthProvider";
export default function YourPost() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { handle } = useContext(AppContext);
  const {
    user
  } = useContext(AuthContext);
  useEffect(async () => {
    try {
      setLoading(true);
      if (user?.id) {
        let dataApi = await yourPostService(user?.id);
        setData(dataApi);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(async () => {
    try {
      if (user?.id) {
        let dataApi = await yourPostService(user?.id);
        setData(dataApi);
      }
    } catch {
    }
  }, [handle]);
  return (
    <>
      <HeaderSearch></HeaderSearch>
      <CardContainer>
        {loading ? (
          <div className={classes.loading}>
            <Spin size="large"></Spin>
          </div>
        ) : data.length > 0 ? (
          data?.map((item, index) => {
            return <CardP type={1} key={index} data={item}></CardP>;
          })
        ) : (
          <p className={classes.nodata}>no data</p>
        )}
      </CardContainer>
    </>
  );
}
