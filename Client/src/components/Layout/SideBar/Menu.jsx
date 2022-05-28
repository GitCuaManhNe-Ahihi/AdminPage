import { List, Typography } from "antd";
import React, { useContext } from "react";
import {
  IoIosAlbums,
  IoIosChatbubbles,
  IoIosPaper,
  IoIosSend,
  IoMdCheckbox,
  IoMdExit,
  IoMdPeople
} from "react-icons/io";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../Context/ThemeProvider";
import { TranslateContext } from "../../../Context/TranslateProvider";
import base from "../../Base.module.scss";
import classes from "./Menu.module.scss";
const menu = [
  {
    title: "all_posts",
    icon:  (attribute)=><IoIosAlbums className={attribute} />,
    link: "/home/allpost"
  },
  {
    title:'your_article',
    icon: (attribute)=><IoIosPaper className={attribute} />,
    link: "/home/yourarticle"
  },
  {
    title: "post",
    icon: (attribute)=><IoIosSend className={attribute} />,
    link: "/home/post"
  },
  {
    title: "browse_articles",
    icon: (attribute)=><IoMdCheckbox className={attribute} />,
    link: "/home/browse_articles"
  },
  {
    title: "message",
    icon: (attribute)=><IoIosChatbubbles className={attribute} />,
    link: "/home/chat"
  },
  {
    title: "manage_member",
    icon: (attribute)=><IoMdPeople className={attribute}/>,
    link: "/home/member"
  },
  {
    title: "logout",
    icon: (attribute)=><IoMdExit className={attribute}/>,
    link: "/login"
  }
  
]

export default function Menu(props) {
  const { theme } = useContext(ThemeContext);
  const {t} = useContext(TranslateContext)
  const onclick = (e) => {
    localStorage.setItem("token", "");
  }
  return (
    <>
      <List className=  {classes['list-menu']} >
        {
          menu.map((item,index) => {
            return (
              <List.Item className={classes["menu-item"]} key={index} onClick={item.title==='logout'?onclick:null}>
             <Link to={{ pathname: item.link }} className={classes["menu-item__link"]}>
            {item.icon(`${classes["icon-menu"]} ${
                classes[theme == "dark" && "icon-menu--dark"]
              }`)} 
            {props.collapsed && (
              <Typography.Title
                level={4}
                className={`${classes["text"]} ${
                  base[theme == "dark" && "text-color--dark"]
                }`}
              >
               {t(item.title)}
              </Typography.Title>
            )}
          </Link>
        </List.Item>
            )
        })}
      </List>
    </>
  );
}
