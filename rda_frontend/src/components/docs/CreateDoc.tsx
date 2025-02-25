import { createDocRequest } from '../../api/doc';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useAuthStore } from '../../context/auth/store';
import Layout from '../../Layout';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { Block } from '@blocknote/core';
import { generateDocx } from '../utils/generateDocx';
import { MdEdit } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Divider } from '@chakra-ui/react';
import { FaCloudDownloadAlt } from 'react-icons/fa';


const CreateDoc = () => {

    const navigate = useNavigate()
    const [blocks, setBlocks] = useState<Block[]>([]);
    const user = useAuthStore((state) => state.profile);
    const userId = user.id;
    const [title, setTitle] = useState("Sin titulo");


    const saveNewDoc = async () => {
        const dataJson = {
            authorId: userId,
            title: title,
            description: JSON.stringify(blocks) 
        };
            
        try {
            const res = await createDocRequest(dataJson);
            navigate("/doc")
            toast.success(res.success);

        } catch (error) {
            console.log(error);
        }
    
    };

    const editor = useCreateBlockNote({
        initialContent: blocks.length > 0 ? blocks : [{type: "heading", content:"Hola mundo"}]
    });



    return (
        <>
            <Layout>
                <div className='flex flex-col dark:bg-white min-h-screen'>
                <section className='flex flex-col pb-4 '>
<div className=' mt-12 flex flex-col justify-center items-center  gap-3'>
    <div className='flex items-center gap-4'>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className='text-xl text-black px-3 focus:ring-2 focus:outline-none focus:ring-cyan-600 border  py-1  rounded-md ' placeholder='Sin titulo'/>
  
  <span className='text-xl'><MdEdit/>
    </span> 
    </div>

   <div className='flex  justify-between px-3 py-2 rounded-full items-center w-10/12 bg-slate-100 '>
      
      <aside className='flex justify-start gap-6 items-center'>
        
        <Link to='/doc' className='bg-white flex py-4 justify-center  items-center h-7 w-12 
rounded-md font-semibold border'><span className='text-center text-xl'><IoArrowBackOutline/></span>
</Link>
    
      <button 
        className='hover:border text-xl flex  mt-1 justify-center items-center gap-2  h-7 w-28 text-center rounded-md  hover:bg-white' 
        onClick={() => saveNewDoc()}>
      <span className='text-xl'> <FaCloudDownloadAlt/>
        </span>  <p className=''>Guardar</p>
      </button>
      
        </aside>  
   <div className='flex justify-center items-center'>
    <button className='mr-6 h-7 w-32 text-xl mt-1 flex justify-center text-center rounded-md hover:bg-white hover:border items-center gap-2' onClick={() => generateDocx(blocks)}> <span className=''><FaCloudDownloadAlt/></span>Descargar</button>
   </div>
   </div>


</div> 
<div className='mt-10 '>
        <Divider/>
</div>

</section>
                    <div className='mt-24'>
                    <BlockNoteView 
                    className='border w-9/12 p-4 mb-40 m-auto rounded-md '
                        editor={editor}
                        onChange={() => {
                            setBlocks(editor.document);
                        }}
                        theme="light"
                    />
                </div>  
                  </div>
            </Layout>   
        </>
    );
};

export default CreateDoc;


