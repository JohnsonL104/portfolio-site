import React, {  useEffect, useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ErrorButton from "../Components/ErrorButton"
import { register } from "../Features/userSlice"
import { AppDispatch, RootState } from "../app/store"
import { ThemeContext } from "../Features/ThemeProvider"
import LoadingSpinner from "../Components/LoadingSpinner"
const Register = () =>{
    const [email, setEmail] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const {theme} = useContext(ThemeContext);
    let content = <div>An Error Occured</div>
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: RootState) => state.user)
    const nav = useNavigate()
    
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


    
    
    const handleRegisterClick = () =>{
        if(state.status !== "loading"){
            dispatch(register({email: email, password: password, fname: fname, lname: lname, phone: phone}))
        }
    }
    if(state.status === "idle"){
        content = <ErrorButton onClick={handleRegisterClick}>Register</ErrorButton>
    }
    if(state.status === "loading"){
        content = <LoadingSpinner/>
    }
    if(state.status ==="failed"){
        content = <ErrorButton onClick={handleRegisterClick} error={state.error}>Register</ErrorButton>

    }
        
    

    return(

        <div className="login">
            <h1 style={{color: theme.foregroundPrimary}}>Register</h1>
            <div className="loginGroup">
                <label style={{color: theme.foregroundSecondary}}>First Name:</label>
                <input style={{color: theme.foregroundSecondary, backgroundColor: theme.backgroundSecondary, borderColor: theme.foregroundPrimary, borderStyle: "solid"}} type = "text" name="fname" onChange={(e) => setFname(e.target.value)} value={fname} />
            </div>
            <div className="loginGroup">
                <label style={{color: theme.foregroundSecondary}}>Last Name:</label>
                <input style={{color: theme.foregroundSecondary, backgroundColor: theme.backgroundSecondary, borderColor: theme.foregroundPrimary, borderStyle: "solid"}} type = "text" name="lname" onChange={(e) => setLname(e.target.value)} value={lname} />
            </div>
            <div className="loginGroup">
                <label style={{color: theme.foregroundSecondary}}>Phone Number:</label>
                <input style={{color: theme.foregroundSecondary, backgroundColor: theme.backgroundSecondary, borderColor: theme.foregroundPrimary, borderStyle: "solid"}} type = "text" name="phone" onChange={(e) => setPhone(e.target.value)} value={phone} />
            </div>
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
export default Register;