import { ProjectType } from "../Components/Project";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "../Components/ProjectForm";
import useFetchProject from "../Hooks/useFetchUserProject";
import { RootState } from "../app/store";
import useChangeUserProject from "../Hooks/useChangeUserProject";
import ErrorText from "../Components/ErrorText";
import { useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";

const EditProject = () =>{
    const {projectId} = useParams();
    const userId = useSelector((state: RootState) => state.user.user?.id)
    const loggedIn = useSelector((state: RootState) => state.user.auth.loggedIn)
    const {project, loading: loadingF, error: errorF} = useFetchProject(userId, projectId)
    const {response, loading: loadingU, error: errorU, sendUpdate, sendDelete} = useChangeUserProject()
    const nav = useNavigate();
    const onSaveProject = (proj: ProjectType) =>{
        if(proj){
            sendUpdate(proj);
        }
    }
    const onDeleteProject = (proj: ProjectType) =>{
        if(proj){
            sendDelete(proj);
        }
    }
    
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
        if(response?.status === 201 || response?.status === 200){
            nav(`/user/${userId}`)
        }
        // eslint-disable-next-line
    }, [loggedIn, response?.status])

    if(loadingF){
        return(
            <LoadingSpinner/>
        )
    }
    if(errorF){
        return(
            <ErrorText>{errorF}</ErrorText>
        )
    }
    
    if(project){
        return(
            <div>
                {(loadingU) &&
                <LoadingSpinner/>}
                
                {errorU &&
                <ErrorText>errorU</ErrorText>}

                <ProjectForm propProject={project} onSaveProject = {onSaveProject} onDeleteProject ={onDeleteProject}></ProjectForm>
                
            </div>
        )
    }
    
        return(
            <ErrorText>Unknown Error</ErrorText>
        )
    
    

    
}

export default EditProject;