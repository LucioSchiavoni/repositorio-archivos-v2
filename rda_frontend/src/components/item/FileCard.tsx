
import { useAuthStore } from "../../context/auth/store";
import ButtonDelete from "../button/ButtonDelete";
import ButtonDownload from "../button/ButtonDownload";
import DateFormat from "../utils/DateFormat";
import docx from "../../assets/document.png"
import excel from "../../assets/excel.png"
import pdf from '../../assets/pdf.png'
import txt from '../../assets/txt.png'
import rar from '../../assets/rar.png'
import image from '../../assets/image.png'
import video from '../../assets/video.png'
// import exe from '../../assets/exe.png'


interface CardProps {
    id: number;
    nameFile: string;
    createdAt: string;
    idPost: number;
    key: number
}

const FileCard: React.FC<CardProps> = ({id, idPost, nameFile, createdAt, key}) => {


  const user = useAuthStore((state) => state.profile)

  const fileExtension = nameFile.split('.').pop()

  let srcFile
    fileExtension === "csv" ? 
  ( srcFile = excel )
  : 
  fileExtension === "txt" ?
  (srcFile = txt)
  :
  fileExtension === "pdf" ?
  ( srcFile = pdf )
  :
  fileExtension === "docx" ? 
  ( srcFile = docx )
  :
  fileExtension === "zip" ? 
  ( srcFile = rar )
  :
  fileExtension === "rar" ? 
  ( srcFile = rar )
  :
  fileExtension === "png" ?
  ( srcFile = image )
  :
  fileExtension === "jpg" ?
  ( srcFile = image )
  :
  fileExtension === "mp4" ?
  ( srcFile = video )
  :
  null

  return (
    <div key={key} className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-[#1d2127] dark:border-neutral-800 dark:shadow-neutral-700/70">
    <div className="py-2 flex-grow ">
      <h3 className="text-lg font-bold text-center text-gray-800 hover:underline underline-offset-1 dark:text-white m-0 h-10">
        {nameFile}
      </h3>
      <div className="p-4">
      <img src={srcFile} alt="fileLayout" className="h-36 m-auto object-cover" />
      </div>
      <div className="mt-3  flex justify-center items-center gap-x-7 text-sm font-semibold rounded-lg border border-transparent text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400">
        <ButtonDownload fileId={id} nameFile={nameFile} />
      </div>
    </div>
    <div className="bg-gray-100 flex justify-between items-center px-3 text-center border-t rounded-b-xl py-1 dark:bg-neutral-800 dark:border-neutral-700">
      <DateFormat item={createdAt} />
      {user.rolUser === "ADMIN" && <ButtonDelete id={idPost} fileId={id} />}
    </div>
  </div>
  )
}

export default FileCard;  