import { useState } from "react";
import { toast } from "react-toastify";
import { downloadFileRequest } from "../../api/notas";

interface ButtonDownloadProps {
    fileId: number;
    nameFile: string;
}

const ButtonDownload: React.FC<ButtonDownloadProps> = ({ fileId, nameFile }) => {
    const [isLoading, setIsLoading] = useState(false);

    const removeExtension = (nameFile: any) => {
        const dotIndex = nameFile.lastIndexOf('.');
        return dotIndex === -1 ? nameFile : nameFile.substring(0, dotIndex);
    };

    const handleDownload = async () => {
        setIsLoading(true); 

        try {
            const res = await downloadFileRequest(fileId);
            const fileNameWithoutExtension = removeExtension(nameFile);

            if (res?.status === 200) {
                const fileData = res.data;
                const blob = new Blob([fileData]);
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;

                const fileTypes: Record<string, string> = {
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
                    "application/pdf": ".pdf",
                    "application/txt": ".txt",
                    "application/x-rar-compressed": ".rar",
                    "application/zip": ".zip",
                    "image/png": ".png",
                    "image/jpeg": ".jpg",
                    "image/svg+xml": ".svg",
                    "image/gif": ".gif",
                    "video/mp4": ".mp4", 
                    "video/quicktime": ".mov",
                    "audio/mpeg": ".mp3",
                };
                

                const fileExtension = fileTypes[res.data.type] || null;

                if (fileExtension) {
                    link.setAttribute('download', `${fileNameWithoutExtension}${fileExtension}`);
                    link.click();
                    window.URL.revokeObjectURL(url);
                } else {
                    toast.error("No se puede descargar este tipo de archivos");
                }
            } else {
                console.error('Error en la solicitud:', res?.statusText);
            }
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <button 
            onClick={handleDownload} 
            disabled={isLoading}
            className={`flex justify-center items-center py-2 text-sm font-medium transition-colors duration-200 sm:text-base sm:px-6 rounded-md ${
                isLoading ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed" : "bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-neutral-800"
            } border dark:border-neutral-800 dark:text-white gap-x-3`}
        >
            {isLoading ? (
                <svg className="animate-spin w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="31.415, 31.415"></circle>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
            )}
            <span className="dark:text-white">{isLoading ? "Descargando..." : "Descargar"}</span>
        </button>
    );
};

export default ButtonDownload;
