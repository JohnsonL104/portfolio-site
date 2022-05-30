import { ReactElement, useContext } from "react"
import { ThemeContext } from "../Features/ThemeProvider"
import PropTypes from 'prop-types';

interface Props{
    children: ReactElement;
    primary?: boolean;
}

const Text = ({children, primary = false}: Props) =>{
    const {theme} = useContext(ThemeContext)
    return(
        <p style={{color: (primary)? theme.foregroundPrimary: theme.foregroundSecondary}}>
            {children}
        </p>
    )
}



export default Text;