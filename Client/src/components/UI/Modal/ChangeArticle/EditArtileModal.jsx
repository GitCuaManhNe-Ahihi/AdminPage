import { Button, Input, Modal, Result, Row, Spin, Typography } from "antd";
import React, { createRef, useContext, useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import styled from "styled-components";
import { AppContext } from "../../../../Context/AppProvider";
import { TranslateContext } from "../../../../Context/TranslateProvider";
import { publicId } from "../../../../Helper";
import { deleteImageService, editPostService } from "../../../../Service/PostService";
import SelectType from "../../Select/SelectType";
import EditorMCE from "../../TinyMCE/EditorMCE";
const InputStyled = styled(Input)`
  &&& {
    border: none;
    border-bottom: 1px solid #ccc;
    &[disabled] {
      background: transparent !important;
    }
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`;
export default function EditArtileModal() {
  const [genres, setGenres] = useState(null);
  const { t } = useContext(TranslateContext);
  const [editTitle, setEditTitle] = useState(false);
  const [openWarn, setOpenWarn] = useState(false);
  const { editModal, setEditModal, articleEdit, setIsOpenModalDetailArticle, setHandle } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [valueTitle, setValueTitle] = useState(articleEdit?.title);
  const valueContent = createRef("")
  const [public_id_o, setPublic_id_o] = useState(articleEdit?.public_id)
  const [takeValue, setTakeValue] = useState(false);
  const [valuedefault, setValuedefault] = useState(articleEdit?.content)
  const handleSave = () => {
    setTakeValue(true);
    setOpenWarn(true);
  };
  useEffect(() => {
    if (articleEdit) {
      setValueTitle(articleEdit.title);
      setGenres(articleEdit.genresId);
      setValuedefault(articleEdit.content)
      setPublic_id_o(articleEdit.public_id)
    }
  }, [articleEdit]);

  const handleConfirm = async () => {
    if (takeValue) {
      if (valueTitle && genres && valueContent) {
        try {
          setLoading(true)
          const data = valueContent?.current.editor.iframeElement?.contentDocument?.body?.innerHTML || ''
          const public_id = publicId(data)
          public_id_o.split(",").map(item => {
            if (!public_id.includes(item)) {
              deleteImageService(item)
            }
          })
          const status = await editPostService({ id: articleEdit.id, title: valueTitle, content: data, genresId: genres, public_id })
          if (!status.code) {
            setEditModal(false)
            setEditTitle(false)
          }
          setHandle(pre => !pre)
          setEditModal(false);
          setIsOpenModalDetailArticle(false);
        }
        catch (e) {
          console.log(e)
        }
      }
    }
  }

  return (
    <>
      <Modal
        title={t("edit_article")}
        visible={editModal}
        destroyOnClose={true}
        width={1024}
        style={{ top: 10 }}
        closable={false}
        footer={
          <>
            <Button key="back" type="primary" onClick={() => handleSave()}>
              {t("save")}
            </Button>
            <Button key="submit" type="primary" danger onClick={() => setEditModal(false)}>
              {t("cancel")}
            </Button>
          </>
        }
      >
        <Row>
          <Typography.Title level={5} style={{ display: "block" }}>
            {t("title")}
          </Typography.Title>
        </Row>
        <Row>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: 600,
              margin: "0 0 10px 0",
            }}
          >
            <InputStyled
              disabled={!editTitle}
              onPressEnter={() => setEditTitle(true)}
              onChange={(e) => setValueTitle(e.target.value)}
              value={valueTitle}
            ></InputStyled>
            <BsPencil
              style={{ margin: "0 5px", opacity: `${editTitle ? 1 : 0.7}` }}
              onClick={() => setEditTitle(!editTitle)}
            ></BsPencil>
          </div>
        </Row>
        <Row>
          <Typography.Title level={5} style={{ display: "block" }}>
            Chọn thể loại
          </Typography.Title>
        </Row>
        <Row justify={'start'} style={{ marginBottom: '10px' }}>
          <SelectType type={0} classstyle={'type-for-post'} valueGenres={articleEdit?.genresId} setGenres={setGenres}></SelectType>
        </Row>
        <Row>
          <EditorMCE ref={valueContent} takeValue={takeValue} size={600} initvalue={valuedefault} ></EditorMCE>
          {/* <Typography.Title level={5} style={{ display: "block" }}>
            Hình ảnh
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
          <UploadFile setBinaryFile={setBinaryFile}></UploadFile> */}
        </Row>
        {openWarn && (
          <Result
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "999",
              width: 600,
              background: "#fff",
              boxShadow: "0 0 2px rgba(0,0,0,0.6)",
            }}
            status="warning"
            title={t("you_sure_change")}
            extra={
              <>
                <Button
                  type="primary"
                  key="console"
                  onClick={() => handleConfirm()}
                >
                  {loading ? <Spin style={{ color: 'white' }}></Spin> : t("ok")}
                </Button>
                <Button
                  key="no"
                  onClick={() => setOpenWarn(false)}
                  type="primary"
                  danger
                >
                  {t("cancel")}
                </Button>
              </>

            }
          />
        )}
      </Modal>
    </>
  );
}
