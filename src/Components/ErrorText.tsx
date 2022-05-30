interface Props{
    children: string;
}
const ErrorText = ({children}: Props) =>{
    return(
        <div>
            <p style={{color: "red", fontSize: 24}}>{children}</p>
        </div>
    )
}

export default ErrorText