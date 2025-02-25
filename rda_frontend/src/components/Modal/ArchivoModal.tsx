import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,

  ModalBody,
  ModalCloseButton,
  useDisclosure,

} from '@chakra-ui/react'

import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createFileInFolder, createFileRequest } from '../../api/notas';
import { toast } from 'react-toastify';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import { useQueryClient, useMutation } from '@tanstack/react-query';


interface ArchivoProps {
  id: {
    id: string;
  };
    folderId?: string;
}
const SubirArchivo: React.FC<ArchivoProps> = ({id, folderId}) => {


 const {handleSubmit} = useForm()

 const queryClient = useQueryClient()

  const mutationFileInFolder = useMutation({
    mutationFn: createFileInFolder,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notas'] })
      toast.success(data.message)
    }
  })

  const mutationFile = useMutation({
    mutationFn: createFileRequest,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notas'] })
      toast.success(data.message)
    }
  })



const [file, setFile] = useState<File | null>(null);
        const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
        }
    };

  const handleForm = async () => {
    try {
      const formData = new FormData();
      console.log("Datos here: ", id, folderId)
      if (file) {
        formData.append('file[url]', file);
      }
      
      let data;
      if (folderId) {
        formData.append('postId', id.toString()); 
        formData.append('folderId', folderId);
        data = mutationFileInFolder.mutate(formData)
      } else {
        formData.append('id', id.id); 
        data = mutationFile.mutate(formData)
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al subir el archivo');
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <button onClick={onOpen}  className='px-3 py-1 w-full dark:text-white dark:hover:bg-neutral-800 dark:border-neutral-800  font-semibold  rounded-md  flex items-center justify-center text-center gap-5 dark:bg-neutral-900'>Subir archivo 
      <span className="text-2xl font-thin "><HiOutlineDocumentPlus/></span>
      </button>

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent className='h-64'>
          <ModalHeader className='text-center'>Subir nuevo archivo 
      </ModalHeader>
          <ModalCloseButton />
          <ModalBody className=' flex justify-center items-center'>
            <form onSubmit={handleSubmit(handleForm)}>
                
            <label htmlFor="dropzone-file" className="flex items-center px-3 py-3 mx-auto  text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>

                <h2 className="mx-3 text-gray-400">Subir archivo PDF, Docx, txt, Excel</h2>

                <input id="dropzone-file" type="file" className="hidden" onChange={(e) => handleFileChange(e)} />
            </label>
              <button type='submit' className='w-full hover:bg-neutral-800  px-3 py-2 text-xl bg-neutral-900 rounded-md text-white font-semibold mt-10'>Subir</button>
            </form>
          </ModalBody>

       
        </ModalContent>
      </Modal>
    </>
  )
}


export default SubirArchivo;