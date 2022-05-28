import { Avatar } from "antd";
import React from "react";
export default function AvatarUser(props) {
  return (
    <>
      <Avatar
        src={
          props.image
        }
        {...props}
      ></Avatar>
    </>
  );
}
