import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { ProjectType } from "../Components/Project";
import { API_URL } from "../Features/userSlice";
import { AxiosResponse } from "axios";
const useChangeUserProjects = () =>{
    const [response, setResponse] = useState<AxiosResponse | null>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const state= useSelector((state: RootState) => state.user);
    const sendAdd = async (project: ProjectType) => {
        if(!loading){
            setLoading(true)
            setError("");
            try{
                if(state.user !== null){
                    let res = await axios.post(API_URL + `/${state.user.id}/addProject`, project, { headers: {'Content-Type': 'application/json', 'authorization': state.auth.token}})
                    setResponse(res);
                }
                else{
                    setError("You need to be logged in");
                }
            }
            catch(err: any){
                interface ResponseMessage {
                    message: string;
                }
                if(axios.isAxiosError(err)){
                    let e = (err.response?.data as ResponseMessage).message
                    if(e.includes("Path `name` is required.")){
                        e = "The name of the project is required"
                    }
                    if(e.includes("Path `title` is required")){
                        e = "All Talking Points must have a title"
                    }
                    setError(e);
                }
                else{
                    setError("Unknown Error")
                }
            }
            finally {
                setLoading(false);
            }
        }
    }
    const sendUpdate = async (project: ProjectType) => {
        if(!loading){
            setLoading(true)
            setError("");
            try{
                if(state.user !== null){
                    let res = await axios.patch(API_URL + `/${state.user.id}/projects/${project._id}`, project, { headers: {'Content-Type': 'application/json', 'authorization': state.auth.token}})
                    setResponse(res);
                    console.log(API_URL + `/${state.user.id}/projects/${project._id}`)
                }
                else{
                    setError("You need to be logged in");
                }
            }
            catch(err: any){
                interface ResponseMessage {
                    message: string;
                }
                if(axios.isAxiosError(err)){
                    let e = (err.response?.data as ResponseMessage).message
                    if(e.includes("Path `name` is required.")){
                        e = "The name of the project is required"
                    }
                    setError(e);
                }
                else{
                    setError("Unknown Error")
                }
            }
            finally {
                setLoading(false);
            }
        }
    }
    const sendDelete = async (project: ProjectType) => {
        if(!loading){
            setLoading(true)
            setError("");
            try{
                if(state.user !== null){
                    let res = await axios.delete(API_URL + `/${state.user.id}/projects/${project._id}`, { headers: {'Content-Type': 'application/json', 'authorization': state.auth.token}})
                    setResponse(res);
                    console.log(API_URL + `/${state.user.id}/projects/${project._id}`)
                }
                else{
                    setError("You need to be logged in");
                }
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
            finally {
                setLoading(false);
            }
        }
    }

    return{response, error, loading, sendAdd, sendUpdate, sendDelete}
}

export default useChangeUserProjects