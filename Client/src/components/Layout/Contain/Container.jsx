import React from "react";
import classes from "./Container.module.scss";

export default function Container(props) {
  
  return <div className={classes.container}>
    {props.children}
  </div>;
}
