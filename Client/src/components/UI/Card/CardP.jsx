import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../Context/AppProvider";
import { TranslateContext } from "../../../Context/TranslateProvider"
import classes from "./Card.module.scss";
import { Button } from 'antd'
export default function CardP(props) {
  const { setIsOpenModalDetailArticle, setArticle } = useContext(AppContext);
  const { t } = useContext(TranslateContext)
  const content = props.data.content;
  const index = content.indexOf("http://res.cloudinary.com/") ;
  const data = content.slice(index, content.indexOf("\"", index));
  const indexsub = content.indexOf(" ",content.indexOf("<h2>"));
  const subtitle = content.slice(indexsub, content.indexOf("</h2>"));
  const element = React.createElement( "p",{className:`${classes.subtitle}`},subtitle)
  return (
    <div className={`${classes.cardPcontainer} ${props.type == 1 ? classes[`border-validate-${props.data.validator}`] : null}`}>
      <div>
        <img
          src={data}
          className={classes.image}
        ></img>
      </div>
      <div className={classes["card-body"]}>
        <div className={classes["card-title"]}>
          <h5>{props.data.title}</h5>
        </div>
          {element}
        <div className={classes.button}>
          {
            !props.browse ? <>
              <a href="#" className={classes["viewBtn--detail"]} onClick={() => { setIsOpenModalDetailArticle(true); setArticle(props.data) }}>
                {t('view_detail')}
              </a>
              <a href={`http://localhost:6883/post?id=${props.data.id}`} target={'_blank'} className={classes["viewBtn--onweb"]}>
                {t('view_on_website')}
              </a></> : <>
              <Button type="primary" onClick={() => props.handle_Browse(props.data.id)} >
                {t('browse')}
              </Button>
              <Button danger type="primary" onClick={() => props.handle_Un_Browse(props.data.id)} >
                {t('un_browse')}
              </Button>
            </>
          }

        </div>
      </div>
    </div>
  );
}
