import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ProjectType } from "../Components/Project";
import { StateUser } from "../Features/userInterfaces";

const API_URL = "http://localhost:8080/users"


const useFetchProject = (userId: string | undefined, projectId: string | undefined) =>{
    const [project, setProject] = useState<ProjectType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    useEffect(() =>{
        const getData = async () =>{
            setLoading(true);
            setError(null);
            if(typeof userId !== undefined && typeof projectId !== undefined){
                try{
                    const response = await axios.get(`${API_URL}/${userId}/projects/${projectId}`)
                    setProject(response.data.project)
                }
                catch(err: any){
                    interface ResponseMessage {
                        message: string;
                    }
                    if(axios.isAxiosError(err)){
                        setError((err.response?.data as ResponseMessage).message);
                    }
                    else{
                        setError("Unknown Error")
                    }
                }
                finally{
                    setLoading(false);
                }
            }
            else{
                setError("User or Project Id are not set");
            }
        }
        getData();
    }, [userId, projectId])

    return {project, loading, error}
}

export default useFetchProject;