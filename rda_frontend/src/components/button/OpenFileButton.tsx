import { Button } from "@chakra-ui/react"
import { Download, Eye } from "lucide-react"

interface OpenFileButtonProps {
  url: string
  nameFile: string
}

const OpenFileButton = ({ url, nameFile }: OpenFileButtonProps) => {
  const handleOpenFile = () => {
    window.open(url, "_blank")
  }

  return (
    <Button
      onClick={handleOpenFile}
      size="sm"
      variant="ghost"
      className="w-full mt-2 flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
    >
     
      {nameFile.toLowerCase().endsWith(".pdf") ? <Eye className="h-4 w-4" /> : <Download className="h-4 w-4" />}
      {nameFile.toLowerCase().endsWith(".pdf") ? "Ver" : "Descargar"}
    </Button>
  )
}

export default OpenFileButton

