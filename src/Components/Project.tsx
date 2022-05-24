import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
}

const Project = ({project}: Props) =>{
    const [tpIndex, setTpIndex] = useState(0);

    const next = () =>{
        if(tpIndex+1 < project.talkingPoints.length){
            setTpIndex((i) => i+1)
        }
        else{
            setTpIndex(0)
        }
    }
    const back = () =>{
        if(tpIndex-1 > 0){
            setTpIndex((i) => i-1)
        }
        else{
            setTpIndex(project.talkingPoints.length-1)
        }
    }

    


    return(
        <div className="project">
            
            <h2 className="title">{project.name}</h2>
            
            <label className="techLabel">Technologies: </label>
            <ul className="technologies projectItem">
                
                {project.technologies.map((technology, i) =>{
                    return(
                        <li key = {i}>{technology}</li>
                    )
                })}
            </ul>
            <label className="projectHeading">Description</label>
            <p className="projectItem">{project.description}</p>
            
            {project.talkingPoints.length > 0 &&
                <div className="projectGroup">
                    <label className="projectHeading">Talking Points</label>
                    <div className="talkingPoints">
                        <button onClick={back}>&#x3c;</button>
                        
                            <div className="talkingPoint">
                                <h3>{project.talkingPoints[tpIndex].title}</h3>
                                {
                                    project.talkingPoints[tpIndex].body &&
                                    <p>{project.talkingPoints[tpIndex].body}</p>
                                }
                            </div>
                        
                        <button onClick={next}>&#x3e;</button>
                    </div>
                </div>
            }
            <label className="projectHeading">Github</label>
            <a href={project.github} className="projectItem">{project.github}</a>
            
        </div>
    )
}

export default Project;