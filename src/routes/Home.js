import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import {onSnapshot, query, orderBy, addDoc, collection } from "firebase/firestore";
import Post from "components/Post";

const Home= ({userObj}) => {
    const [post, setPost] = useState("");
    const [posts, setPosts] = useState([]);
    // const getposts = async () => {
    //     const dbposts = await getDocs(collection(dbService, "posts"));
    //     dbposts.forEach((document) => {
    //         const storyObject = {
    //             ...document.data(), // 가져온 데이터 언팩킹(ES6 강의 참조 - spread attribute)
    //             id: document.id,
    //         };
    //       setPosts((prev) => [storyObject, ...prev]);
    //       // set~ 함수 사용 시 값 대신에 함수를 전달 가능.
    //       // 함수 전달하면 리액트는 이전 값에 접근할 수 있게 해준다.
    //       // 바로 위 함수는 배열 리턴. (document와 이전 document.)
    //     });
    // };
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
    const onSubmit = async(event) =>{
        event.preventDefault();
        await addDoc(collection(dbService, "posts"), {
            text : post,
            createdAt: Date.now(),
            creatorId: userObj.uid
        });
        setPost("");
    };
    const onChange = (event) => {
        const {target:{value}} = event; // event안에 있는 target 안에 있는 value를 달라.
        setPost(value);
    };
    return (
        <div>
            <form onSubmit ={onSubmit}>
                <input value = {post} onChange={onChange} type = "text" placeholder="what' on your mind?" maxLength={120} />
                <input type = "submit" value = "post"/>
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