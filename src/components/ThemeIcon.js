import React from 'react'
import { MoonIcon } from '@heroicons/react/solid'
import { useThemeContext } from '../context/ThemeContext'

const ThemeIcon = () => {
    const {darkMode, setDarkMode} = useThemeContext()
    const toggleDarkMode=()=>{
        setDarkMode(prev=>!prev)
    }
    console.log(darkMode)
  return (
    <button 
    className={`rounded-lg border-1 border-neutral-400 p-2 absolute top-4 right-8 xl:right-20 shadow-l
    ${darkMode
        ?"shadow-gray-800"
        :null
    } transition duration-300 hover:scale-125`}
    onClick={toggleDarkMode}>
        <MoonIcon className={`h-4 w-4 cursor-pointer stroke-1 fill-none stroke-neutral-400
        ${darkMode
            ?"fill-yellow-400 stroke-yellow-400"
            :"fill-none stroke-neutral-400"
        }`}/>
    </button>
  )
}

export default ThemeIcon