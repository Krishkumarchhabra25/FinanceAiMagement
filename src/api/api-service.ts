

import axiosConfig from "@/axios_config/axios_instance";
import type { CreditCardByIdResponse, CreditCardData, CreditCardRequest, CreditCardResponse } from "@/types/card";
import type { TransactionData, TransactionDeleteResponse, TransactionListResponse, TransactionRequest, TransactionResponse } from "@/types/transaction";
import type { WalletData, WalletRequest, WalletResponse } from "@/types/wallet";

//Wallet Module Api Service
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


//Card Module Service

export const CreateCard = async(cardData:CreditCardRequest):Promise<CreditCardResponse>=>{
  const response = await axiosConfig.post<CreditCardResponse>(`/card/createCard` , cardData);
  return response.data
}

export const updateCard = async(id:string , cardData:CreditCardRequest):Promise<CreditCardResponse>=>{
  const response = await axiosConfig.put(`/card/updateCard/${id}` , cardData);
  return response.data
}
export const getAllCards = async (): Promise<CreditCardData[]> => {
  const response = await axiosConfig.get<CreditCardResponse>("/card/getall-cards");
  return response.data.data; // now 'data' is an array
};

  
export const getCardByAccountId = async(accountId: string): Promise<CreditCardResponse> => {
  const response = await axiosConfig.get<CreditCardResponse>(`/card/getcard-byAccount`, {
    params: { accountId }
  });
  return response.data;
}

export const getCardByCardId = async(id: string): Promise<CreditCardByIdResponse> => {
  const response = await axiosConfig.post<CreditCardByIdResponse>(`/card/getcard-byId/${id}`);
  return response.data; // This returns the WHOLE API response (with message + data)
}


export const deleteCardById = async(id:string):Promise<CreditCardResponse>=>{
  const response = await axiosConfig.delete(`/card/delete-Card/${id}`);
  return response.data
}


//Transaction Module Services

export const createTransaction = async (transactiondata:TransactionRequest):Promise<TransactionResponse> =>{
  const reponse = await axiosConfig.post<TransactionResponse>(`/transaction/createTransaction` , transactiondata);
  return reponse.data;
}

export const updateTransaction = async (id:string , transactiondata:TransactionRequest):Promise<TransactionResponse> => {
  const response = await axiosConfig.put<TransactionResponse>(`/transaction/updateTransaction/${id}` , transactiondata);
  return response.data
}


export const getAllTansactions = async ():Promise<TransactionListResponse> =>{
  const response = await axiosConfig.get<TransactionListResponse>(`/transaction/getAll-transaction`);
  return response.data;
}


export const getTransactionDetailsById = async (id: string): Promise<TransactionResponse> => {
  const response = await axiosConfig.get<TransactionResponse>(`/transaction/getTransactionDetails/${id}`);
  return response.data;
};


export const deleteTransactionById = async (id:string): Promise<TransactionDeleteResponse> =>{
  const response = await axiosConfig.delete<TransactionDeleteResponse>(`/transaction/deleteTransaction/${id}`);
  return response.data
}