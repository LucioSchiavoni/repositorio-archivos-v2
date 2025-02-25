import { UseFormRegister, FieldErrors} from "react-hook-form"
import ErrorMessage from "../../errors/ErrorMessage";
import { EditData } from "../../../interface/notas";


 type NotasFormProps = {
  register: UseFormRegister<EditData>;
  errors: FieldErrors<EditData>;
};

 
export default function EditForm({errors, register}: NotasFormProps){

  return (
    <div className="">

        <div className="flex justify-around gap-12 py-6 ">


        <div className="flex flex-col w-7/12 text-xl">
           <div className="relative mb-10">
          <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
              absolute">Titulo</p>
          <input placeholder="" type="text"  id="title" className=" text-xl border placeholder-gray-400 focus:outline-none
              focus:border-blue-600 w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0  block bg-white
              border-gray-300 rounded-md" {...register("title")}/>
              {errors.title && (
  <ErrorMessage>{errors.title.message}</ErrorMessage>
)}
        </div>
   

<div className="relative">
  <textarea id="hs-textarea-ex-1" className="p-4 pb-12 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Ask me anything..."></textarea>

  
  <div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-white dark:bg-neutral-900">
    <div className="flex justify-between items-center">

      <div className="flex items-center">
    
        <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:text-blue-500">
          <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <line x1="9" x2="15" y1="15" y2="9"></line>
          </svg>
        </button>
     
        <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:text-blue-500">
          <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
          </svg>
        </button>

      </div>
    

   
      <div className="flex items-center gap-x-1">
      
        <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:text-blue-500">
          <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" x2="12" y1="19" y2="22"></line>
          </svg>
        </button>
       

     
        <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"></path>
          </svg>
        </button>
    
      </div>
   
    </div>
  </div>

</div>


        <div className="relative mb-10">
          <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
              absolute">Estado</p>
      <select className=" text-xl border placeholder-gray-400 focus:outline-none
              focus:border-blue-600 w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0  block bg-white
              border-gray-300 rounded-md"  id="estado" {...register("state")}>
        <option  value="PUBLICO">Publico</option>
        <option value="PRIVADO">Privado</option>
      </select>
            
              {errors.content && (
  <ErrorMessage>{errors.content.message}</ErrorMessage>
)}
        </div>



        </div>

    </div>
  </div>
  

  )
}

