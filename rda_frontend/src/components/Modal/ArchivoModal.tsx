import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import {  useState, useCallback } from 'react';
import { FileUp, Loader2 } from "lucide-react"
import { useForm } from 'react-hook-form';
import { createFileInFolder, createFileRequest } from '../../api/notas';
import { toast } from 'react-toastify';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from '../ui/button';


interface ArchivoProps {
  id: {
    id: string;
  };
    folderId?: string;
}
const SubirArchivo: React.FC<ArchivoProps> = ({id, folderId}) => {


 const {handleSubmit} = useForm()
 const [isOpen, setIsOpen] = useState(false)
 const [file, setFile] = useState<File | null>(null)
 const [isDragging, setIsDragging] = useState(false)

 const queryClient = useQueryClient()

  const mutationFileInFolder = useMutation({
    mutationFn: createFileInFolder,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notas'] })
      toast.success(data.message)
      setFile(null)
      setIsOpen(false)
    }
  })

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }, [])

  const mutationFile = useMutation({
    mutationFn: createFileRequest,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notas'] })
      toast.success(data.message)
      setFile(null)
      setIsOpen(false)
    }
  })

  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }, [])

    const handleForm = useCallback(async () => {
      try {
        const formData = new FormData()
  
        if (file) {
          formData.append("file[url]", file)
        }
  
        if (folderId) {
          formData.append("postId", id.toString())
          formData.append("folderId", folderId)
          mutationFileInFolder.mutate(formData)
        } else {
          formData.append("id", id.id)
          mutationFile.mutate(formData)
        }
      } catch (error) {
        console.error(error)
        toast.error("Error al subir el archivo")
      }
    }, [file, folderId, id, mutationFile, mutationFileInFolder])

    const isLoading = mutationFile.isPending || mutationFileInFolder.isPending

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className=" text-xl w-full gap-2 bg-transparent border-none hover:bg-transparent">
            Subir archivo
            <FileUp className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-white text-2xl">Subir nuevo archivo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleForm)} className="space-y-6">
          <div
            className={`relative flex flex-col items-center justify-center w-full h-64 transition-colors border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 ${
              isDragging ? "border-primary bg-muted/50" : "border-muted-foreground/25"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isLoading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Subiendo archivo...</p>
              </div>
            ) : (
              <>
                <input
                  id="dropzone-file"
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.txt,.xlsx"
                  disabled={isLoading}
                />
                <div className="flex flex-col items-center gap-2">
                  <FileUp className={`h-8 w-8 ${file ? "text-primary" : "text-muted-foreground"}`} />
                  {file ? (
                    <p className="text-sm font-medium">{file.name}</p>
                  ) : (
                    <>
                      <p className="text-xl font-medium text-white">Arrastra y suelta o haz clic para seleccionar</p>
                      <p className="text-md text-muted-foreground text-white">PDF, DOCX, TXT, Excel</p>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={!file || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              "Subir archivo"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
    </>
  )
}


export default SubirArchivo;