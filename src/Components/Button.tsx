import { ReactElement } from "react";
import './Button.css'
interface Props{
    children: string;
    onClick?(): void; 
}
const Button = ({children, onClick}: Props) =>{
    if(onClick !== undefined){
        return(
            <button onClick={() =>{onClick()}}>{children}</button>
        )
    }
    else{
        return(
            <button>{children}</button>
        )
    }
}

export default Button;