import { dbService, storageService } from "fbase";
import {doc,deleteDoc, updateDoc} from "firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import React, { useState } from "react";

const Post = ({postObj,isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newPost, setNewPost] = useState(postObj.text);
    const PostTextRef = doc(dbService, "posts", `${postObj.id}`);
    const onDeleteClick = async() => {
        const ok = window.confirm("삭제하시겠습니까?");
        if(ok){
            await deleteDoc(PostTextRef);
            await deleteObject(ref(storageService,postObj.attachmentUrl));
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(PostTextRef, {text: newPost});
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target:{value},
        } = event;
        setNewPost(value);
    };
    return (
    <div>
       { editing ? (
           <>
           <form onSubmit={onSubmit}>
               <input
               type = "text"
               placeholder = "Edit your Post" 
               value = {newPost} required
               onChange={onChange} />
            <input type = "submit" value = "Update Post" />
           </form>
           <button onClick = {toggleEditing}>Cancel</button>
           </>
        ) : (
            <>
                <h4>{postObj.text}</h4>
                {postObj.attachmentUrl &&(
                    <img src={postObj.attachmentUrl} width ="50px" height = "50px"/>
                )}
                {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Post</button>
                    <button onClick = {toggleEditing}>Edit Post</button>
                </>
                )}
            </>
        )}
    </div>
    )
};

export default Post;