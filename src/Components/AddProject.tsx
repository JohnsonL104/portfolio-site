import { ProjectType } from "./Project";
import { useDispatch } from "react-redux";
import { addProject } from "../Features/userSlice";
import { AppDispatch } from "../app/store";
import ProjectForm from "./ProjectForm";
const EMPTY_PROJECT:ProjectType= {
    _id: "",
    name: "",
    description: "",
    technologies: [],
    talkingPoints: [],
    github: ""

}
const AddProject = () =>{
    const dispacth = useDispatch<AppDispatch>();
    const addProjectClick =(project: ProjectType) =>{
        dispacth(addProject(project));
    }

    return(
        <ProjectForm propProject={EMPTY_PROJECT} onSaveProject = {addProjectClick}></ProjectForm>
    )
}

export default AddProject;