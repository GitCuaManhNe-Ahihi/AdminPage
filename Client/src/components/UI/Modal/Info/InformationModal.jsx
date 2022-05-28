import { Button, Col, Modal, Row, Spin } from "antd";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../../../Context/AppProvider";
import { AuthContext } from "../../../../Context/AuthProvider";
import { TranslateContext } from "../../../../Context/TranslateProvider";
import { statisticalPostOfUser, updateUserService } from "../../../../Service/UserService";
import AvatarUser from "../../Avatar/AvatarUser";
import ChangeAvartar from "./ChangeAvartar";
import ProgessChart from "./ProgessChart";
import RowModal from "./RowModal";

export default function InformationModal() {
  const { isOpenModal, setIsOpenModal, setIsOpenChangePassword } = useContext(AppContext);
  const { user,setChangUser} = useContext(AuthContext)
  const [datacountpost, setDatacountpost] = React.useState({});
  const [imageFile, setImageFile] = React.useState(null);
  const [object, setObject] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(async () => {
    try {
      if (user?.id) {
        let data = await statisticalPostOfUser(user?.id);
        setDatacountpost(data)
      }
    }
    catch  {
      toast.error(t("error_server"))
    }
  }
    , [isOpenModal, user])
  const { t } = useContext(TranslateContext);
  const handleSubmit = async () => {
    if (imageFile) {
      try {
        if(object){
        setIsLoading(true)
        const data = new FormData();
        data.append("image", imageFile.ofile);
        data.append("id", user?.id);
        let key = Object.keys(object);
        let value = Object.values(object);
        for (let i = 0; i < key.length; i++) {
          data.append(key[i], value[i]);
        }
        await updateUserService(data);
        toast.success(t("change_success"))
        setIsOpenModal(false);
        setChangUser(pre=>!pre);
      }}
      catch (e) {
      toast.error(t("something_went_wrong"))
      }finally{
       
      }
    }
    else {
      try {
        if(object){
          setIsLoading(true)
        const data = new FormData();
        data.append("id", user?.id);
        let key = Object.keys(object);
        let value = Object.values(object);
        for (let i = 0; i < key.length; i++) {
          data.append(key[i], value[i]);
        }
        await updateUserService(data);
        toast.success(t("change_success"))
        setIsOpenModal(false);
        setChangUser(pre=>!pre);
      }
      }
      catch (e) {
          toast.error(t("something_went_wrong"))
      }finally{
        setIsLoading(false)
      }
    }
  }
  const attributeF = ["name", "email", "address", "phoneNumber", "birthDay"];
  const field = ["name", "email", "address", "phone", "birthday"];
  const arrfield = field.map((item, index) =>
    <RowModal key={index}
      name={item}
      nameAttribute={attributeF[index]}
      setObject={setObject}
      canchange={item == 'email' ? true : false}
      size={400}
      type={item == 'birthday' ? "date" : "input"}
      value={user?.[attributeF[index]]}
    ></RowModal>


  )
  return (
    <Modal
      title={t("your_profile")}
      visible={isOpenModal}
      width={1000}
      destroyOnClose={true}
      style={{ top: "20px" }}
      onCancel={() => setIsOpenModal(false)}
      cancelText={t("cancel")}
      closable = {true}
      footer={[
        <Button key="submit" type="primary" onClick={() => handleSubmit()}>
          {isLoading?<Spin></Spin>:t("ok")}
        </Button>,
      ]}
    >
      <Row>
        <Col span={5}>
          <AvatarUser
            genres={user?.genres}
            image={imageFile ? imageFile.file : user?.image}
            size={100}
            style={{ border: "2px solid black" }}
          ></AvatarUser>
          <ChangeAvartar setImageFile={setImageFile}></ChangeAvartar>
        </Col>
        <Col span={16}></Col>
        <Col span={3}>
          <Button type="primary" onClick={() => setIsOpenChangePassword(true)} style={{ marginTop: '20px', marginLeft: '14px', backgroundColor: 'green' }}>
            {t("change_password")}
          </Button>
        </Col>
      </Row>
      {arrfield}
      <RowModal
        name={"gender"}
        nameAttribute={'gender'}
        setObject={setObject}
        type="checkbox"
        options={[`${t("female")}`, `${t("male")}`]}
        defaultvalue={user?.gender}
      ></RowModal>
      <RowModal
        canchange={true}
        name={"role"}
        type="checkbox"
        options={[t("admin"), t("collaborators")]}
        defaultvalue={user?.admin}
      ></RowModal>

      <Row style={{ marginTop: 20 }}>
        <Col span={5}></Col>
        <Col span={19}>
          <ProgessChart setDatacountpost={datacountpost}></ProgessChart>
        </Col>
      </Row>
    </Modal>
  );
}
