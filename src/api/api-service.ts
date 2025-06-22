

import axiosConfig from "@/axios_config/axios_instance";
import type { WalletData, WalletRequest, WalletResponse } from "@/types/wallet";

export const createWalletAccount = async(walletData:WalletRequest): Promise<WalletResponse> => {
  const response = await axiosConfig.post<WalletResponse>(
    `/wallet/createWallet-account`,
    walletData
  );
  return response.data;
};

export const updateWalletAccount = async(id:string , walletData:WalletRequest): Promise<WalletResponse> =>{
  const response = await axiosConfig.put<WalletResponse>(
    `/wallet/editWallet-account/${id}`,
    walletData
  );

 return response.data
}

export const getAllAcounts = async (): Promise<WalletData[]> => {
  const response = await axiosConfig.get(`/wallet/getAllWallet-account`);
  return response.data.data; // This is actually WalletData[]
};


export const getWalletDetails = async (id: string): Promise<WalletData> => {
  const response = await axiosConfig.get(`/wallet/detailsWallet-account/${id}`);
  return response.data.data;
};

export const deleteWalletAccount = async (id: string): Promise<{ message: string }> => {
  const response = await axiosConfig.delete(`/wallet/deleteWallet-account/${id}`);
  return response.data; // { success, status, message }
};