import React, { useState } from "react";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { authService } from "fbase";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) =>{
        const{
            target:{name,value}, // 변경이 일어난 부분
    } = event;
        if (name ==="email"){
            setEmail(value);
        }else if (name ==="password"){
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault(); // 기본 실행 방지 (로그인 폼 초기화 안 됨.)
        try{
            let data;
            if(newAccount){
                const auth = getAuth();
                createUserWithEmailAndPassword(authService, email, password)
            }
            else{
                const data = await signInWithEmailAndPassword(
                    authService,email, password);
            }
            console.log(data);
        } catch (error){
                setError(error.message);
        }
    };
    
    const toggleAccount = () => setNewAccount((prev => !prev));
    
    return(
        <>
        <form onSubmit ={onSubmit} className="container">
            <input // value를 받아오는 역할
            name ="email" 
            type="email" 
            placeholder="Email" 
            required value = {email}
            onChange={onChange}
            className="authInput"
            />
            <input name = "password" 
            type = "password"
            placeholder = "Password" 
            required value = {password}
            onChange={onChange} 
            className="authInput"
            />
            <input type = "submit" 
            className="authInput authSubmit"
            value={newAccount ? "Create Account" : "Sign In"} 
            />
            {error && <span className="authError">{error}</span>}
        </form>
        <span onClick = {toggleAccount} className="authSwitch">
            {newAccount ? "Sign In." : "Create Account"}
        </span>
    </>
    )
};

export default AuthForm;