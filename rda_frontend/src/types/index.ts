
import {z} from 'zod'



export const notaSchema = z.object({
    title: z.string(),
    content: z.string(),
    state: z.string(),
    authorId: z.string()
}); 

export const folderSchema = z.object({
    nameFolder: z.string(),
    postId: z.number()
}); 

export const getNotaSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    state:z.string(),
    authorId: z.string(),
    folder: z.object({
    id: z.number(),
    nameFolder: z.string(),
    file: z.object({
        url: z.string()
        }),        
            }),
         
            
        
    
});

export type Nota = z.infer<typeof notaSchema>;
export type Folder = z.infer<typeof folderSchema>;

export type GetNota = z.infer<typeof getNotaSchema>;
export type NotaFormData = Omit<Nota, 'id'>;


