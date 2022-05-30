import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { StateUser, StateType, LoginInfo, RLSuccess, ErrorPayload, RegisterUser } from "./userInterfaces";

export const API_URL = "https://portfolio-site-server-rf.herokuapp.com/users"

const nullState: StateType ={
    user: null,
    auth:{
        loggedIn: false,
        token: ""
    },
    status: "idle",
    error: null

}
let initialState = nullState;
let localUser = localStorage.getItem("user");
let token = localStorage.getItem("token")
if(token && localUser && localUser !== "[object Object]" && (localStorage.getItem("loggedIn") === "true")){

    initialState = {
        user : JSON.parse(localUser) as StateUser,
        auth:{
            loggedIn: true,
            token: token
        },
        status:"idle",
        error: null
    }

}


export const login = createAsyncThunk(`user/login`, async (loginInfo: LoginInfo) => {
    let response = await axios.post(`${API_URL}/login`, loginInfo)

    return response.data as RLSuccess
})

export const register = createAsyncThunk(`user/register`, async( registerInfo: RegisterUser, thunkApi:any)=>{
    try{
        let response = await axios.post(`${API_URL}/register`, registerInfo)
        
        return response.data as RLSuccess
    }
    catch(err: any){
        
        return thunkApi.rejectWithValue(err.response.data as ErrorPayload)
    }
})
const syncLocalStorage = (state: StateType) =>{
    localStorage.setItem("loggedIn",  state.auth.loggedIn.toString());
    localStorage.setItem("token", state.auth.token);
    localStorage.setItem("user", JSON.stringify(state.user));
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        logout(state, action){
            state.auth.loggedIn = false;
            state.auth.token = "";
            state.user = null
            syncLocalStorage(state);
        }
    },
    extraReducers(builder){
        builder
            .addCase(login.pending, (state, action) =>{
                state.status = "loading"
                state.error = ""
            })
            .addCase(login.fulfilled, (state, action) =>{
                
                if(action.payload.message === "Invalid Username or Password"){
                    state.auth.loggedIn = false;
                    state.auth.token = "";
                    state.user = null
                    syncLocalStorage(state);
                    state.status = "failed"
                    state.error = action.payload.message
                }
                if(action.payload.message === "Success"){
                    state.auth.loggedIn = true;
                    state.auth.token = action.payload.token;
                    state.user = action.payload.user;
                    syncLocalStorage(state);
                    state.status ="idle"
                    state.error = ""
                }
                
            })
            .addCase(login.rejected, (state, action) => {
                
                state.error = (action.error.message === "Request failed with status code 401") ? "Invalid Username or Password" : action.error.message as string;
                state.status = 'failed'
                state.auth.loggedIn = false;
                state.auth.token = "";
                state.user = null
                syncLocalStorage(state);
            })
            .addCase(register.pending, (state, action) =>{
                state.status = "loading"
                state.error = ""
            })
            .addCase(register.fulfilled, (state, action) =>{
                if(action.payload.message === "Success"){
                    state.auth.loggedIn = true;
                    state.auth.token = action.payload.token;
                    state.user = action.payload.user;
                    syncLocalStorage(state);
                    state.status ="idle"
                    state.error = ""
                }
                
            })
            .addCase(register.rejected, (state, action) => {
                console.log(action)
                let payload: ErrorPayload = action.payload as ErrorPayload;
                state.error = payload.message;
                state.status = 'failed'
                state.auth.loggedIn = false;
                state.auth.token = "";
                state.user = null
                syncLocalStorage(state);
            })
    }
})
export const { logout } = userSlice.actions
export default userSlice.reducer