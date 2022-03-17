import { authService, dbService } from "fbase";
import { getDocs,collection,query,where, orderBy } from "firebase/firestore";
import React, { useEffect } from "react";

export default ({userObj}) => {
    const onLogOutClick = () => authService.signOut();

    const getMyPosts = async() =>{
        const q = query(collection(dbService,"posts"),
        where("creatorId", "==", userObj.uid)
        ,orderBy("createdAt")
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            console.log(doc.id,"=> ", doc.data());
        });
    };
    useEffect(()=>{
        getMyPosts();
    },[])

    return ( <>
    <button onClick= {onLogOutClick}>Log Out</button>
    </>
    );
};
