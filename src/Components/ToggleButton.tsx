import { useContext } from "react";
import { ThemeContext } from "../Features/ThemeProvider";
import {HiLightBulb} from 'react-icons/hi'
const ToggleSwitch = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
      
      <button className="switch" onClick={toggleTheme}>
        <HiLightBulb style={{color: theme.nav.foregroundSecondary, fontSize: 30}}/>
      </button>
      
    );
  };

export default ToggleSwitch;