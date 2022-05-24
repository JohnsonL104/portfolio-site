import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../Features/userSlice";
import { StateType } from "../Features/userInterfaces";
import ErrorButton from "./ErrorButton";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
const Login = () =>{
    const dispatch = useDispatch<AppDispatch>();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');
    const nav = useNavigate()
    const state: StateType = useSelector((state:RootState)=>state.user);
    const [content, setContent] = useState<React.ReactElement>()
    
    useEffect(() =>{
        if(state.auth.loggedIn){
            nav('/')
        }
        
        
    }, [])
    useEffect(() =>{
        if(state.auth.loggedIn){
            nav('/')
        }
        
        
    }, [state.auth.loggedIn])

    useEffect(()=>{
        console.log(state.status)
        const handleLoginClick = () =>{
            if(state.status !== "loading"){
                console.log(email+password)
                dispatch(login({email: email, password: password}))
            }
        }
        if(state.status === "idle"){
            setContent(<ErrorButton onClick={handleLoginClick}>Login</ErrorButton>)
        }
        if(state.status === "loading"){
            setContent(<p>Loading</p>)
        }
        if(state.status ==="failed"){
            setContent(<ErrorButton onClick={handleLoginClick} error={state.error}>Login</ErrorButton>)

        }
        
    }, [state.status, email, password])
    return(
       
        <div>
            <div className="loginGroup">
                <label>Email:</label>
                <input type = "text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className="loginGroup">
                <label>Password:</label>
                <input type = "password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            {content}
        </div>
    )
}
export default Login;