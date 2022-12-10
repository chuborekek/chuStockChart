import React, { createContext, useContext, useState } from 'react'

const ChuThemeContext = createContext()


const ThemeContext = ({children}) => {
    const [darkMode,setDarkMode]=useState(true);
    return (
        <ChuThemeContext.Provider value={{darkMode,setDarkMode}}>
            {children}
        </ChuThemeContext.Provider>
    )
}
export default ThemeContext

export const useThemeContext= () =>{
    return useContext(ChuThemeContext);
}