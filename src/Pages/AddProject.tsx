import { ProjectType } from "../Components/Project";
import ProjectForm from "../Components/ProjectForm";
import { useNavigate } from "react-router-dom";
import useChangeUserProjects from "../Hooks/useChangeUserProject";
import ErrorText from "../Components/ErrorText";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
const EMPTY_PROJECT:ProjectType= {
    _id: "",
    name: "",
    description: "",
    technologies: [],
    talkingPoints: [],
    github: ""

}
const AddProject = () =>{
    const {response, loading, error, sendAdd} =  useChangeUserProjects();
    const userId = useSelector((state: RootState) => state.user.user?.id)
    const loggedIn = useSelector((state: RootState) => state.user.auth.loggedIn)
    const nav = useNavigate();

    useEffect(() =>{
        if(!loggedIn){
            nav('/login')
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() =>{
        if(!loggedIn){
            nav('/login')
        }
        if(response?.status === 201){
            nav(`/user/${userId}`)
        }
        // eslint-disable-next-line
    }, [loggedIn, response?.status])

    const addProjectClick =(project: ProjectType) =>{
        sendAdd(project);
    }


    return(
        <div>
            {loading &&
            <LoadingSpinner/>}
            
            {error &&
            <ErrorText>{error}</ErrorText>}

            <ProjectForm propProject={EMPTY_PROJECT} onSaveProject = {addProjectClick}></ProjectForm>
        </div>
    )
}

export default AddProject;