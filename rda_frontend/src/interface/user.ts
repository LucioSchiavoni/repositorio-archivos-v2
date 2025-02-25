export interface createUser {
    username: string;
    name: string;
    password: string;
    rol: RolUser;
}


export type RolUser = 'ADMIN' | 'USER';
export type State = 'PUBLICO' | 'PRIVADO';