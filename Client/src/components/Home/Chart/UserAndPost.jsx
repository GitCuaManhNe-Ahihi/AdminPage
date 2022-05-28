import React, { useContext, useEffect } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { TranslateContext } from "../../../Context/TranslateProvider";
import { countService } from "../../../Service/PostService";
import classes from "./UserAndPost.module.scss";
export default function UserAndPost() {
  const { t } = useContext(TranslateContext);
  const up = false;
  const [count, setCount] = React.useState({});

  useEffect(async () => {
     let data = await countService();
    setCount(data)
  }
  , [])
  return (
    <div className={classes.card}>
      <div className={classes["card__total-row"]}>
        <span>{t("article")}: {count.datapost}</span>
        <span style={{ color: !up ? "green" : "red" }}>
          <IoMdArrowDropup
            style={{ transform: !up ? "" : "rotate(-180deg)" }}
          ></IoMdArrowDropup>
          {Math.floor(((count.datapost - count.datapost7daysago)/(count.datapost7daysago?count.datapost7daysago:1))*100)}% {t("compare_7_day")}
        </span>
      </div>
    </div>
  );
}
