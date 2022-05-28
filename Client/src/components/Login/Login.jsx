import { Button, Spin } from "antd";
import React, { useContext } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AppContext } from "../../Context/AppProvider";
import { ThemeContext } from "../../Context/ThemeProvider";
import { TranslateContext } from "../../Context/TranslateProvider";
import { loginService } from "../../Service/LoginService";
import base from "../Base.module.scss";
import Input from "../UI/Input/Input";
import ForgotPassword from "../UI/Modal/Login/ForgotPassword";
import SelectLanguage from "../UI/Select/SelectLanguage";
import SwitchTheme from "../UI/Switch/SwitchTheme";
import classes from "./Login.module.scss";
export default function Login() {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { t } = useContext(TranslateContext);
  const { theme } = useContext(ThemeContext);
  const { setIsOpenModalForgotPassword, setUser } = useContext(AppContext);
  const [hiddenPass, setHiddenPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dark = theme == "dark" ? true : false;
  const handleOnclickForgotPassword = () => {
    setIsOpenModalForgotPassword(true);
  };
  const handleOnclickLogin = async () => {
    try {
      setLoading(true);
      const {accesstoken} = await loginService({ email, password });
      if (accesstoken) {
        localStorage.setItem("token", JSON.stringify(accesstoken));
        window.location = '/'
      }
    } catch (err) {
      setMessage(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }

  };
  const handleHiddenPass = () => {
    setHiddenPass(!hiddenPass);
  };
  const hanldOnchangeEmail = (e) => {
    setEmail(e.target.value);
    setMessage("");
  };
  const hanldOnchangePassword = (e) => {
    setPassword(e.target.value);
    setMessage("");
  };
  const handClickPressEnter = (e) => {
    if (e.key === "Enter") {
      handleOnclickLogin();
    }
  }
  return (
    <>
      <div
        className={`${classes.login} ${base[`background-color${dark ? "--dark" : "--light"}`]
          }`}
      >
        <div className={classes["login__header"]}>
          <div className={classes["login-header__theme"]}>
            <SwitchTheme></SwitchTheme>
          </div>
          <div
            className={`${classes["login-header__language"]} ${classes[`login-header__language${dark ? "--dark" : "--light"}`]
              } `}
          >
            <SelectLanguage></SelectLanguage>
            <p>{t("language")}</p>
          </div>
        </div>
        <div
          className={`${classes["login__card"]} ${classes[`login__card${dark ? "--dark" : "--light"}`]
            }`}
        >
          <h1>{t("login")}</h1>
          <div className={classes.row} >
            <Input
              id="name"
              type="text"
              placeholder={t("name_account")}
              onChange={(e) => hanldOnchangeEmail(e)}
            ></Input>
          </div>
          <div className={`${classes.row} ${classes["password-field"]}`}>
            <Input
              id="password"
              type={`${!hiddenPass ? "password" : "text"}`}
              placeholder={t("password")}
              onChange={(e) => hanldOnchangePassword(e)}
              onKeyDown={(e) => handClickPressEnter(e)}

            ></Input>
            {hiddenPass ? (
              <AiFillEyeInvisible
                className={classes["password-field__eyes"]}
                onClick={handleHiddenPass}
              ></AiFillEyeInvisible>
            ) : (
              <AiFillEye
                onClick={handleHiddenPass}
                className={classes["password-field__eyes"]}
              ></AiFillEye>
            )}
          </div>
          <div className={classes.row}>{loading ? <Spin></Spin> : null}</div>
          <div className={classes.row}>
            {message ? (
              <span className={classes.errorMessage}>{message}</span>
            ) : null}
          </div>
          <div className={classes.row}>
            <Button
              type="primary"
              className={classes.button}
              onClick={handleOnclickLogin}
            >
              {t("login")}
            </Button>
          </div>
          <div className={classes.row}>
            <a onClick={handleOnclickForgotPassword}>{t("forgot_password")}</a>
            <a >{t("help")}</a>
          </div>
        </div>
      </div>
      <ForgotPassword></ForgotPassword>
    </>
  );
}
