export interface WalletRequest {
  name: string;
  type: string;
  balances: number;
  account_number: string;
  routing_number: string;
  isActive: boolean;
  currency: string;
}

export interface WalletData {
  userId: string;
  name: string;
  type: string;
  balances: number;
  account_number: string;
  routing_number: string;
  isActive: boolean;
  currency: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface WalletResponse {
  message: string;
  data: WalletData;
}
