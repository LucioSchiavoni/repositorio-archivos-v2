import { useForm } from "react-hook-form";
import { changePassword } from "../../../api/auth";
import { toast } from "react-toastify";
import { useAuthStore } from "../../../context/auth/store";

interface PasswordInput {
  password: string;
  confirmPassword: string;
}

const ChangePasswordForm = () => {
  const { register, handleSubmit,   watch, formState: { errors } } = useForm<PasswordInput>(); 
  const user = useAuthStore((state) => state.profile);
  const userId = user.id;

  const onSubmit = async (data: PasswordInput) => {     
    
    try {
      const res = await changePassword(userId, data.password);
      toast.success(res.success);
      console.log(res.success);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-thin mb-12 dark:text-white">
        Ingresa una nueva contraseña
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input type="password" id="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Contraseña"  {...register("password", {
            required: "Este campo es requerido",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres"
            }
          })}/>
                 
            </div>
            {errors.password ? <span className="text-red-800 text-xl px-2 py-1">{errors.password.message}</span> : null}
        <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input  {...register("confirmPassword", {
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })} type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirmar contraseña"/>
            
            </div>
            {errors.confirmPassword && (
            <span className="text-red-800 text-xl px-2 py-1">
              {errors.confirmPassword.message}
            </span>
          )}
        <button
          type="submit"
          className="px-3 py-2 text-xl font-medium hover:bg-gray-200 bg-gray-100 shadow-xl rounded-md dark:text-white dark:bg-neutral-900 border dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
