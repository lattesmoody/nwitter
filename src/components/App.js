import React, {useEffect, useState} from "react";
import AppRouter from "components/Router";
import {authService} from "../fbase";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [userObj, setUserObj] = useState("");
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user){
        setIsLoggedin(true);
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile: (args) => 
          updateProfile(user, { displayName: user.displayName }),
        });
        if (user.displayName === null) {
          const name = user.email.split("@")[0];
          user.displayName = name;
        }
      }else{
        setIsLoggedin(false);
      }
      setInit(true); // init이 false일 경우 isLoggedIn에 해당하는 라우터 숨김 처리.
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile: (args) => 
      updateProfile(user, { displayName: user.displayName }),
    });
  }

  return (
    <>
    {init ?(
     <AppRouter 
      refreshUser={refreshUser}
      isLoggedIn={isLoggedIn} 
      userObj={userObj}
      /> 
      ) : ("Initializing...."
     )}
    <footer>&copy;{new Date().getFullYear()} chocodoit</footer>
    </>
  );
}

export default App;
