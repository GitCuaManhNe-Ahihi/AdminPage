import { Avatar, Dropdown } from "antd";
import React, { useContext } from "react";
import { BsBellFill } from "react-icons/bs";
import { AppContext } from "../../../Context/AppProvider";
import { TranslateContext } from "../../../Context/TranslateProvider";
import {AuthContext} from "../../../Context/AuthProvider";
import SelectLanguage from '../../UI/Select/SelectLanguage'
import classes from "./Header.module.scss";
import ListNotification from "./ListNotification";
import AvatarUser from "../../UI/Avatar/AvatarUser";


export default function HeaderOption() {
const  a = useContext(TranslateContext);
const {setIsOpenModal} = useContext(AppContext)
const {user} = useContext(AuthContext) 
const handleClick = () => {
    setIsOpenModal(true)
}
  return (
    <div className={classes['header-option']}>
      <Dropdown overlay={ListNotification(a.t)}>
        <BsBellFill style={{ color: "#3399ff", fontSize: 25 }} />
      </Dropdown>
      <AvatarUser  size={40}
         image ={user?.image}
        style={{ border: "2px solid red" }}
        onClick={handleClick}></AvatarUser>
      <SelectLanguage></SelectLanguage>
    </div>
  );
}
