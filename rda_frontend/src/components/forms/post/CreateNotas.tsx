import { useForm } from "react-hook-form"
import { NotaFormData } from "../../../types"
import { createNotasRequest } from "../../../api/notas"
import { toast } from "react-toastify"
import {useMutation, useQueryClient} from '@tanstack/react-query'
import { useAuthStore } from "../../../context/auth/store"
import PostForm from "./PostForm"
import { useNavigate } from "react-router-dom"

export default function CreatePost() {


    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const initialValues: NotaFormData = {
    title:"",
    content: "",
    state: "",
    authorId:"",   
    }

    const {register, handleSubmit, formState: {errors}} = useForm<NotaFormData>({ defaultValues: initialValues })
      
    const user = useAuthStore((state) => state.profile);
    const userId = user.id;

    const mutation = useMutation({
        mutationFn: createNotasRequest,
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
    
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['notas']})
            toast.success(data.success)
            navigate('/auth')
        }
    })

   const handleForm = async (data: NotaFormData) => {
    try {
        
        const jsonData = {
            ...data,
            authorId: userId
        };
        
        mutation.mutate(jsonData)
     
    } catch (error) {
        console.log(error) 
      
    }
   }

return (

    <div>
        <h2 className="text-center text-4xl mb-8 font-medium dark:text-white">Nuevo repositorio</h2>

        <form onSubmit={handleSubmit(handleForm)} className="border dark:border-neutral-700 rounded-md px-3  py-4 shadow-xl dark:bg-neutral-800 " encType="multipart/form-data">
        <div className="flex flex-col-reverse ">
 <PostForm 
            register={register}
            errors={errors}
        />
        </div>
        <button type="submit" className="mt-4 px-3 py-2 bg-neutral-800 dark:border-neutral-700 font-medium text-white hover:bg-neutral-700  dark:bg-neutral-900 dark:hover:bg-neutral-700 rounded-md shadow-xl border text-xl w-full">Crear nota</button>
        </form>
        
    </div>
    )
}

