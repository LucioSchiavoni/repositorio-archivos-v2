import {  Link, useParams } from 'react-router-dom';
import DocItem from './DocItem';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {  getDocByIdRequest, updateDocRequest } from '../../api/doc';
import { useState } from 'react';
import Layout from '../../Layout';
import Navbar from '../navbar/Navbar';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { Divider, Spinner } from '@chakra-ui/react'



const DocContent = () => {
  const { authorId, id } = useParams();
  const [docContent, setDocContent] = useState('');
 

  const { data, isLoading } = useQuery<any, Error>({
     queryKey: ['docId', authorId, id],
     queryFn: () =>  getDocByIdRequest(authorId, id)
   });

  const queryClient = useQueryClient()

  const handleSave = async () => {
    try {
      const updateJson = {
        authorId: authorId,
        id: id,
        description: docContent
      }
      const res = await updateDocRequest(updateJson)
      queryClient.invalidateQueries({
        queryKey: ['docId', authorId, id],
        exact: true
      })
      toast.success(res.success)
    } catch (error) {
      toast.error('Error al guardar el documento');
      console.log(error);
    }
  };

  if (isLoading) return <Layout>
    <div className='flex justify-center items-center text-3xl pt-24 dark:text-white'>
      <Spinner/>
    </div>
    
    </Layout>;

  if (!data || !data.description) {
    return <Layout>
       <div className=''>No se encontro el documento</div>
    </Layout>
  }

  const initialContent = data.description

  if(data)

    return (
      <>
   <Navbar/>

        <div className='flex flex-col w-full '>
          <section className='flex flex-col pb-4 '>
      <div className=' mt-12 flex flex-col justify-center items-center  gap-3'>
         <p className='text-black  text-3xl'>{data.title}</p>

         <div className='flex  justify-start px-3 py-2 rounded-full w-10/12 bg-slate-100 '>
              <Link to='/doc' className='bg-white flex py-4 justify-center items-center h-7 w-12 
   rounded-md font-semibold border'><span className='text-center text-xl'><IoArrowBackOutline/></span>
   </Link>
          
            <button 
              className='hover:border text-xl flex ml-12 mt-1 justify-center items-center gap-2  h-7 w-28 text-center rounded-md  hover:bg-white' 
              onClick={handleSave}>
            <span className='text-xl'> <FaCloudDownloadAlt/>
              </span>  <p className=''>Guardar</p>
            </button>
         </div>
    
      </div> 
      <div className='mt-10 '>
              <Divider/>
      </div>

      </section>
                <div className='w-11/12 m-auto bg-white mt-5'>
            <DocItem onChange={setDocContent} initialContent={initialContent}    />
          </div>
        </div>

    </>
    ); 
}

export default DocContent;

