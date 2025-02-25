import LoginForm from "../components/LoginForm"
import StarsCanvas from "../components/layout/StarBackground"
import {motion} from 'framer-motion'
import { slideInFromRight, slideInFromTop } from "../components/utils/motion"
import logo from '../assets/logo-blanco.png'

const Home = () => {
  return (
    <section className="bg-gradient-to-r  from-cyan-900 via-neutral-800 to-neutral-900  min-h-screen">
     
    <div className="container flex flex-row justify-center gap-24 items-center px-6 py-24 "> 
    <motion.div
    initial="hidden"
    animate="visible"
    >
  <motion.div variants={slideInFromTop}>
      <h1 className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400 text-4xl">  Repositorio de archivos </h1>
     
    </motion.div>

     <motion.img variants={slideInFromRight(0.5)} src={logo} alt="logo" className="h-40 w-80" />
    </motion.div>


        <div className="lg:flex "> 
       
            <div className=" ">
              
            <StarsCanvas/>
                
               
            </div>
           
           <div className="z-50 w-full ">
      
            <LoginForm/>
            </div>



    
            
        </div>

      
    </div>
</section>
  )
}

export default Home