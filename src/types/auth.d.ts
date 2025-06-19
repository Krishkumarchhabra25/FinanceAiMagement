export interface User {
    _id: string , 
    email: string , 
    password: string ,
    name: string ,
    provider: 'local'  | 'google' | 'github' | 'facebook',
    createdAt: string ,
    updatedAt:string,
    _v:number
}

export interface AuthResponse{
    user:User,
    token:string
}