import { dbService,storageService } from "fbase";
import React, { useEffect, useState } from "react";
import {onSnapshot, query, orderBy, addDoc, collection } from "firebase/firestore";
import Post from "components/Post";
import {ref, uploadString,getDownloadURL,} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const Home= ({userObj}) => {
    const [post, setPost] = useState("");
    const [posts, setPosts] = useState([]);
   
    const [attachment, setAttachment] = useState("");
    useEffect(() =>{
        const q = query(
            collection(dbService, "posts"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const storyArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setPosts(storyArr);
        });
    }, []);
    const onSubmit = async(event) =>{ // 3분 11초
        event.preventDefault();
        let attachmentUrl ="";
        if(attachment !== ""){
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(attachmentRef, attachment, "data_url");
        attachmentUrl = await getDownloadURL(response.ref);
        }
        const postObj ={
            text : post,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        };
        await addDoc(collection(dbService, "posts"),postObj);
        setPost("");
        setAttachment("");
    };
    const onChange = (event) => {
        const {target:{value}} = event; // event안에 있는 target 안에 있는 value를 달라.
        setPost(value);
    };
    const onFileChange = (event) => {
        const {
            target: {files}
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttachment("")
    return (
        <div>
            <form onSubmit ={onSubmit}>
                <input value = {post} onChange={onChange} type = "text" placeholder="what' on your mind?" maxLength={120} />
                <input type = "file" accept = "image/*" onChange={onFileChange}/>
                <input type = "submit" value = "post"/>
                {attachment && (
                <div>
                    <img src ={attachment} width="50px" height = "50px"/>
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
                )}
            </form>
            <div>
                {posts.map((post) =>(
                  <Post key ={post.id} postObj = {post} 
                  isOwner = {post.creatorId === userObj.uid}/>
                ))} 

            </div>
        </div>
    );
};
export default Home;