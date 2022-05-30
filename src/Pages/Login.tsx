
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext, useState } from "react";
import { login } from "../Features/userSlice";
import { StateType } from "../Features/userInterfaces";
import ErrorButton from "../Components/ErrorButton";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import './login.css'
import { ThemeContext } from "../Features/ThemeProvider";
import LoadingSpinner from "../Components/LoadingSpinner";
const Login = () =>{
    const dispatch = useDispatch<AppDispatch>();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');
    const {theme} = useContext(ThemeContext);
    const nav = useNavigate()
    const state: StateType = useSelector((state:RootState)=>state.user);
    let content = <div></div>

    useEffect(() =>{
        if(state.auth.loggedIn){
            nav('/')
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() =>{
        if(state.auth.loggedIn){
            nav('/')
        }
        // eslint-disable-next-line
    }, [state.auth.loggedIn])
    
    const handleLoginClick = () =>{
        if(state.status !== "loading"){
            dispatch(login({email: email, password: password}))
        }
    }
    
    if(state.status === "idle"){
        content = <ErrorButton onClick={handleLoginClick}>Login</ErrorButton>
    }
    if(state.status === "loading"){
        content = <LoadingSpinner/>
    }
    if(state.status ==="failed"){
        content = <ErrorButton onClick={handleLoginClick} error={state.error}>Login</ErrorButton>

    }
    
    return(
        
        <div className="login">
            <h1 style={{color: theme.foregroundPrimary}}>Login</h1>
            <div className="loginGroup">
                <label style={{color: theme.foregroundSecondary}}>Email:</label>
                <input style={{color: theme.foregroundSecondary, backgroundColor: theme.backgroundSecondary, borderColor: theme.foregroundPrimary, borderStyle: "solid"}} type = "text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className="loginGroup">
                <label style={{color: theme.foregroundSecondary}}>Password:</label>
                <input style={{color: theme.foregroundSecondary, backgroundColor: theme.backgroundSecondary, borderColor: theme.foregroundPrimary, borderStyle: "solid"}} type = "password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            {content}
        </div>
    )
}
export default Login;