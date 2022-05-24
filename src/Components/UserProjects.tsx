import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../app/store";
import { StateType } from "../Features/userInterfaces";
import useFetchUserWithProjects from "../Hooks/useFetchUserProjects";
import Project from "./Project";
const UserProjects = () =>{
    const state: StateType = useSelector((state: RootState) => state.user);
    const {userId} = useParams();
    const self: boolean = (state.user && userId === state.user.id) ? true : false;
    const {user, loading, error} = useFetchUserWithProjects(userId);
    if(error){
        console.log(error);
        return(
        <div>
            <p>{error}</p>
        </div>
        )
    }
    if(loading){
        return(
        <div>
            <p>Loading</p>
        </div>
        )
    }

    if(user){
        if(self){
            return(
                <div className="pageBody">
                    <h1>Your Projects</h1>
                    <Link to={"/addProject"}>Add</Link>
                    <div>
                    
                        {user.projects.map((project) =>{
                            return(
                                <div>
                                <Project project={project} key={project._id}/>
                                {self &&
                                <Link to={`/editProject/${project._id}`}>Edit</Link>
                                }
                                </div>
                            )
                            
                        })}
                    
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h1>{`${user.fname}'s Projects`}</h1>
                    <div>
                    
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