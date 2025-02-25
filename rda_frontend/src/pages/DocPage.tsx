import { useQuery } from "@tanstack/react-query"
import Layout from "../Layout"
import {  getAllDocRequest } from "../api/doc"
import { useAuthStore } from "../context/auth/store"
import { Link } from "react-router-dom"
import {  SimpleGrid, Spinner, Tooltip } from "@chakra-ui/react"
import DateFormat from "../components/utils/DateFormat"
import AddCollaborators from "../components/Modal/AddCollaborators"




const DocPage = () => {


  const user = useAuthStore((state) => state.profile)

  const userId = user.id

      const { data, isLoading } = useQuery<any, Error>({
      queryKey: ['docId', userId],
      queryFn: () => getAllDocRequest(userId|| "")
  });


  
  if(isLoading) return 
  <Layout>

      <div className="text-center "><Spinner/></div>
  </Layout>


if(!data ||data.length === 0) return (
  <Layout>
    
<div className=" bg-gray-100 dark:bg-neutral-800  w-full px-28 py-8 ">

      <Tooltip label="Crear nuevo documento">
           <Link to='/createDoc' className="ml-24 h-52 w-40   py-1 rounded-md text-xl flex items-center gap-2">
           <img src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" alt="create-doc" className="h-52 border rounded-md shadow-xl hover:scale-110 transition-all duration-300 delay-150 " />
           </Link>
      </Tooltip>

</div>

<div>
  <p className="text-center text-2xl font-semibold dark:text-white mt-24">Sin documentos creados.</p>
</div>
  </Layout>
)

 if(data)
  return (
<>  
<Layout>
 

<div className=" bg-gray-100 dark:bg-neutral-800  w-full px-28 py-8 pt-24">
   
      <Tooltip label="Crear nuevo documento">
           <Link to='/createDoc' className="ml-24 h-52 w-40   py-1 rounded-md text-xl flex items-center gap-2">
           <img src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" alt="create-doc" className="h-52 border rounded-md shadow-xl hover:scale-110 transition-all duration-300 delay-150 " />
           </Link>
      </Tooltip>

</div>

<SimpleGrid spacing={4} ml={24} p={24} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
{data.map((item: any, index: number) => (
  <div className="hover:scale-110 transition-all delay-150 duration-300 h-71 w-52 rounded-md border dark:border-neutral-700 flex flex-col ">
  
    <Link to={`/docId/${userId}/${item.id}`} key={index} className="">
        <img src="https://icones.pro/wp-content/uploads/2022/06/icone-microsoft-word.png" alt="google-doc-icons" className="w-36 m-auto" />
        <article className="">
            <div className="mt-auto flex flex-col w-full  h-24 rounded-t-md bg-slate-100">
                <p className="text-center text-xl p-1">{item.title}</p>
                <p className="text-sm text-center  font-medium">
                    <DateFormat item={item.createdAt} />
                </p>
            </div>
        </article>
    </Link>
    <div className="bg-slate-100 w-full">
                    <AddCollaborators documentId={item.id}/>
                </div>
    </div>
))}
</SimpleGrid>
    </Layout>
    </>
  )
}

export default DocPage






