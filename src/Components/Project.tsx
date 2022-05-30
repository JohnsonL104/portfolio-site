import {  useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { ThemeContext } from "../Features/ThemeProvider";
import './Project.css';
export interface TalkingPoint {
    _id?: string;
    title: string;
    body?: string;
}

export interface ProjectType{
    _id: string;
    name: string;
    description: string;
    technologies: string[];
    talkingPoints: TalkingPoint[];
    github: string;
}

interface Props{
    project: ProjectType;  
    edit?: boolean;
}

const Project = ({project, edit = false}: Props) =>{
    const [tpIndex, setTpIndex] = useState(0);
    const nav = useNavigate();
    const {theme} = useContext(ThemeContext);
    const next = () =>{
        if(tpIndex+1 < project.talkingPoints.length){
            setTpIndex((i) => i+1)
        }
        else{
            setTpIndex(0)
        }
    }
    const back = () =>{
        if(tpIndex-1 >= 0){
            setTpIndex((i) => i-1)
        }
        else{
            setTpIndex(project.talkingPoints.length-1)
        }
    }

    


    return(
        <div style={{marginTop: 5, marginBottom: 5, backgroundColor: theme.backgroundPrimary, borderColor: theme.foregroundSecondary}} className="project">
            <div className="projectHead">
                <h2 style={{color: theme.foregroundSecondary}} className="title">{project.name}</h2>
                {
                    edit &&
                    <button className = "editButton" onClick={() =>{nav(`/editProject/${project._id}`)}}>Edit</button>
                }
            </div>
            <div>
                <label style={{color: theme.foregroundSecondary}} className="techLabel">Technologies: </label>
                <ul className="technologies projectItem">
                    
                    {project.technologies.map((technology, i) =>{
                        return(
                            <li key = {i}>{technology}</li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <label style={{color: theme.foregroundSecondary}} className="projectHeading">Description</label>
                <p style={{color: theme.foregroundSecondary}} className="projectItem">{project.description}</p>
            </div>
           
            {project.talkingPoints.length > 0 &&
                <div className="projectGroup">
                    <label style={{color: theme.foregroundSecondary}} className="projectHeading">Talking Points</label>
                    <div className="talkingPoints">
                        <button style={{color: theme.foregroundPrimary}} onClick={back}>&#x3c;</button>
                        
                            <div style={{backgroundColor: theme.backgroundPrimary, borderColor: theme.foregroundSecondary}} className="talkingPoint">
                                <h3 style={{color: theme.foregroundSecondary}}>{project.talkingPoints[tpIndex].title}</h3>
                                {
                                    project.talkingPoints[tpIndex].body &&
                                    <p style={{color: theme.foregroundSecondary}}>{project.talkingPoints[tpIndex].body}</p>
                                }
                            </div>
                        
                        <button style={{color: theme.foregroundPrimary}} onClick={next}>&#x3e;</button>
                    </div>
                </div>
            }
           
            <div>
                <label style={{color: theme.foregroundSecondary}} className="projectHeading">Github</label>
                <a href={project.github} className="projectItem">{project.github}</a>
            </div>
        </div>
    )
}

export default Project;