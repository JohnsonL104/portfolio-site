import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../app/store";
import { StateType } from "../Features/userInterfaces";
const Home = () =>{
    const state: StateType = useSelector((state:RootState) => state.user)
    console.log(state)
    return(
        <div>
            <h1>Welcome to portfolio site {(state.auth.loggedIn && state.user !== null) ? state.user.fname : ""}</h1>
        </div>
    )
}

export default Home;