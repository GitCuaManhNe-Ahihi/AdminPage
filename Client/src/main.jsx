import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import AppProvider from "./Context/AppProvider";
import ThemeProvider from "./Context/ThemeProvider";
import TranslateProvider from "./Context/TranslateProvider";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";

ReactDOM.render(
  <Router>
    <ThemeProvider>
      <TranslateProvider>
        <AuthProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </AuthProvider>
      </TranslateProvider>
    </ThemeProvider>
  </Router>
  ,
  document.getElementById("root")
);
