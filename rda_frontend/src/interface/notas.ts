export interface createPost {
    title:string;
    content: string;
    authorId: number;
}

export type User = {
    id: number;
    post: Post[]
    username: string;
    name: string;
    password: string;
    rolUser: string;
    createdAt: string;
}

export type Post = {
    id: number
    title?: string
    content?: string
    authorId: number
    author: User
    createdAt: string
    updatedAt: string
    state: string
    folder?: Folder[]
    file?: File[]
};

export type Folder = {
    id: number;
    nameFolder: string;
    file?: File[];
    createdAt: string;
    postId: number;
}

export type File = {
    id: number
    postId: number
    folderId: number
    nameFile: string
    createdAt: string
    url: string
};


export type EditData = {
    [key: string]: any;
    content?:string;
    title?: string;
}


export type CreateFolder = {
    nameFolder: string;
    postId: number;
}

export type CreateDocument = {
    description?: string,
    title?: string,
    authorId: string;
}