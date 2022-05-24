import  Project, { ProjectType, TalkingPoint } from "./Project";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../Features/userSlice";
import { AppDispatch, RootState } from "../app/store";
import useFetchProject from "../Hooks/useFetchUserProject";
import { useParams } from "react-router-dom";

interface ProjectFormProps  {
    propProject: ProjectType;
    onSaveProject(project: ProjectType): void;
}
const ProjectForm = ({propProject, onSaveProject}:ProjectFormProps) =>{

    const [project, setProject] = useState<ProjectType>(propProject)
    const [tempTech, setTempTech] = useState("")
    const [tempTpTitle, setTempTpTitle] = useState("")
    const [tempTpBody, setTempTpBody] = useState("")
    
    const removeProjectAtIndex = (i: number) =>{
        let tempTechs = project.technologies;
        tempTechs.splice(i, 1);
        setProject({...project, technologies: tempTechs})
    }
    const removeTpAtIndex = (i: number) =>{
        let tempTps = project.talkingPoints;
        tempTps.splice(i, 1);
        setProject({...project, talkingPoints: tempTps})
    }
    const handleAddTechnology = () =>{
        setProject({...project, technologies: project.technologies.concat(tempTech)})
        setTempTech("")
    }
    const handleAddTalkingPoint = () =>{
        let tempTp : TalkingPoint= { title: tempTpTitle, body: tempTpBody}
        setProject({...project, talkingPoints: project.talkingPoints.concat(tempTp)})
        setTempTpBody("")
        setTempTpTitle("")
    }
    
    //
    return(
        <div>
            <div className="inputGroup">
                <label>Name:</label>
                <input type = "text" name="name" onChange={(e) => setProject({...project, name: e.target.value})} value={project.name} />
            </div>
            <div className="inputGroup">
                <label>Description:</label>
                <input type = "text" name="description" onChange={(e) => setProject({...project, description: e.target.value})} value={project.description} />
            </div>
            <div className="inputGroup">
                <label>Technologies:</label>
                <ul>
                {
                    project.technologies.map((techcnology, i) =>{
                       return(
                           <li key={"tech"+i}>
                               <div>
                                   <p>{techcnology}</p>
                                   <button onClick={() =>{removeProjectAtIndex(i)}}>X</button>
                               </div>
                           </li>
                       )
                    })
                }
                </ul>
                <input type = "text" name="tempTech" onChange={(e) => setTempTech(e.target.value)} value={tempTech} />
                <button onClick={() =>handleAddTechnology()}>+</button>
            </div>
            <div className="inputGroup">
                <label>Talking Points:</label>
                <div>
                    {
                        project.talkingPoints.map((talkingPoint, i) =>{
                            return(
                                <div key = {"tp"+i}>
                                    <h3>{talkingPoint.title}</h3>
                                    {
                                        talkingPoint.body &&
                                        <p>{talkingPoint.body}</p>
                                    }
                                    <button onClick={() =>{removeTpAtIndex(i)}}>X</button>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <label>Title</label>
                    <input type = "text" name="temptpName" onChange={(e) => setTempTpTitle(e.target.value)} value={tempTpTitle} />
                </div>
                <div>
                    <label>Body</label>
                    <input type = "text" name="tempTpBody" onChange={(e) => setTempTpBody(e.target.value)} value={tempTpBody} />
                </div>
                <button onClick={() =>handleAddTalkingPoint()}>+</button>
            </div>
            <div className="inputGroup">
                <label>Github:</label>
                <input type = "text" name="github" onChange={(e) => setProject({...project, github: e.target.value})} value={project.github} />
            </div>
            <button onClick={() => onSaveProject(project)}>Save Project</button>
            <div>
                <h2>Preview</h2>
                <Project project={project}/>
            </div>
        </div>
    )
}

export default ProjectForm;