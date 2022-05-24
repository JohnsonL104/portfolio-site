interface AuthType{
    loggedIn: boolean;
    token: string;
}
export interface RejectedAction{

        isLoggedIn?: boolean;
        message?: string;

}
export interface StateUser {
    id: string;
    fname: string;
    lname: string;
    phone: string;
    email: string;
}
export interface StateType{
    user: StateUser | null;
    auth: AuthType;
    status: string;
    error: string | null;
}
export interface LoginInfo {
    email: string;
    password: string;
}
export interface RLSuccess{
    message:string;
    token: string;
    user: StateUser;
}
export interface ErrorPayload {
    message: string;
}
export interface RegisterUser extends Omit<StateUser, "id">{
    fname: string;
    lname: string;
    phone: string;
    email: string;
    password: string;
}