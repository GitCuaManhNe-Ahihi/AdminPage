import { Modal, Input, Spin } from "antd";
import React, { useContext, useState,createRef, useEffect } from "react";
import { AppContext } from "../../../../Context/AppProvider";
import { TranslateContext } from "../../../../Context/TranslateProvider";
import { AuthContext} from "../../../../Context/AuthProvider";
import { changePasswordService } from "../../../../Service/UserService";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function ChangePassword() {
    const {t} = useContext(TranslateContext);
    const {user} = useContext(AuthContext);
    const {isOpenChangePassword, setIsOpenChangePassword,setIsOpenModal} = useContext(AppContext);
    const oldRef = createRef();
    const newRef = createRef();
    const [confirm,setConfirm] = useState("");
    const [notMatch,setNotMatch] = useState(false);
    const [loading,setLoading] = useState(false);
    const path = useNavigate()
    const handleOnchange = (e) => {
        setConfirm(e.target.value);
        if(e.target.value != newRef.current.input.value){
            setNotMatch(true)
        }
        else{
            setNotMatch(false);
        }
        console.log(e.target.value != newRef.current.input.value);
    }
    useEffect(() => {
        if(confirm == newRef.current?.input?.value){
            setNotMatch(false);
        }
    }, [newRef])
    const handleSubmit = async () => {
        try{ const old = oldRef.current?.input?.value;
             const news = newRef.current?.input?.value;
            if(old && news){
            if(!notMatch){
                setLoading(true);
                try{
                await changePasswordService ({old,news,id:user?.id});
                toast.success(t("change_password_success"));
                toast.error(t("your_session_has_expired_you_need_login_again"))
                setIsOpenChangePassword(false);
                setIsOpenModal(false);
                localStorage.setItem("token", "");
                path(`/login`)
                }
                catch(e){
                    toast.error(t("password_not_match"));
                }
            }
            else{
                toast.error(t("new_password_and_confirm_password_not_match"));
            }
        }else{
            toast.error(t("please_enter_your_password"));
        }
        }catch{
            toast.error(t("something_went_wrong"));
        }
        finally{
            setLoading(false);
        }
    }
  return (
    <Modal
    title={t("change_password")}
    visible={isOpenChangePassword}
    onOk={() => handleSubmit()}
    onCancel={() =>setIsOpenChangePassword(false)}
    okText={t("change")}
    cancelText={t("cancel")}
    destroyOnClose={true}
    closable={() => setIsOpenChangePassword(false)}
  > { 
      loading ? <Spin /> : <>
      <Input ref={oldRef} type={"password"} placeholder={t("old_password")}></Input>
      <Input ref={newRef} style={{margin:'10px 0'}} type={"password"} placeholder={t("new_password")}></Input>
      <Input style = {{borderColor:`${notMatch?'red':'rgb(217, 217, 217)'}`}} onChange={(e)=>handleOnchange(e)} type={"password"} placeholder={t("confirm_new_password")}></Input>
      </>
      }
  </Modal>
  )
}
