
interface Props {
    onClick(): void;
    error?: string | null;
    children: React.ReactNode;
}
const ErrorButton = ({onClick, error=null, children}: Props) =>{
    return(
        <div>
            <button onClick={() => onClick()}>{children}</button>
            <p>{error}</p>
        </div>
    )
}

export default ErrorButton