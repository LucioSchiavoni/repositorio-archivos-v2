import { toast } from "react-toastify"
import { addPermissions } from "../../api/notas"
import { useQuery } from "@tanstack/react-query"
import { User } from "../../interface/notas"
import { getUsers } from "../../api/auth"
import { useAuthStore } from "../../context/auth/store"
import { useState } from "react"


interface postIdProps {
    postId: number
}

const AddPermissions: React.FC<postIdProps> = ({postId}) => {

    const {data} = useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: getUsers
    })

    const [userId, setUserId] = useState("")

    const profile = useAuthStore((state) => state.profile);

    const handleForm = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
                const jsonData = {
                    userId: userId,
                    permission: "WRITE",
                    postId: postId
                } 
            const result = await addPermissions(jsonData)
                toast.info(result?.info)
        } catch (error) {
            console.log(error)
        }
    }

if(data)
  return (
 
        <form onSubmit={handleForm} className="flex gap-4 items-center">
       
                <select name="userId"  id="userId"
                onChange={(e) => setUserId(e.target.value)}
                   value={userId || ''} className="px-3 h-10  w-40 text-black py-2 border shadow-md rounded-md ">
                    <option value="" disabled>Seleccionar usuario</option>
                   { 
                       data?.map((item, index) => (
                        profile.id === item.id ? null :
                        
                    <option value={item.id} key={index}  >{item.name}</option>
                          ))
}
                    </select>
        <button className="px-3 py-2 rounded-md shadow-xl h-10 hover:bg-gray-100 dark:hover:bg-neutral-700 dark:bg-neutral-800" type="submit">Agregar</button> 
        </form>
        
  )
}

export default AddPermissions