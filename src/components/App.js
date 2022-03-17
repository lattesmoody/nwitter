import React, {useEffect, useState} from "react";
import AppRouter from "components/Router";
import {authService} from "../fbase";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [changeName,setChangeName] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user){
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile:(args)=> user.updateProfile(args),
        });
        if (user.displayName === null){
          const name = user.email.split("@")[0];
          user.displayName = name;
        }
      }else{
        setUserObj(null);
      }
      setInit(true); // init이 false일 경우 isLoggedIn에 해당하는 라우터 숨김 처리.
    });
  }, [])
  const refreshUser = () => {
    const user = authService.currentUser;
    
    });
  }
  return (
    <>
    {init ? <AppRouter 
    refreshUser = {refreshUser}isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing...."}
    <footer>&copy;{new Date().getFullYear()} chocodoit</footer>
    </>
  );
}

export default App;
