import { Link, useParams } from "react-router-dom";
import { File } from "../../interface/notas";
import {  getFolderById } from "../../api/notas";
import { MdArrowBack } from "react-icons/md";
import SubirArchivo from "./ArchivoModal";
import FileCard from "../item/FileCard";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const FolderById = () => {
    const { postId, folderId, titlePost, nameFolder } = useParams<{ postId: any, folderId: string, titlePost: string, nameFolder:string }>();

    const postIdInt = parseInt(postId || "");
    const folderIdInt = parseInt(folderId || "");


    const {data, isLoading} = useQuery({
        queryKey: ['notas', postIdInt, folderIdInt],
        queryFn: () => getFolderById(postIdInt, folderIdInt),
        enabled: !!postIdInt && !!folderIdInt
    })

        if(isLoading) return <div className="flex-col flex justify-center items-center  mt-24 dark:text-white ">
              
            <aside className="dark:text-white ">
              <Spinner/>
            </aside>
            </div> ;

    if(data)
    return (

      <div className="dark:text-white">
        <aside className="absolute gap-8 left-24 top-10 flex items-center text-2xl font-thin ">
        <Link to={`/auth`} className="  dark:hover:bg-neutral-800 hover:bg-gray-100 shadow-xl px-3 py-1 rounded-md text-3xl">
            <MdArrowBack/>
        </Link>
        <Link to={`/${postId}`} >
           <p className=" hover:bg-gray-100 dark:hover:bg-neutral-800 p-2 hover:font-normal  rounded-md">{titlePost}</p>
        </Link>
        
        <p className="hover:underline underline-offset-2">{nameFolder}</p>

        <span className=" w-56  shadow-xl rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-900 dark:border-neutral-800 bg-gray-50 border text-center">
                    <SubirArchivo id={postId} folderId={folderId} /> 
                </span>
        </aside>

        <div className="flex flex-col  mt-16  ">
                
             
            
            <h2 className="ml-36 text-2xl  text-start mt-10 ">Archivos en esta carpeta</h2> 
        </div>
            
        <div className="grid grid-cols-6 ml-24 p-8 gap-24 place-content-start   dark:text-white ">
            {
            Array.isArray(data) && data.length === 0 ?
            <div>
                 <div className="flex justify-center flex-col p-4"> 
                <p className="text-center font-medium text-xl">Carpeta vacia</p>
       
       
            
            <div className="text-start flex flex-col  mt-6 hover:underline   py-2 underline-offset-2 border rounded-md shadow-xl ">
                        
                <SubirArchivo id={postId} folderId={folderId}/>  
            </div>
        
            </div>
            </div>
            :
            Array.isArray(data) && data.map((item: File, index: number) => (
                <FileCard key={index} createdAt={item.createdAt} nameFile={item.nameFile} id={item.id} idPost={postId}  />
            ))
        
        
        
   }
           
        </div> 

      </div>
        
    );
}

export default FolderById;


