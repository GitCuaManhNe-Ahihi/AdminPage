import React, { useContext } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";
import { ThemeContext } from "../../../Context/ThemeProvider";
import { TranslateContext } from "../../../Context/TranslateProvider";
import classes from "./SwitchTheme.module.scss";

export default function SwitchTheme({ collapsed,forStyle}) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const {t} = useContext(TranslateContext)
  return (
    <div
      className={`${classes.switch}  ${
        theme === "dark" && classes["switch--dark"]
      } ${classes[`switch${forStyle==='sidebar'?'--sidebar':null}`]}` }
      onClick={() => toggleTheme()}
    >
      <BsFillMoonStarsFill
        className={classes.Moon}
       
      />
      <FaSun className={classes.Sun}  />
      <span>{theme === "dark" ? t('dark') : t("light")}</span>
    </div>
  );
}
