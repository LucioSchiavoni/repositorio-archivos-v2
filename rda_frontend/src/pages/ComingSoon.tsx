import { BlockNoteView } from '@blocknote/mantine'
import Layout from '../Layout'
import {  useCreateBlockNote } from '@blocknote/react'

const ComingSoon = () => {

    const editor = useCreateBlockNote({ initialContent: [{type:"paragraph", content:"Proximamente... nuevo editor de texto"}]})
  return (
    <Layout>
         <div className='text-2xl text-center ml-24 font-semibold dark:text-white text-black'> <p className=''>Proximamente.</p></div>
         <BlockNoteView editor={editor} className='w-6/12 m-auto mt-24' />
    </Layout>
   
  )
}

export default ComingSoon