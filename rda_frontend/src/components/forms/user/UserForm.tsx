import { useForm } from "react-hook-form"
import { registerRequest } from "../../../api/auth"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


const UserForm = () => {

  

     const { register, handleSubmit, watch, formState: { errors } } = useForm<{
        name: string;
        username: string;
        password: string;
        confirmPassword: string;
        rol: string;
      }>();
     const navigate = useNavigate()

    const handleForm = async(data: Record<string, any>) => {

      try {
          const jsonData = {
            name: data.name,
            username: data.username,
            password: data.password,
            rol: data.rol
          }
          const res = await registerRequest(jsonData)
          toast.success(res.success)
          navigate("/auth")
          
      } catch (error) {
        console.log(error)
      }
    }

    

  return (
    <form className="p-4 border dark:border-neutral-700 shadow-xl rounded-md bg-white dark:bg-neutral-900 dark:text-white" onSubmit={handleSubmit(handleForm)}>
        <h2 className="text-center text-3xl mb-10 font-semibold">Registrar usuario</h2>
        <div className="relative flex items-center mt-8">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </span>
                <input {...register("name", {
            required: "Este campo es requerido",
          })} type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  dark:text-gray-900 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Nombre completo"/>
           {errors.name ? <span className="text-red-800 text-xl px-2 py-1">{errors.name.message}</span> : null}
            </div>


        <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </span>
                <input {...register("username", {
            required: "Este campo es requerido",
          })} type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  dark:text-gray-900 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Nombre de usuario"/>
           {errors.username ? <span className="text-red-800 text-xl px-2 py-1">{errors.username.message}</span> : null}
            </div>

        <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  dark:text-gray-900 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Contraseña"  {...register("password", {
            required: "Este campo es requerido",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres"
            }
          })}/>
                 {errors.password ? <span className="text-red-800 text-xl px-2 py-1">{errors.password.message}</span> : null}
            </div>

        <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input {...register("confirmPassword", {
            validate: value => value === watch("password") || "Las contraseñas no coinciden"
          })} type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  dark:text-gray-900 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirmar contraseña" />
             {errors.confirmPassword ? <span className="text-red-800 text-xl px-2 py-1">{errors.confirmPassword.message}</span> : null}
            </div>

           <div className="relative mt-6">
          <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
              absolute">Rol</p>
          <select {...register("rol", {
            required: "Este campo es obligatorio"
          }) } className="border text-black placeholder-gray-400 focus:outline-none
              focus:border-blue-600 w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
              border-gray-300 rounded-md">
            <option value="USER">Usuario</option>
            <option value="ADMIN">Administrador</option>
          </select>
           {errors.rol ? <span className="text-red-800 text-xl px-2 py-1">{errors.rol.message}</span> : null}
        </div>

<button type="submit" className="mt-8 border px-3 py-2 text-black rounded-md  w-full dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-white bg-gray-100 shadow-xl hover:bg-gray-200 font-semibold text-xl justify-center ">Registrar</button>
    </form> 
  )
}

export default UserForm