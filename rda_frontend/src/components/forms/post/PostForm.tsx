import { UseFormRegister, FieldErrors} from "react-hook-form"
import { NotaFormData } from "../../../types";
import ErrorMessage from "../../errors/ErrorMessage";


 type NotasFormProps = {
  register: UseFormRegister<NotaFormData>;
  errors: FieldErrors<NotaFormData>;
};

 
export default function PostForm({errors, register}: NotasFormProps){

  return (
    <div className="">

        <div className="flex flex-col justify-around gap-12 py-6 ">


        <div className="flex flex-col w-full text-xl">
           <div className="relative mb-10">
          <p className="dark:text-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0  font-medium text-gray-600
              absolute">Titulo</p>
         <input
              placeholder=""
              type="text"
              id="title"
              className="border dark:text-white px-3 py-3 mt-5 w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              {...register("title", {
                required: "El título es obligatorio",
                maxLength: {
                  value: 50,
                  message: "El título no puede tener más de 50 caracteres",
                },
              })}
            />
              {errors.title && (
  <ErrorMessage>{errors.title.message}</ErrorMessage>
)}
        </div>

        <div className="flex flex-col w-full text-xl">
           <div className="relative mb-10">
          <p className="dark:text-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0  font-medium text-gray-600
              absolute">Visibilidad del repositorio</p>
         <select
              id="title"
              className="border dark:text-white px-3 py-3 mt-5 w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              {...register("state", {
                required: "Seleccione un campo",
              })}
            >
              <option disabled value="">Seleccione una opcion</option>
              <option value="PUBLIC">Publico</option>
              <option value="PRIVATE">Privado</option>
            </select>
              {errors.state && (
  <ErrorMessage>{errors.state.message}</ErrorMessage>
)}
        </div>
       
<div className="">
       <p className="font-medium  text-gray-600 dark:text-white p-2">Asunto</p>
  <textarea id="content"  {...register("content", { 
    required: "El contenido es obligatorio",
     maxLength: {
                  value: 100,
                  message: "El título no puede tener más de 100 caracteres",
                },
    
    })} className="border dark:text-white  p-4 pb-12 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700  dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Asunto..."></textarea>
  {errors.content && (
  <ErrorMessage>{errors.content.message}</ErrorMessage>
)}
</div>


        </div>
  </div>
  </div>
  </div>
  )
}

