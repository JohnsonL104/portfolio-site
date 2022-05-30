import { useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import { RootState } from "../app/store";
import { StateType } from "../Features/userInterfaces";
import useFetchUserWithProjects from "../Hooks/useFetchUserProjects";
import Project from "../Components/Project";
import Button from "../Components/Button";
import { useContext } from "react";
import { ThemeContext } from "../Features/ThemeProvider";
import './UserProjects.css'
import ErrorText from "../Components/ErrorText";
import LoadingSpinner from "../Components/LoadingSpinner";
const UserProjects = () =>{
    const state: StateType = useSelector((state: RootState) => state.user);
    const {userId} = useParams();
    const {theme} = useContext(ThemeContext);
    const nav = useNavigate();
    const self: boolean = (state.user && userId === state.user.id) ? true : false;
    const {user, loading, error} = useFetchUserWithProjects(userId);
    if(error){
        console.log(error);
        return(
            <ErrorText>{error}</ErrorText>
        )
    }
    if(loading){
        return(
            <LoadingSpinner/>
        )
    }

    if(user){
        if(self){
            return(
                <div className="pageBody">

                    <div className="projectPageHead">
                        <div className="projectPageHeadSpacer"></div>
                        <h1 style={{color: theme.foregroundPrimary}}>Your Project Page</h1>
                        <Button onClick={() => nav('/addProject')}>Add</Button>
                    </div>
                    <div>
                    
                        {user.projects.map((project) =>{
                            return(
                                
                                <Project project={project} key={project._id} edit = {self}/>
                                
                            )
                            
                        })}
                    
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h1 style={{color: theme.foregroundPrimary}}>{`${user.fname}'s Project Page`}</h1>
                    <div >
                    
                        {user.projects.map((project) =>{
                            return(
                                <Project project={project} key={project._id}/>
                            )
                            
                        })}
                    
                    </div>
                </div>
            )
        }
    }

    return(
        <div>
            There was an error
        </div>
    )
    
}

export default UserProjects;