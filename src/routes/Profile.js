import { authService} from "fbase";
import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default ({userObj,refreshUser}) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    }
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event)=>{
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
        }
        refreshUser();
    };
    return ( 
    <>
    <form onSubmit = {onSubmit}>
        <input
         onChange={onChange}
         type = "text" 
         placeholder="Display name"
         value = {newDisplayName}
         />
        <input type = "submit" value ="Update Profile"/>
    </form>
    <button onClick= {onLogOutClick}>Log Out</button>
    </>
    );
};
