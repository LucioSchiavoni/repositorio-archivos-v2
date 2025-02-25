import clienteAxios from "../config/axios";
import { isAxiosError } from "axios";
import { CreateFolder, EditData, Post } from "../interface/notas";
import { toast } from "react-toastify";
import { NotaFormData } from "../types";



export const createNotasRequest = async (data: NotaFormData): Promise<any> => {
    try {
        const response = await clienteAxios.post("/create", data);
        return response.data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}


export const createFolderRequest = async(data:CreateFolder):Promise<any> => {
    try {
        const res = await clienteAxios.post("/create/folder",data )
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const createFileInFolder = async(formData: FormData) => {
    try {
        const res = await clienteAxios.post("/create/folder/file", formData, {
            headers:{
                "Content-Type": "multipart/form-data",
            }
        })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}


export const downloadFileRequest= async(id:number) => {
    try {
        const res = await clienteAxios.get(`/download/${id}`, {
            responseType: 'blob'
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const editNotasRequest = async(id: string, data: EditData) => {
    try {
        const filterData = Object.fromEntries(
              Object.entries(data).filter(([_key, value]) => value !== "")
        );
        if(Object.keys(filterData).length > 0) {
            const response = await clienteAxios.put(`/updateNota/${id}`, filterData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response.data
        } else {
            toast.info("No hay cambios para realizar");
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export const addPermissions = async(dataJson: any) => {
    try {
        const newAdd = await clienteAxios.post("/collaborators/notas", dataJson)
        return newAdd.data;
    } catch (error) {
        console.log(error)
    }
}


export const getNotasRequest = async (): Promise<Post[]> => {
    try {
        const { data } = await clienteAxios.get("/allNotas");
        return data as Post[];
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching post data");
    }
};

export const getNotasByIdRequest = async(id: string): Promise<Post> => {
    try {
        const {data} = await clienteAxios.get(`/post/${id}`)
        return data;
    } catch (error) {
        console.log(error)
        throw new Error("Error fetching post data")
    }
}

export const getNotasByPermission = async(id: string): Promise<any>=> {
    try {
        const res = await clienteAxios.get(`/notas/collaborators/${id}`)
        return res.data;
    } catch (error) {
        console.log(error)
    }
}


export const createFileRequest = async(formdata:FormData) => {
    try {
        const res = await clienteAxios.post("/createFile", formdata, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
           return res.data
    } catch (error) {
        console.log(error)
    }
}

export const createFileByIdFolderRequest = async(formdata:FormData) => {
    try {
        const res = await clienteAxios.post("/create/folder/file", formdata, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
           return res.data
    } catch (error) {
        console.log(error)
    }
}


export const getFolderById = async(postId: number, folderId:number) => {
    try {
        const res = await clienteAxios.get(`/folder/file/${postId}/${folderId}`)
        return res.data
    } catch (error) {
        console.log(error)
        throw new Error("Error al obtener archivos por id")
    }
}

export const deleteNotaRequest = async(id: string) => {
try {
  
    const res = await clienteAxios.delete(`/deleteNota/${id}`)
    return res.data

} catch (error) {
    console.log(error)
}
}


export const deleteFolderRequest = async(id: number, folderId: number) => {
    try {
     
        const res = await clienteAxios.delete(`/delete/folder/${id}/${folderId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}


export const deleteFileRequest = async(id: number, fileId: number) => {
    try {
        const res = await clienteAxios.delete(`/delete/file/${id}/${fileId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const deletePostRequest = async(id: number) => {
    try {
        const res = await clienteAxios.delete(`/delete/post/${id}`)
        return res.data;
    } catch (error) {
        console.log(error)
    }
}