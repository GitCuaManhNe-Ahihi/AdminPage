import { Modal, Input, Spin } from "antd";
import React, { useContext, useRef,createRef } from "react";
import { AppContext } from "../../../../Context/AppProvider";
import { TranslateContext } from "../../../../Context/TranslateProvider";
import { forgetPasswordService } from "../../../../Service/UserService"
import {toast} from "react-toastify";
export default function ForgotPassword() {
  const { t } = useContext(TranslateContext);
  const { isOpenModalForgotPassword, setIsOpenModalForgotPassword } = useContext(AppContext);
  const inputRef = createRef();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleSubmit = async () => {
    try {
      const value = inputRef.current.input.value
      if(value.length > 0){
      setLoading(true);
      try{
        const status = await forgetPasswordService(value)
        setIsOpenModalForgotPassword(false);
        toast.success(t("new_password_has_been_sent_to_your_email"));
      }catch(err){
        setError(t("email_is_not_valid"))
      }
      }
      else{
        setError(t("you_should_enter_your_email"))
      }
    } catch(error){
       toast.error(t("something_went_wrong"))
    }finally{
      setLoading(false);
    }
  }
  const handleCancel = () => {
    setIsOpenModalForgotPassword(false);
    inputRef.current.input.value = "";
  }
  return (
    <Modal
      title={t("forgotPassword")}
      visible={isOpenModalForgotPassword}
      onOk={() => handleSubmit()}
      onCancel={handleCancel}
      okText={t("send")}
      cancelText={t("cancel")}
      destroyOnClose={true}
      closable={() => setIsOpenModalForgotPassword(false)}
    > {
        loading ? <Spin /> : <Input ref={inputRef} type={"email"} placeholder={t("enter_your_email")}></Input>}
        {error && <p style={{color:"red"}}>{error}</p>}
    </Modal>
  );
}
