import React, { useState } from "react";
export const AppContext = React.createContext();
export default function AppProvider({ children }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalDetailArticle, setIsOpenModalDetailArticle] =
    useState(false);
  const [user, setUser] = useState(null);
  const [editModal, setEditModal] = useState(false)
  const [isOpenModalForgotPassword, setIsOpenModalForgotPassword] = useState(false);
  const [article, setArticle] = useState({});
  const [articleEdit, setArticleEdit] = useState({});
  const [handle, setHandle] = useState(true);
  const [addNewMember, setAddNewMember] = useState(false);
  const [isOpenModalInforMember, setIsOpenModalInforMember] = useState(false);
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);
  return (
    <AppContext.Provider
      value={{
        editModal,
        setEditModal,
        isOpenModal,
        setIsOpenModal,
        isOpenModalDetailArticle,
        setIsOpenModalDetailArticle,
        isOpenModalForgotPassword,
        setIsOpenModalForgotPassword,
        article, setArticle,
        articleEdit, setArticleEdit,
        handle, setHandle,
        addNewMember, setAddNewMember,
        user, setUser,
        isOpenModalInforMember, setIsOpenModalInforMember,
        isOpenChangePassword, setIsOpenChangePassword
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
