import { dbService, storageService } from "fbase";
import {doc,deleteDoc, updateDoc} from "firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
       { editing ? (
           <>
           <form onSubmit={onSubmit} className="container nweetEdit">
               <input
               type = "text"
               placeholder = "Edit your Post" 
               value = {newPost} 
               required
               autoFocus
               onChange={onChange}
               className="formInput"
            />
            <input type = "submit" value = "Update Post" className="formBtn" />
           </form>
           <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
           </>
        ) : (
            <>
                <h4>{postObj.text}</h4>
                {postObj.attachmentUrl && <img src={postObj.attachmentUrl}/>}
                {isOwner && (
                    <div className="nweet__actions">
                        <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                    </div>
                )}
            </>
        )}
    </div>
    )
};

export default Post;