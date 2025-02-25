import { toast } from "react-toastify";
import { downloadFileRequest } from "../../api/notas";

interface ButtonDownloadProps {
    fileId: number;
    nameFile: string;
}

const ButtonDownload: React.FC<ButtonDownloadProps> = ({ fileId, nameFile }) => {

    const removeExtension = (nameFile:any) => {
       
        const dotIndex = nameFile.lastIndexOf('.');
        
       
        if (dotIndex === -1) {
            return nameFile;
        }
        
        return nameFile.substring(0, dotIndex);

        }

    const handleDownload = async () => {
        try {
            const res = await downloadFileRequest(fileId);
            
            const fileNameWithoutExtension = removeExtension(nameFile)

            if (res?.status === 200) {
                
                const fileData = res.data;
                
               
                const blob = new Blob([fileData]);
          
                const url = window.URL.createObjectURL(blob);
                
                const link = document.createElement('a');
                link.href = url;

                if(res.data.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
                     link.setAttribute('download', `${fileNameWithoutExtension}.docx`);
                }else if(res.data.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                    link.setAttribute('download', `${fileNameWithoutExtension}.xlsx`);
                }else if (res.data.type === "application/pdf"){
                    link.setAttribute('download', `${fileNameWithoutExtension}.pdf`);
                }else if (res.data.type === "application/txt"){
                    link.setAttribute('download', `${fileNameWithoutExtension}.text/plain`);
                }else if(res.data.type === "application/x-rar-compressed"){
                    link.setAttribute('download', `${fileNameWithoutExtension}.rar`);
                }else if(res.data.type === "application/zip"){
                    link.setAttribute('download', `${fileNameWithoutExtension}.zip`);
                }else {
                    toast.error("No se puede descargar este tipo de archivos")
                }
          
                
                link.click();
                
                window.URL.revokeObjectURL(url);
            } else {
               
                console.error('Error en la solicitud:', res?.statusText);
            }
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        }
    };        

    return (
         <button onClick={handleDownload} className="flex justify-center items-center py-2 text-sm font-medium   transition-colors duration-200 sm:text-base sm:px-6  rounded-md dark:hover:bg-neutral-800 bg-gray-100 dark:bg-neutral-900  border dark:border-neutral-800 dark:text-white gap-x-3 hover:bg-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
        </svg>

        <span className="dark:text-white">Descargar</span> 
    </button>
    );
}

export default ButtonDownload;
