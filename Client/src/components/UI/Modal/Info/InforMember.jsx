import { Col, Modal, Row } from "antd";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../../../Context/AppProvider";
import { TranslateContext } from "../../../../Context/TranslateProvider";
import { statisticalPostOfUser, updateUserService } from "../../../../Service/UserService";
import AvatarUser from "../../Avatar/AvatarUser";
import ProgessChart from "./ProgessChart";
import RowModal from "./RowModal";
export default function InforMember() {
  const { user,isOpenModalInforMember, setIsOpenModalInforMember,setHandle } = useContext(AppContext)
  const { t } = useContext(TranslateContext);
  const [datacountpost, setDatacountpost] = React.useState({});
  const [object, setObject] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(async () => {
    try {
      if (user?.id) {
        let data = await statisticalPostOfUser(user?.id);
        setDatacountpost(data)
      }
    }
    catch (e) {
      console.log(e)
    }
  }
    , [isOpenModalInforMember,user])
  const handleSubmit = async () => {
    try{
      if(object){
        await updateUserService({...object,id:user?.id})
        setIsOpenModalInforMember(false);
        toast.success(t("change_success"))
        setHandle(pre=>!pre)
      }
    }catch{
      toast.error(t("something_went_wrong"))
    }
    finally{
      setIsLoading(false)
    }

  }
  const attributeF = ["name", "email", "address", "phoneNumber", "birthDay"];
  const field = ["name", "email", "address", "phone", "birthday"];
  const arrfield = field.map((item, index) =>
    <RowModal key={index}
      name={item}
      nameAttribute={attributeF[index]}
      canchange={ true}
      size={400}
      type={item == 'birthday' ? "date" : "input"}
      value={user?.[attributeF[index]]}
    ></RowModal>)
  return (
    <Modal
      title={t("your_profile")}
      visible={isOpenModalInforMember}
      onOk={() => handleSubmit()}
      onCancel={() => setIsOpenModalInforMember(false)}
      okText={t("ok")}
      cancelText={t("cancel")}
      confirmLoading={isLoading}
      width={1000}
      destroyOnClose={true}
    >
      <Row>
        <Col span={5}>
          <AvatarUser
            genres={user?.genres}
            image={user?.image}
            size={100}
            style={{ border: "2px solid black" }}
          ></AvatarUser>
        </Col>
        <Col span={19}></Col>
      </Row>
     {arrfield}
      <RowModal
       canchange={true}
        name={"female"}
        type="checkbox"
        options={[`${t("female")}`, `${t("male")}`]}
        defaultvalue={user?.gender}
      ></RowModal>
      <RowModal
        name={"role"}
        nameAttribute={'admin'}
        type="checkbox"
        setObject = {setObject}
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
