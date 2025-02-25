
import { loginRequest, auth } from "../api/auth"
import { useAuthStore } from "../context/auth/store"
import { useNavigate} from "react-router-dom"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"




const LoginForm = () => {

  const setToken = useAuthStore(state => state.setToken)

  const setProfile = useAuthStore(state => state.setProfile)


  



  const navigate = useNavigate()

const mutation = useMutation({
  mutationFn: loginRequest,
  onError: (error) => {
    console.log("desde onError")
    toast.error(error.message)
  },
  onSuccess: async(response) => {
    if(response && response.data && response.data.token) {
      const token = response.data.token;
      setToken(token);
      const isAuth = await auth();
      setProfile(isAuth);
      navigate("/auth");
    } else {
      toast.error("Credenciales incorrectas");
    }
  }
});

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {

      e.preventDefault()
      const username = (e.currentTarget.elements[0] as HTMLInputElement).value
      const password = (e.currentTarget.elements[1] as HTMLInputElement).value
       const userData = { username, password };;

      try {
          mutation.mutate(userData)
      } catch (error) {
       console.log(error)
      }


    }


  return (
    <div className="w-full   ">

<div className="max-w-sm space-y-3  rounded-md p-8">
  <h1 className="text-center font-medium text-4xl text-white">Inicia sesión</h1>
  <form onSubmit={handleSubmit} className="gap-10 flex flex-col  ">
  <div className="relative mt-10">
    <input type="text" className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-xl  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Usuario"/>
    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
      <svg className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </div>
  </div>

  <div className="relative">
    <input type="password" className="peer py-3 px-4 ps-11 block w-full text-xl bg-gray-100 border-transparent rounded-lg  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Contraseña"/>
    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
      <svg className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
        <circle cx="16.5" cy="7.5" r=".5"></circle>
      </svg>
    </div>
  </div>
  <button className="px-3 py-1 rounded-md bg-gray-50 hover:bg-gray-200 text-xl font-medium">Ingresar</button>
  </form>
</div>


  </div>
  )
}

export default LoginForm