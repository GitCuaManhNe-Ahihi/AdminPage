import { Button, Col, Modal, Row, Typography } from "antd";
import { format } from "date-fns";
import React, { useContext,useEffect } from "react";
import { AppContext } from "../../../../Context/AppProvider";
import { TranslateContext } from "../../../../Context/TranslateProvider";
import { deletePostService } from '../../../../Service/PostService';
import classes from './DetailArticle.module.scss';
export default function DetailArticleModal() {
  const { isOpenModalDetailArticle, setIsOpenModalDetailArticle, setEditModal, article,setArticleEdit,setHandle } =
    useContext(AppContext);
  const { t } = useContext(TranslateContext);
  const time = new Date(article.updatedAt ? article.updatedAt : new Date());
  const timeRelative = format(time, 'dd/MM/yyyy');
  const element = React.createElement( "div", { dangerouslySetInnerHTML: { __html: article.content } });
  const handleDeletePost = async () => {
    try
    {
      console.log(article.id);
      await deletePostService(article.id);
      setHandle(pre => !pre)
      setIsOpenModalDetailArticle(false);
      
    }
    catch (err)
    {
      console.log(err);
    }

  };
  return (
    <Modal
      title={t("article_detail")}
      visible={isOpenModalDetailArticle}
      width={1000}
      onCancel={() => setIsOpenModalDetailArticle(false)}
      footer={
        <>
          <Button type="primary" onClick={() => {setEditModal(true);setArticleEdit(article)}} style={{ background: "green" }}>
            {t("edit")}
          </Button>
          <Button type="primary" danger onClick={handleDeletePost}>
            {t("delete")}
          </Button>
          <Button type="primary" onClick={() => setIsOpenModalDetailArticle(false)}>{t("cancel")}</Button>
        </>
      }
      destroyOnClose={true}
    >
      <Row justify="space-between">
        <Col span={24}>
          <Row>
            <Col>
              <Typography.Title level={2}>
                {article.title}
              </Typography.Title>
              <Typography.Title level={4}>
                {article.subtitle}
              </Typography.Title>
              <div id="main" className={classes["main-container"]} style={{ height:'500px',width:'900px', overflowY: 'scroll',overflowX:'hidden !important' }}>
                {element}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ color: 'blueviolet' }} >
              <span>Tác giả: {article['user.name']}</span>
              <span style={{ margin: '0 20px' }}>Ngày xuất bản: {timeRelative}</span>
              <span>Thể loại: {article['genres.name']}</span>
            </Col>

          </Row>
        </Col>
      </Row>
    </Modal>
  );
}
