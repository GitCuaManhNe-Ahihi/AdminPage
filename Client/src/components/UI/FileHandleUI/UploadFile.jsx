import React, { useState } from "react";
import classes from "./UploadFile.module.scss";
import i from '../../../assest/image/word.png'
import f from '../../../assest/image/document.png'
import { Spin } from "antd";

export default function UploadFile(props) {
  const [nameFile, setNameFile] = useState('')
  const [loading, setLoading] = useState(false)
  const handleOnchange = (e) => {
    readFile(e.target.files[0]);

  };
  const readFile = (f) => {
    try {
      setLoading(true)
      props.setBinaryFile(f)
      let nameF = f.name
      setNameFile(nameF)
    } catch {
      console.log("error");
    } finally {
      setLoading(false)
    }
  };
  return (
    <>
      <div style={{height:'60px'}}>
        <label htmlFor="docs">
          <div>

            <img
              id="imagefile"
              src={f}
              className={classes.imgfile}
            />
            <i style={{ color: 'red' }}>*only file .doc,.docx</i>
          </div>
        </label>
        <input
          style={{ display: "none" }}
          type={"file"}
          id="docs"
          name="docs"
          accept=".doc,.docx"
          onChange={e => handleOnchange(e)}
        />
      </div>
      <div>
        <div className={classes.shownamefile}>
          {loading ? <Spin></Spin> : null}
          {nameFile ? <>
            <img src={i} alt="" />
            <p>{nameFile}</p></> : null}
        </div>
      </div>
    </>
  );
}
