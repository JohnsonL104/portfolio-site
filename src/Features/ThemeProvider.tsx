
import React, {useState, ReactElement} from "react";

interface ThemeType {
    nav:{
        backgroundPrimary: string;
        backgroundSecondary: string;
        foregroundPrimary: string;
        foregroundSecondary: string;
    }
    backgroundPrimary: string;
    backgroundSecondary: string;
    foregroundPrimary: string;
    foregroundSecondary: string;
}



export const themes: {dark: ThemeType, light: ThemeType} = {
    dark:{
        nav: {
            backgroundPrimary: "#000",
            backgroundSecondary: "#F3DD11",
            foregroundPrimary: "#F3DD11",
            foregroundSecondary: "#000", 
        },
        backgroundPrimary: "#656565",
        backgroundSecondary: "#818181",
        foregroundPrimary: "#F3DD11",
        foregroundSecondary: "#eee",
    },
    light:{
        nav: {
            backgroundPrimary: "#F3DD11",
            backgroundSecondary: "#000",
            foregroundPrimary: "#000",
            foregroundSecondary: "#F3DD11", 
        },
        backgroundPrimary: "#fff",
        backgroundSecondary: "#eee",
        foregroundPrimary: "#000",
        foregroundSecondary: "#000",
    }
}

export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () =>{},
});
const ThemeProvider = ({children}: {children: ReactElement}) =>{
    const[theme, setTheme] = useState(themes.dark)
    
    const toggleTheme = () =>{
        setTheme((pv) => 
            pv === themes.dark ? themes.light : themes.dark
        )
    }

    return(
        <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;