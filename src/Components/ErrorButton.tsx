
import Button from "./Button";

interface Props {
    children: string;
    onClick(): void;
    error?: string | null;
}
const ErrorButton = ({children, onClick, error=null}: Props) =>{
    return(
        <div>
            <Button onClick={onClick}>{children}</Button>
            <p style={{color: 'red'}}>{error}</p>
        </div>
    )
}

export default ErrorButton