import { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { ThemeContext } from "../Features/ThemeProvider";
import { StateType } from "../Features/userInterfaces";
const Home = () =>{
    const state: StateType = useSelector((state:RootState) => state.user)
    const {theme} = useContext(ThemeContext);
    return(
        <div style={{marginTop: "5%"}}>
            <h1 style={{color: theme.foregroundPrimary}}>Welcome to portfolio site {(state.auth.loggedIn && state.user !== null) ? state.user.fname : ""}</h1>
        </div>
    )
}

export default Home;