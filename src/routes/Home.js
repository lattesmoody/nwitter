import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import {onSnapshot, query, orderBy, collection } from "firebase/firestore";
import Post from "components/Post";
import PostFactory from "components/PostFactory";

const Home= ({userObj}) => {
    const [posts, setPosts] = useState([]);
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
    return (
        <div>
            <PostFactory userObj={userObj}/>
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