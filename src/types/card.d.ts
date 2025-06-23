export interface CreditCardRequest {
  accountId: string;
  name: string;
  type: string;
  holderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  creditLimit: number;
  currentBalance: number;
  interestRate: number;
  isActive: boolean;
}

export interface CreditCardData {
  userId: string;
  accountId: string;
  name: string;
  type: string;
  holderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  creditLimit: number;
  currentBalance: number;
  interestRate: number;
  isActive: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreditCardResponse {
  message: string;
  data: CreditCardData[];
}

export interface CreditCardByIdResponse {
  message: string;
  data: CreditCardData; // single object, NOT array
}