import clienteAxios from "../config/axios";
import axios from 'axios';


export const createDocRequest = async (data: any): Promise<any> => {
    try { 
        const response =  await clienteAxios.post("/create/doc", data)
        return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al crear el documento');
    } else {
      throw new Error('Error al crear el documento');
    }
    }
}


export const getAllDocRequest = async(id: string) => {
    try {
        const res = await clienteAxios.get(`/docs/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}


export const getDocByIdRequest = async(id?: string, authorId?: string) => {
    try {
        const res = await clienteAxios.get(`/docId/${authorId}/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}


export const updateDocRequest = async(data: any): Promise<any>=> {
    try {
        const res =  await clienteAxios.put('/update/doc', data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}


export const deleteDocRequest = async(id:string) => {
    try {
        const res = await clienteAxios.delete(`/docs/${id}`)
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const addCollaborators = async(data: any): Promise<any> => {
    try {
        const res = await clienteAxios.post("/collab", data)
        return res.data;
    } catch (error) {
        console.log(error)
    }
}