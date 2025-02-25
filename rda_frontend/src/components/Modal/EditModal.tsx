import { Button, Modal, ModalContent, ModalOverlay, ModalCloseButton, ModalBody, useDisclosure } from "@chakra-ui/react"
import EditForm from "../forms/post/EditForm"
import { useForm } from "react-hook-form"
import { editNotasRequest } from "../../api/notas"
import { EditData } from "../../interface/notas"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"
// import { toast } from "react-toastify"
// import { useMutation } from "@tanstack/react-query"


interface EditProps {
    id: string;
}
const EditModal: React.FC<EditProps> = ({id}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()


     const {register, handleSubmit, formState: {errors}} = useForm<EditData>()
    
         const mutation = useMutation({
        mutationKey: ['updateNota', id],
        mutationFn: (data: EditData) => editNotasRequest(id, data),
        onError: (error) => {
            console.log("desde onError")
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data.succes)
             setTimeout(() => {
            window.location.reload()
        },3000)
        }
    })

   const handleForm = async ( data: EditData) => {
    try {
        const jsonData: EditData = {
            motivo: data.motivo,
            estado: data.estado,
            nro_pedido: data.nro_pedido,
            observaciones: data.observaciones
        }
        // await editNotasRequest(id, jsonData)
        mutation.mutate(jsonData)
    } catch (error) {
        console.log(error)
    }
       
    }


  return (
    <>
           <Button onClick={onOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <h2 className="text-3xl text-center py-6 font-semibold ">Editar nota</h2>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(handleForm)}>
            <EditForm register={register}
            errors={errors}
            />
           <button  type="submit" className=" rounded-md px-3 py-2 w-64 m-auto mb-2 border hover:bg-blue-800 bg-blue-900 text-white font-semibold">Guardar cambios</button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
  
    </>
  )
}

export default EditModal