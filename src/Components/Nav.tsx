import { useDispatch, useSelector } from "react-redux";
import './Nav.css';
import { logout } from "../Features/userSlice";
import { useContext } from "react";
import { AppDispatch, RootState } from "../app/store";
import { StateType } from "../Features/userInterfaces";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Features/ThemeProvider";
import ToggleSwitch from "./ToggleButton";
const Nav = () =>{
    const state:StateType= useSelector((state: RootState)=> state.user)
    const dispatch = useDispatch<AppDispatch>()
    const nav = useNavigate();
    const {theme} = useContext(ThemeContext);
    const handleLogout = () =>{
        dispatch(logout({}))
    }

    
    
    if(state.auth.loggedIn){
        return(
            <div className="navbar" style={{backgroundColor: theme.nav.backgroundPrimary}}>
                <h1 onClick={() =>{nav("/")}} style={{color: theme.nav.foregroundPrimary}}>Portfolio Site</h1>
                <div className="navLinks" style={{backgroundColor: theme.nav.backgroundSecondary}}>
                    <button onClick={() => nav(`/user/${state.user?.id}`)} style={{color: theme.nav.foregroundSecondary}}>Your Projects</button>  
                    <button onClick={() => handleLogout()} style={{color: theme.nav.foregroundSecondary}}>Logout</button>
                    <ToggleSwitch></ToggleSwitch>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="navbar" style={{backgroundColor: theme.nav.backgroundPrimary}}>
                <h1 onClick={() =>{nav("/")}} style={{color: theme.nav.foregroundPrimary}}>Portfolio Site</h1>
                <div className="navLinks" style={{backgroundColor: theme.nav.backgroundSecondary}}>
                    <button onClick={() => nav("/login")} style={{color: theme.nav.foregroundSecondary}}>Login</button>    
                    <button onClick={() => nav("/register")} style={{color: theme.nav.foregroundSecondary}}>Register</button>  
                    <ToggleSwitch></ToggleSwitch>
                </div>
            </div>
        )
    }
}

export default Nav;