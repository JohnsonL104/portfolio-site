import './LoadingSpinner.css'

const LoadingSpinner = () =>{
    return(
        <div className="spring-spinner">
            <div className="spring-spinner-part top">
                <div className="spring-spinner-rotator"></div>
            </div>
            <div className="spring-spinner-part bottom">
                <div className="spring-spinner-rotator"></div>
            </div>
        </div>
    )
}
export default LoadingSpinner