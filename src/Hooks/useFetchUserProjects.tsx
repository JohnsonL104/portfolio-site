import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ProjectType } from "../Components/Project";
import { StateUser } from "../Features/userInterfaces";

const API_URL = "http://localhost:8080/users"

export interface UserWithProjects extends StateUser{
    projects: [ProjectType]
}

const useFetchUserWithProjects = (id: string | undefined) =>{
    const [user, setUser] = useState<UserWithProjects | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    useEffect(() =>{
        const getData = async () =>{
            setLoading(true);
            setError(null);
            if(typeof id !== undefined){
                try{
                    const response = await axios.get(`${API_URL}/${id}`)
                    setUser(response.data)
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
                setError("id is not set");
            }
        }
        getData();
    }, [id])

    return {user, loading, error}
}

export default useFetchUserWithProjects;