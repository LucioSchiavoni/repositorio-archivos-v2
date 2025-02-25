import { useForm } from "react-hook-form"
import { createFileByIdFolderRequest } from "../../api/notas"
import { toast } from "react-toastify"
import { ChangeEvent, useRef, useState } from 'react';
import { Button, FormControl, Modal, ModalOverlay, useDisclosure,
    ModalCloseButton,
    ModalHeader,
    ModalContent,
    ModalBody,
    ModalFooter
 } from "@chakra-ui/react";
 import { MdOutlineFileUpload } from "react-icons/md";

interface idProps {
    id: number
    folderId: number
}

const UploadFileInFolder: React.FC<idProps> = ({id, folderId}) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const {handleSubmit} = useForm()

    const [file, setFile] = useState<File | null>(null);
        const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
        }
    };

    const handleForm = async () => {
        try {
            const formData = new FormData()
            formData.append("id", JSON.stringify(id))
            formData.append("folderId", JSON.stringify(folderId))
            if(file){
                 formData.append("file[url]", file)
                 
            }
           const data = await createFileByIdFolderRequest(formData)
            toast.success(data.succes)
            setTimeout(() => {
                window.location.reload()
            },1000)
        } catch (error) {
            console.log(error)
        }
        
    }


  return (
<>

           <button onClick={onOpen} className="dark:bg-neutral-900 dark:border-natural-700 border px-2 rounded-md "><p className="text-normal dark:text-white"><MdOutlineFileUpload/></p></button>
  
        <Modal 
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="text-center mt-2">Subir archivo en la carpeta actual</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} >
              <FormControl onSubmit={handleSubmit(handleForm)}>
       
                <input type="file" className=" m-5" onChange={(e) => handleFileChange(e)}  />
              </FormControl>
  
            </ModalBody>
  
            <ModalFooter>
              <Button  type="submit" mr={3}>
                Subir
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </>
  )
}

export default UploadFileInFolder


