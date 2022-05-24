import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Features/userSlice";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../app/store";
import { StateType } from "../Features/userInterfaces";
const Nav = () =>{
    const state:StateType= useSelector((state: RootState)=> state.user)
    const dispatch = useDispatch<AppDispatch>()
    const [buttons, setButtons] = useState(<div></div>)
    const handleLogout = () =>{
        
        console.log(dispatch(logout({})))
    }
    useEffect(() => {
        if(!state.auth.loggedIn){
            setButtons(<div>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
            </div> )
        }
        else{
            setButtons(<div>
                <button onClick={() => handleLogout()}>Logout</button>
            </div>)
        }
    }, [])
    useEffect(() => {
        if(!state.auth.loggedIn){
            setButtons(<div>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
            </div> )
        }
        else{
            setButtons(<div>
                <button onClick={() => handleLogout()}>Logout</button>
            </div>)
        }
    }, [state.auth.loggedIn])
    
    
    return(
        <div>
            {buttons}
            {state.user &&
            <Link to={`/user/${state.user.id}`}>Your Projects</Link>         
            }   
        </div>
    )
}

export default Nav;