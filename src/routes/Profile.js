import { authService} from "fbase";
import { updateCurrentUser, updateProfile } from "firebase/auth";
import React, {useState } from "react";

const Profile = ({userObj,refreshUser}) => {
const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);


    const onLogOutClick = () => authService.signOut();

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName){
            await updateProfile(authService,updateCurrentUser,{displayName:newDisplayName});
            refreshUser();
        }
    };
    return ( 
    <>
    <form onSubmit ={onSubmit}>
      <input onChange={onChange} type="text" placeholder="Display name" value ={newDisplayName}/>
      <input type = "submit" value = "Update profile"/>
    </form>
    <button onClick= {onLogOutClick}>Log Out</button>
    </>
    );
};
export default Profile;