import React, {useEffect, useState} from "react";
import AppRouter from "components/Router";
import {authService} from "../fbase";



function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user){
        setIsLoggedin(true);
        setUserObj(user);
        if (user.displayName === null) {
          const name = user.email.split("@")[0];
          user.displayName = name;
        }
      }else{
        setIsLoggedin(false);
      }
      setInit(true); // init이 false일 경우 isLoggedIn에 해당하는 라우터 숨김 처리.
    });
  }, [])

  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing...."}
    <footer>&copy;{new Date().getFullYear()} chocodoit</footer>
    </>
  );
}

export default App;
