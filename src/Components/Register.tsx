import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ErrorButton from "./ErrorButton"
import { register } from "../Features/userSlice"
import { AppDispatch, RootState } from "../app/store"
const Register = () =>{
    const [email, setEmail] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [content, setContent] = useState<React.ReactElement>()
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: RootState) => state.user)
    const nav = useNavigate()
    useEffect(() =>{
        if(state.auth.loggedIn){
          nav('/')  
        }
    },[])
    useEffect(() =>{
        if(state.auth.loggedIn){
          nav('/')  
        }
    },[state.auth.loggedIn])

    useEffect(()=>{
        console.log(state.status)
        const handleRegisterClick = () =>{
            if(state.status !== "loading"){
                dispatch(register({email: email, password: password, fname: fname, lname: lname, phone: phone}))
            }
        }
        if(state.status === "idle"){
            setContent(<ErrorButton onClick={handleRegisterClick}>Register</ErrorButton>)
        }
        if(state.status === "loading"){
            setContent(<p>Loading</p>)
        }
        if(state.status ==="failed"){
            setContent(<ErrorButton onClick={handleRegisterClick} error={state.error}>Register</ErrorButton>)

        }
        
    }, [state.status, email, password])

    return(
        <div>
            <div className="loginGroup">
                <label>First Name:</label>
                <input type = "text" name="fname" onChange={(e) => setFname(e.target.value)} value={fname} />
            </div>
            <div className="loginGroup">
                <label>Last Name:</label>
                <input type = "text" name="lname" onChange={(e) => setLname(e.target.value)} value={lname} />
            </div>
            <div className="loginGroup">
                <label>Phone Number:</label>
                <input type = "text" name="phone" onChange={(e) => setPhone(e.target.value)} value={phone} />
            </div>
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
export default Register;