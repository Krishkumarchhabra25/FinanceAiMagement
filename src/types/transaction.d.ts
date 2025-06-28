import type { CreditCardData } from "./card";

// 🟩 Request body when creating a transaction
export interface TransactionRequest {
  cardId: string;
  type: 'transfer' | 'deposit' | 'withdrawal' | 'payment' | 'refund' | 'fee';
  category:
    | 'food'
    | 'transport'
    | 'shopping'
    | 'bills'
    | 'entertainment'
    | 'healthcare'
    | 'salary'
    | 'investment'
    | 'other';
  description: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  merchant?: string;
}

// 🟦 Returned structure of a transaction
export interface TransactionData {
  _id: string;
  userId: string;
  cardId: string | CreditCardData; // populated if fetched individually
  type: TransactionRequest["type"];
  category: TransactionRequest["category"];
  description: string;
  amount: number;
  status: TransactionRequest["status"];
  merchant?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ✅ Create or update response
export interface TransactionResponse {
  message: string;
  data: TransactionData;
}

// 📚 All transactions
export interface TransactionListResponse {
  message: string;
  data: TransactionData[];
}

// ❌ Deletion response
export interface TransactionDeleteResponse {
  message: string;
}
