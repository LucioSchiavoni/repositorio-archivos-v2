import Layout from "../Layout"
import { getAllFilesRequest } from "../api/notas"
import { Spinner } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import OpenFileButton from "../components/button/OpenFileButton"


import pdfIcon from "../assets/pdf.png"
import csvIcon from "../assets/excel.png"
import docxIcon from "../assets/document.png"
import txtIcon from "../assets/txt.png"
import exeIcon from "../assets/exe.png"
import rarIcon from "../assets/rar.png"

interface File {
  nameFile: string
  url: string
  id: string
}

const FilesPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const { data, isLoading, isError } = useQuery({
    queryKey: ["files"],
    queryFn: getAllFilesRequest,
  })

  
  const getFileExtension = (filename: string): string => {
    return filename.split(".").pop()?.toLowerCase() || ""
  }


  const getFileIcon = (filename: string) => {
    const extension = getFileExtension(filename)

    switch (extension) {
      case "pdf":
        return pdfIcon
      case "csv":
        return csvIcon
      case "docx":
        return docxIcon
      case "txt":
        return txtIcon
      case "exe":
        return exeIcon
      case "rar":
        return rarIcon
      default:
        return null
    }
  }

  const truncateFilename = (filename: string, maxLength = 20): string => {
    if (filename.length <= maxLength) return filename

    const extension = getFileExtension(filename)
    const nameWithoutExtension = filename.substring(0, filename.lastIndexOf("."))

    if (nameWithoutExtension.length <= maxLength - 3 - extension.length) {
      return filename
    }

    return `${nameWithoutExtension.substring(0, maxLength - 3 - extension.length)}...${extension ? `.${extension}` : ""}`
  }

  if (isLoading)
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <Spinner size="xl" />
        </div>
      </Layout>
    )

  if (isError)
    return (
      <Layout>
        <div className="flex justify-center items-center h-64 text-red-500">
          Error loading files. Please try again later.
        </div>
      </Layout>
    )

  return (
    <Layout>
      <div className="p-6 flex ml-24 flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-white">Ultimos archivos</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
   
 
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {data.map((file: File, index: number) => (
              <div
                key={index}
                className="bg-white dark:bg-transparent dark:border-zinc-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 flex flex-col"
              >
                <div className="h-32 flex items-center dark:bg-zinc-800 justify-center p-4 bg-gray-50">
                  <img
                    src={getFileIcon(file.nameFile) || "/placeholder.svg"}
                    alt={`${getFileExtension(file.nameFile)} file`}
                    className="h-16 w-16 object-contain"
                  />
                </div>
                <div className="p-3 flex flex-col">
                  <p className="text-sm font-medium text-gray-700 dark:text-white truncate" title={file.nameFile}>
                    {truncateFilename(file.nameFile)}
                  </p>
                  <OpenFileButton url={file.url} nameFile={file.nameFile} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
              <thead className="bg-gray-50 dark:bg-zinc-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-800 divide-y divide-gray-200 dark:divide-zinc-700">
                {data.map((file: File, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-zinc-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                          <img
                            src={getFileIcon(file.nameFile) || "/placeholder.svg"}
                            alt={`${getFileExtension(file.nameFile)} file`}
                            className="h-8 w-8"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white" title={file.nameFile}>
                            {truncateFilename(file.nameFile, 30)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 uppercase">
                      {getFileExtension(file.nameFile) || "Unknown"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <OpenFileButton url={file.url} nameFile={file.nameFile} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
     

        {data.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4 text-gray-300 dark:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
            <p className="text-lg">No files found</p>
            <p className="text-sm">Upload files to see them here</p>
          </div>
        )}
      </div>
    </Layout>

  )
}

export default FilesPage

