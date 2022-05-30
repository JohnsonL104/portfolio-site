import  Project, { ProjectType, TalkingPoint } from "./Project";
import { useContext, useState } from "react";
import './ProjectForm.css'
import { ThemeContext } from "../Features/ThemeProvider";

interface ProjectFormProps  {
    propProject: ProjectType;
    onSaveProject(project: ProjectType): void;
    onDeleteProject?(project: ProjectType): void;
}
const ProjectForm = ({propProject, onSaveProject, onDeleteProject}:ProjectFormProps) =>{

    const [project, setProject] = useState<ProjectType>(propProject)
    const [tempTech, setTempTech] = useState("")
    const [tempTpTitle, setTempTpTitle] = useState("")
    const [tempTpBody, setTempTpBody] = useState("")
    const {theme} = useContext(ThemeContext);
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

    const placeholderStyle = `
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder{
            color: ${theme.foregroundSecondary};
        }
    `
    
    //
    return(

        <div className="projectFormWrapper">
            <style>
                {placeholderStyle}
            </style>
            <div className="projectForm">
                <div>
                    <h2 style={{color: theme.foregroundPrimary}}>Project Form</h2>
                </div>
                <div className="inputGroup">
                    <label style={{color: theme.foregroundSecondary}}>Name:</label>
                    <input style={{color: theme.foregroundSecondary, backgroundColor: theme.backgroundSecondary, borderColor: theme.foregroundPrimary, borderStyle: "solid"}} type = "text" name="name" onChange={(e) => setProject({...project, name: e.target.value})} value={project.name} />
                </div>
                <div className="inputGroup">
                    <label style={{color: theme.foregroundSecondary}}>Description:</label>
                    <textarea style={{color: theme.foregroundSecondary, backgroundColor: theme.backgroundSecondary, borderColor: theme.foregroundPrimary, borderStyle: "solid"}} name="description" id = "descriptionText" onChange={(e) => setProject({...project, description: e.target.value})} value={project.description} />
                </div>
                <div className="inputGroup">
                    <label style={{color: theme.foregroundSecondary}}>Technologies:</label>
                    <div className="txtBtn">
                        <input style={{color: theme.foregroundSecondary, backgroundColor: theme.backgroundSecondary, borderColor: theme.foregroundPrimary, borderStyle: "solid"}} type = "text" name="tempTech" id = "techInput" onChange={(e) => setTempTech(e.target.value)} value={tempTech} />
                        <button id = "techAdd" onClick={() =>handleAddTechnology()}>+</button>
                    </div>
                    <ul className="technologiesFormList">
                    {
                        project.technologies.map((techcnology, i) =>{
                        return(
                            <li key={"tech"+i}>
                                <div className="technologyFormListDiv">
                                    <p style={{color: theme.foregroundSecondary}}>{techcnology}</p>
                                    <button className="xButton" onClick={() =>{removeProjectAtIndex(i)}}>X</button>
                                </div>
                            </li>
                        )
                        })
                    }
                    </ul>
                    
                </div>
                <div className="inputGroup">
                    <label style={{color: theme.foregroundSecondary}}>Talking Points:</label>
                    
                    
                    <div className="txtBtn">
                        <input style={{color: theme.foregroundSecondary, backgroundColor: theme.backgroundSecondary, borderColor: theme.foregroundPrimary, borderStyle: "solid"}} placeholder="Title" type = "text" name="temptpName" onChange={(e) => setTempTpTitle(e.target.value)} value={tempTpTitle} />
                        <button onClick={() =>handleAddTalkingPoint()}>+</button>
                    </div>
                    <textarea style={{color: theme.foregroundSecondary, backgroundColor: theme.backgroundSecondary, borderColor: theme.foregroundPrimary, borderStyle: "solid"}} placeholder= "Body" name="tempTpBody" onChange={(e) => setTempTpBody(e.target.value)} value={tempTpBody} />
                    <div className="technologiesFormList">
                        {
                            project.talkingPoints.map((talkingPoint, i) =>{
                                return(
                                    <div className="technologyFormListDiv" key = {"tp"+i}>
                                        <h3 style={{color: theme.foregroundSecondary}}>{talkingPoint.title}</h3>
                                        <button className = "xButton" onClick={() =>{removeTpAtIndex(i)}}>X</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                </div>
                <div className="inputGroup">
                    <label style={{color: theme.foregroundSecondary}}>Github:</label>
                    <input style={{color: theme.foregroundSecondary, backgroundColor: theme.backgroundSecondary, borderColor: theme.foregroundPrimary, borderStyle: "solid"}} type = "text" name="github" onChange={(e) => setProject({...project, github: e.target.value})} value={project.github} />
                </div>
                <div className="formButtons">
                    <button onClick={() => onSaveProject(project)}>Save Project</button>
                    { onDeleteProject !== undefined && 
                    <button onClick={() => onDeleteProject(project)}>Delete Project</button>
                
                }
                </div>
            </div>
            <div className="preview">
                <h2 style={{color: theme.foregroundPrimary}}>Preview</h2>
                <Project project={project}/>
            </div>
        </div>
    )
}

export default ProjectForm;