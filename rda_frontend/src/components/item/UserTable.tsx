import { useQuery } from "@tanstack/react-query"
import { User } from "../../interface/notas"
import { deleteUser, getUsers } from "../../api/auth"
import { toast } from "react-toastify"
import { TiUserDeleteOutline } from "react-icons/ti";
import { Spinner } from "@chakra-ui/react";
import Layout from "../../Layout";


const UserTable = () => {

    const {data, isLoading} = useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: getUsers
    })

  
    
    const handleDelete = async(id: number) => {
        try {
            const res = await deleteUser(id)
            toast.info(res?.success)
            setTimeout(() =>{
                window.location.reload()
            },1000)
        } catch (error) {
            console.log(error)
        }
    }

    if(isLoading)
        return (
            <Layout>
               <Spinner/>
            </Layout>
               
            
        )

    if(data)
  return (
    <div className="flex flex-col w-10/12 m-auto">
  <div className="-m-1.5 overflow-x-auto">
    <div className="p-1.5 min-w-full inline-block align-middle">
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-white">Nombre</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-white">Usuario</th>
              <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-white">Rol</th>
              <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-white">Eliminar usuario</th>
            </tr>
          </thead>
          <tbody>

                {
                    data.map((item:User, index: number) => (
                        
            <tr key={index} className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-end">{item.rolUser}</td>
              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">

               
                  
                  <button className="px-3 py-2 bg-white rounded-md text-xl" onClick={() => handleDelete(item.id)}>
                    <TiUserDeleteOutline />
                  </button>


              </td>
            </tr>
   ))
                }
            
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  )
}

export default UserTable