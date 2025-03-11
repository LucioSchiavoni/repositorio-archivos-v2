import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { deleteFileRequest, deleteFolderRequest } from "../../api/notas"
import { toast } from "react-toastify"
import { MdDeleteOutline } from "react-icons/md";
import {useMutation, useQueryClient} from '@tanstack/react-query'


interface PostIdPorps {
    id: number,
    folderId?: number
    fileId?: number
}

const ButtonDelete: React.FC<PostIdPorps> = ({id, folderId, fileId}) => {

    const {isOpen, onOpen, onClose} = useDisclosure()

    const queryClient = useQueryClient()

    const mutationFolder = useMutation({
        mutationFn:async ({id, folderId}: {id: number, folderId: number}) => {
            if(folderId){
                return await deleteFolderRequest(id, folderId)
            }else{
                toast.error("Archivo no encontrado")
            }
        },
        onError: (error) => {
            toast.info(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['notas']})
            toast.success(data.message)
          
        }
    })

    const mutationFile = useMutation({
        mutationFn:async ({id, fileId}: {id: number, fileId: number}) => {
            if(fileId){
                return await deleteFileRequest(id, fileId)
            }else{
                toast.error("Archivo no encontrado")
            }
        },
        onError: (error) => {
            toast.info(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['notas']})
            toast.success(data.message)

        }
    })


    const handleDelete = async() => {
        try {
            if(folderId){    
              mutationFolder.mutate({id, folderId})
            }else if(fileId) {
                mutationFile.mutate({id, fileId})
            }else{
                toast.info("Archivo o carpeta no encontrado")
            }
        } catch (error) {
            console.log(error)   
        }
    }

  return (
    <div>
        <button onClick={onOpen}>
            {
                fileId ?
                <span className="text-xl flex hover:bg-neutral-700 p-2 rounded-md"><MdDeleteOutline /></span>
                :
                <p>Eliminar carpeta</p>
            }
        </button>
        {
            !folderId ? 

            <Modal  isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Desea eliminar este archivo?</ModalHeader>
            <ModalCloseButton/>
            <div className="flex flex-col gap-3 gap-4 p-6">

            <div className="gap-4 flex justify-center">
                  <button className="px-3 py-1 rounded-md hover:bg-neutral-800 bg-neutral-900 text-white w-24 " onClick={handleDelete}>
            Borrar
        </button>
 
            <button className="px-3 py-1 rounded-md hover:bg-neutral-800 bg-neutral-900 text-white w-24 " onClick={onClose}>
              Cerrar
            </button> 
            </div>
         

 
            </div>
       
         </ModalContent>
        </Modal>
        
        :
       
        <Modal  isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Desea eliminar esta carpeta?</ModalHeader>
            <ModalCloseButton/>
            <div className="flex flex-col gap-3 gap-4 p-6">
                <div className="flex justify-center mb-4">
                       <p>Se eliminaran los archivos que se encuentran dentro</p>   
                </div>
            <div className="gap-4 flex justify-center">
                  <button className="px-3 py-1 rounded-md hover:bg-neutral-800 bg-neutral-900 text-white w-24 " onClick={handleDelete}>
            Borrar
        </button>
 
            <button className="px-3 py-1 rounded-md hover:bg-neutral-800 bg-neutral-900 text-white w-24 " onClick={onClose}>
              Cerrar
            </button> 
            </div>
         

 
            </div>
       
         </ModalContent>
        </Modal>
         }
    </div>
  )
}


export default ButtonDelete