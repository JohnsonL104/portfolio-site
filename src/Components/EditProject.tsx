import { ProjectType } from "./Project";
import { useSelector } from "react-redux";
import { addProject } from "../Features/userSlice";
import { AppDispatch } from "../app/store";
import { useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import useFetchProject from "../Hooks/useFetchUserProject";
import { RootState } from "../app/store";

const EditProject = () =>{
    const {projectId} = useParams();
    const userId = useSelector((state: RootState) => state.user.user?.id)
    const {project, loading, error} = useFetchProject(userId, projectId)
    const onSaveProject = () =>{
        console.log(project);
    }


    if(loading){
        return(
            <p>loading</p>
        )
    }
    if(error){
        console.log(error);
        return(
        <div>
            <p>{error}</p>
        </div>
        )
    }
    if(project){
        return(
            <ProjectForm propProject={project} onSaveProject = {onSaveProject}></ProjectForm>
        )
    }
    
        return(
            <p>Unknown Error</p>
        )
    
    

    
}

export default EditProject;