import { authService } from "fbase";
import React, {useState} from "react";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider, } from 'firebase/auth';


const Auth= () => {
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
    const onSocialClick = async (event) => {
        const{
            target: {name},
        } = event;
        let provider;
        if (name ==="google"){
            provider = new GoogleAuthProvider();
        }else if (name ==="github"){
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(authService, provider);
    }

    return (
        <div>
            <form onSubmit ={onSubmit}>
                <input // value를 받아오는 역할
                name ="email" 
                type="email" 
                placeholder="Email" 
                required value = {email}
                onChange={onChange}
                />
                <input name = "password" 
                type = "password"
                placeholder = "Password" 
                required value = {password}
                onChange={onChange} 
                />
                <input type = "submit" value={newAccount ? "Create Account" : "Sign In"} 
                />
                {error}
            </form>
            <span onClick = {toggleAccount}>
                {newAccount ? "Sign In." : "Create Account"}</span>
        <div>
            <button onClick ={onSocialClick} name = "google">Continue with Google</button>
            <button onClick ={onSocialClick} name = "github">Continue with Github</button>
        </div>
    </div>
    );
};
export default Auth;