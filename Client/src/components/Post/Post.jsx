import { Button, Col, Input, Row, Spin, Typography } from "antd";
import React, { createRef, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthProvider";
import { TranslateContext } from "../../Context/TranslateProvider";
import { publicId } from "../../Helper";
import { postArticle } from "../../Service/PostService";
import CardContainer from "../UI/Card/CardContainer";
import SelectType from "../UI/Select/SelectType";
import EditorMCE from "../UI/TinyMCE/EditorMCE";
import classes from './Post.module.scss';
export default function Post() {
  const { t } = useContext(TranslateContext)
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState(null)
  const [loading, setLoading] = useState(false)
  const  valueContent = createRef(null);
  const [takeValue, setTakeValue] = useState(false);
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleOk = async () => {
    setTakeValue(true)
  }
  useEffect(async () => {
    if (takeValue) {
      if (title && genres && valueContent) {
        try {
          setLoading(true)
          const data = valueContent?.current.editor.iframeElement?.contentDocument?.body?.innerHTML || ''
          const public_id = publicId(data)
          await postArticle({ title: title, content: data, genresId: genres, userId: user.id,public_id:public_id })
          navigate("/home/yourarticle")
        }
        catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
          setTakeValue(false)
        }
      }
    }
  }, [takeValue])

  return (
    <CardContainer>
      {
        loading ? <div className={classes.loading}>
          <Spin size="large"></Spin>
        </div>
          : null
      }
      <div className={classes.container}>
        <Row>
          <Typography.Title level={1} style={{ display: "block" }}>
            {t("post")}
          </Typography.Title>
        </Row>
        <Row justify="space-between">
          <Col span={19}>
            <Row>
              <Typography.Title level={5} style={{ display: "block" }}>
                {t("title")}
              </Typography.Title>
            </Row>
            <Row>
              <Input onChange={e => setTitle(e.target.value)} ></Input>
            </Row>
          </Col>
          <Col span={4}>
          <Row>
            <Typography.Title level={5} style={{ display: "block" }}>
              {t("choose_genres")}
            </Typography.Title>
          </Row>
          <Row justify={'start'}>
            <SelectType type={0} classstyle={'type-for-post'} setGenres={setGenres}></SelectType>
          </Row>
          </Col>
        </Row>
       
        {/* <Row>
          <Typography.Title level={5} style={{ display: "block" }}>
            Chọn ảnh
          </Typography.Title>
        </Row>
        <Row>
          <LoadMultiIImage setArrayfiles={setArrayfiles}></LoadMultiIImage>
        </Row>
        <Row>
          <Typography.Title level={5} style={{ display: "block" }}>
            Tải file nội dung
          </Typography.Title>
        </Row>
        <Row style={{ flexDirection: 'column' }}>
          <UploadFile setBinaryFile={setBinaryFile}></UploadFile>
        </Row> */}
        <Row>
          <EditorMCE ref={valueContent} setTakeValue={setTakeValue} takeValue={takeValue}  initvalue={valueContent.current}></EditorMCE>
        </Row>
        <Row>
          <div className={classes.footer}>
            <Button type="primary" onClick={handleOk}>
              {t("post")}
            </Button>
            <Button type="primary" danger>
              {t("cancel")}
            </Button>
          </div>
        </Row>
      </div>
    </CardContainer>

  );
}
