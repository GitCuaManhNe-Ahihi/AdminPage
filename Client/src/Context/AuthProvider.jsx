import React, { createContext, useEffect, useState,useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { AuthService } from '../Service/LoginService'
import { TranslateContext } from './TranslateProvider';
export const AuthContext = createContext({})
export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const pathname = window.location;
    const {t} = useContext(TranslateContext)
    const path = useNavigate();
    const [changUser, setChangUser] = useState(false);
    useEffect(async () => {
        let accesstoken = localStorage.getItem("token")
        if (accesstoken) {
            try {
                const { info } = await AuthService(accesstoken.substring(1, accesstoken.length - 1))
                setUser(info);
                if (info) {
                    if (pathname.pathname == '/login') {
                        path('/home')
                        toast.success(t("congratulation_login_succes_welcome_to_Admin_website"))
                    }
                    else{
                        path(pathname.pathname)
                    }
                }
                else {
                    if (pathname.pathname != '/login') {
                        path('/login')
                        toast.error(t("your_session_has_expired_you_need_login_again"))
                    }
                }
            }
            catch (err) {
                if (pathname.pathname != '/login') {
                    path('/login')
                    toast.error(t("your_session_has_expired_you_need_login_again"))
                }
            }
        }
        else {
            path('/login')
        }

    }, [path,changUser]);
    return (
        <AuthContext.Provider value={{ user, setUser,setChangUser }}>
            {children}
        </AuthContext.Provider>

    )
}
