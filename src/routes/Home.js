import { dbService } from "fbase";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

const Home= () => {
    const [send, setSend] = useState("");
    const onSubmit = async(event) =>{
        event.preventDefault();
        await addDoc(collection(dbService, "stories"), {
            send,
            createdAt: Date.now()
        });
        setSend("");
    };
    const onChange = (event) => {
        const {target:{value}} = event; // event안에 있는 target 안에 있는 value를 달라.
        setSend(value);
    }
    return (
        <div>
            <form onSubmit ={onSubmit}>
                <input value = {send} onChange={onChange} type = "text" placeholder="what' on your mind?" maxLength={120} />
                <input type = "submit" value = "send"/>
            </form>
        </div>
    );
};
export default Home;