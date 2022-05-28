import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import React, { createContext, useState } from "react";
import { reactI18nextModule } from "react-i18next";
import {resources} from "../Translation/locales/language"
export const TranslateContext = createContext();
i18n
  .use(detector)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    supportedLngs: ["en", "vie", "cn"],
    fallbackLng: "vie", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    }
  });
export default function TranslateProvider(props) {
  const [language, setLanguage] = useState();
  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };
  const { t } = i18n;
  return (
    <TranslateContext.Provider
      value={{ lang: i18n.language, changeLanguage, t }}
    >
      {props.children}
    </TranslateContext.Provider>
  );
}
