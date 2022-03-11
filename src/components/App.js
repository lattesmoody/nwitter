import React, {useEffect, useState} from "react";
import AppRouter from "components/Router";
import {authService} from "../fbase";



function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedin] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user){
        setIsLoggedin(true);
      }else{
        setIsLoggedin(false);
      }
      setInit(true); // init이 false일 경우 isLoggedIn에 해당하는 라우터 숨김 처리.
    });
  }, [])

  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing...."}
    <footer>&copy;{new Date().getFullYear()} chocodoit</footer>
    </>
  );
}

export default App;
