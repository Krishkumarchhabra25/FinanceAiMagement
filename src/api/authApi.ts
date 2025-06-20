

import type { AuthResponse } from "@/types/auth"
import axiosConfig from "@/axios_config/axios_instance";

interface LoginPayload{
    email:string,
    password:string
}

interface RegisterPayload {
    email:string , 
    password:string , 
    name: string ,
}

export interface OAuthPayload {
    code: string;
}

export const registerUser = async(data:RegisterPayload) : Promise<AuthResponse>=>{
    const response = await axiosConfig.post<AuthResponse>(`/auth/register-user` , data);
    return response.data
}

export const loginUser = async(data:LoginPayload) : Promise<AuthResponse> =>{
    const response = await axiosConfig.post<AuthResponse>(`/auth/login-user` , data);
    return response.data
}

export const googleOauth = async(data:OAuthPayload): Promise<AuthResponse> => {
    const response = await axiosConfig.post<AuthResponse>(`/auth/oauth-google` , data);
    return response.data
}

export const githubauth = async(data:OAuthPayload) : Promise<AuthResponse> => {
    const response = await axiosConfig.post<AuthResponse>(`/auth/oauth-github` , data);
    return response.data
}