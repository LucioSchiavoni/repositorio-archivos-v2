import {
    Modal,
    ModalContent,
    Button,
    ModalOverlay,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react'
  import { MdOutlineDelete } from "react-icons/md";
import { deletePostRequest } from '../../api/notas';
import { toast } from 'react-toastify';
import {useMutation, useQueryClient} from '@tanstack/react-query'

interface IdProps {
    id: number;
}

const DeletePost: React.FC<IdProps> = ({id}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async({id}: {id: number}) => { return await deletePostRequest(id)},
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['notas'] })
            toast.success(data.success)
        }
    })


    const handleDelete = async() => {
        try {
          mutation.mutate({id})
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
  
 <span className='flex items-center text-xl p-1 ml-2 dark:hover:bg-neutral-700 rounded-md hover:bg-gray-200' onClick={onOpen}><MdOutlineDelete/></span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <h2 className='p-4 text-center font-semibold text-2xl'>Desea eliminar repositorio?</h2>
          <ModalCloseButton />

            <div className='gap-2 flex justify-center items-center p-4' >
                  <Button  onClick={handleDelete} className='dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-white bg-gray-100 hover:bg-gray-200 text-black' >
              Eliminar
            </Button>
            <Button className='dark:bg-neutral-900  dark:hover:bg-neutral-800 dark:text-white bg-gray-100 hover:bg-gray-200 text-black' onClick={onClose}>Cancelar</Button>
            </div>
          
        </ModalContent>
      </Modal>
        </>
  )
}

export default DeletePost