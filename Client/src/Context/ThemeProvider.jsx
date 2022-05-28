import React,{useEffect} from "react";
export const ThemeContext = React.createContext();
var time = new Date().getHours();
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState('light');
   useEffect(()=>{
    var checkChangetime = setInterval(() => {time = new Date().getHours();},60*1000)
    if(time>=6 && time<=18){
      setTheme("light")
    }else{
      setTheme("dark")
    }
    return ()=>{
      clearInterval(checkChangetime)
    }
   }
   ,[time])
  const toggleTheme = () => {
    setTheme((pre) => (pre === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
