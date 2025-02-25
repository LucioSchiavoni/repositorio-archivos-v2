import { useEffect, useState } from "react";
import {MdOutlineDarkMode} from 'react-icons/md'
import {BsSun} from 'react-icons/bs'

const DarkMode = () => {
    const [theme, setTheme] = useState(() => {
    const guardarTheme = localStorage.getItem('theme');
    if(guardarTheme){
        return guardarTheme;
    }
    if(window.matchMedia("(prefers-color-scheme: dark)").matches){
        return "dark";
    }
    return "light";
})

useEffect(() => {
    const htmlElement = document.querySelector('html');
    if(htmlElement){
    if (theme === "dark"){
        htmlElement.classList.add('dark')
    }else{
        htmlElement.classList.remove('dark')
    } 
 }
    localStorage.setItem('theme', theme)
},[theme])

const handleTheme = async () => {
    setTheme(prevTheme => prevTheme == 'light' ? 'dark' : 'light')
}



  return (
    <>
    <button onClick={handleTheme} className="p-2 flex justify-center items-center w-12 ml-4 rounded-full shadow-xl dark:bg-white bg-gray-900 text-white dark:text-gray-800">
    <span className="hidden dark:block text-2xl"><BsSun/></span>
    <span className="dark:hidden text-2xl"><MdOutlineDarkMode/></span>
    </button>
    </>
  )
}

export default DarkMode