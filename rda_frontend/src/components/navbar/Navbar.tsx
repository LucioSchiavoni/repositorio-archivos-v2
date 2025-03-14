import { Link } from "react-router-dom"
import { useAuthStore } from "../../context/auth/store"
import DarkMode from "../button/DarkMode"
import { Tooltip } from "@chakra-ui/react"
import { IoCreateOutline } from "react-icons/io5";
import { RiUserAddLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { SiGoogledocs } from "react-icons/si";
const Navbar = () => {

   
      const logout = useAuthStore(state => state.logout)
        const user = useAuthStore(state => state.profile)
      
  return (
    <aside className="flex flex-col z-50 fixed items-center  w-20  min-h-screen py-8 overflow-y-auto bg-gray-100 border-r rtl:border-l rtl:border-r-0 dark:bg-[#181b20] dark:border-neutral-800">


     <nav className="flex flex-col flex-1 mt-12  space-y-14 overflow-x-auto">
            <DarkMode/>
            
        
    <Tooltip label="Inicio" fontSize={"large"} aria-label="A tooltip"> 
 <Link to='/auth' className="p-1.5 flex justify-center  text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        </Link>
    </Tooltip>
       <Tooltip label="Documentos">
        <Link to='/doc' className="dark:text-white flex justify-center text-gray-700"><span className="text-3xl "><SiGoogledocs /></span> </Link>
       </Tooltip>
        <Tooltip label="Crear post" fontSize={"large"} aria-label="A tooltip">
            <Link to="/createPost" className="p-1.5 flex justify-center text-gray-700 text-center focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
        <span className="text-3xl flex flex-col justify-center items-center font-semibold">
            <IoCreateOutline />
            <p className="text-sm">Crear post</p>
            </span> 
        </Link>
        </Tooltip>
        {
            user.rolUser === "ADMIN" ?
             <Tooltip label="Lista de usuarios" fontSize={"large"} aria-label="A tooltip">
        <Link to='/users' >
            <span className="flex flex-col justify-center items-center text-3xl p-1.5 rounded-md hover:bg-gray-200 text-gray-700 
            dark:text-white dark:hover:bg-neutral-800">
                <HiOutlineUsers />
                <p className="text-sm font-semibold">Usuarios</p>
            </span>
            
        </Link>
    </Tooltip>
            :
            null
        }
       


            {
            user.rolUser === "ADMIN" ? 
            <Tooltip label="Crear nuevo usuario" fontSize={"large"} aria-label="A tooltip">
                <Link to='/register' >
                    <span className="text-2xl flex flex-col items-center justify-center text-gray-700 dark:hover:bg-neutral-800 dark:text-white hover:bg-gray-200 p-1.5 rounded-md">
                        <RiUserAddLine />
                        <p className="text-sm font-semibold">Agregar</p>
                    </span>
                    
                </Link>
            
            </Tooltip>
            :
            null
        }

   

    <Tooltip label="Cambiar contraseña" fontSize={"large"} aria-label="A tooltip">
<Link to='/password' className="p-1.5 ml-1 flex flex-col justify-center items-center text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            
        </Link>
    </Tooltip>
        
        
     
    </nav>

    <div className="absolute bottom-0 mb-4">

            <div className="flex flex-col items-center mt-4 space-y-4 ">
        <Tooltip label="Salir" aria-label="A tooltip">
            <button onClick={logout} className="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
            </button>
        </Tooltip>
            
        </div>
    </div>
</aside>
  )
}

export default Navbar