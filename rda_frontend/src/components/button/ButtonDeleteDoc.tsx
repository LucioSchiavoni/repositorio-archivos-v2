import { deleteDocRequest } from "../../api/doc"
import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MdDeleteOutline } from "react-icons/md"
import { toast } from "react-toastify"


interface DocIdProps {
    id: string
}



const ButtonDeleteDoc: React.FC<DocIdProps> = ({id}) => {


    const {isOpen, onOpen, onClose} = useDisclosure()

    const queryClient = useQueryClient()

    const mutationDeleteDoc = useMutation({
        mutationFn: async ({id}: {id: string}) => {
            return await deleteDocRequest(id)
        },
        onError: (error) => {
            toast.info(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['docId']})
            toast.success(data.success)
        }
    })

    const handleDelete = () => {
       mutationDeleteDoc.mutate({id})
    }

  return (
    <div>
        <button onClick={onOpen}>
          
    <span className="text-xl flex hover:bg-neutral-700 p-2 rounded-md"><MdDeleteOutline /></span>

        </button>
        
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
        </div>
  )
}

export default ButtonDeleteDoc