import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  bank: string;
}

export interface Card {
  id: string;
  name: string;
  number: string;
  type: string;
  balance: number;
  limit: number;
  accountId: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  merchant: string;
  cardId?: string;
  accountId?: string;
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  status: 'pending' | 'paid' | 'overdue';
  autopay: boolean;
  cardId?: string;
}

export interface Loan {
  id: string;
  name: string;
  principal: number;
  outstanding: number;
  monthlyEMI: number;
  interestRate: number;
  tenure: number;
  remainingMonths: number;
  type: string;
  status: string;
  cardId?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  status: string;
  priority: string;
  accountId?: string;
}

interface FinanceContextType {
  accounts: Account[];
  cards: Card[];
  transactions: Transaction[];
  bills: Bill[];
  loans: Loan[];
  goals: Goal[];
  addAccount: (account: Omit<Account, 'id'>) => void;
  updateAccount: (id: string, account: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  addCard: (card: Omit<Card, 'id'>) => void;
  updateCard: (id: string, card: Partial<Card>) => void;
  deleteCard: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addBill: (bill: Omit<Bill, 'id'>) => void;
  updateBill: (id: string, bill: Partial<Bill>) => void;
  deleteBill: (id: string) => void;
  addLoan: (loan: Omit<Loan, 'id'>) => void;
  updateLoan: (id: string, loan: Partial<Loan>) => void;
  deleteLoan: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  getBestCardForPayment: (amount: number) => Card | null;
  processPayment: (amount: number, cardId?: string) => boolean;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', name: 'Main Checking', type: 'Checking', balance: 5420.50, bank: 'Chase Bank' },
    { id: '2', name: 'Savings Account', type: 'Savings', balance: 12340.75, bank: 'Bank of America' },
    { id: '3', name: 'Emergency Fund', type: 'Savings', balance: 8900.00, bank: 'Wells Fargo' },
  ]);

  const [cards, setCards] = useState<Card[]>([
    { id: '1', name: 'Main Credit Card', number: '**** **** **** 4521', type: 'Visa', balance: 2580.50, limit: 5000, accountId: '1' },
    { id: '2', name: 'Business Card', number: '**** **** **** 7834', type: 'Mastercard', balance: 1200.25, limit: 10000, accountId: '2' },
    { id: '3', name: 'Travel Card', number: '**** **** **** 9012', type: 'American Express', balance: 850.75, limit: 3000, accountId: '3' },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'expense', amount: 89.99, description: 'Grocery Shopping', category: 'Food', date: '2024-01-15', merchant: 'Walmart', cardId: '1' },
    { id: '2', type: 'income', amount: 2500.00, description: 'Salary', category: 'Income', date: '2024-01-15', merchant: 'Company Inc', accountId: '1' },
    { id: '3', type: 'expense', amount: 45.50, description: 'Gas Station', category: 'Transport', date: '2024-01-14', merchant: 'Shell', cardId: '2' },
  ]);

  const [bills, setBills] = useState<Bill[]>([
    { id: '1', name: 'Electricity Bill', amount: 2500, dueDate: '2024-01-25', category: 'Utility', status: 'pending', autopay: true, cardId: '1' },
    { id: '2', name: 'Internet Bill', amount: 1200, dueDate: '2024-01-20', category: 'Utility', status: 'paid', autopay: true, cardId: '2' },
  ]);

  const [loans, setLoans] = useState<Loan[]>([
    { id: '1', name: 'Home Loan', principal: 2500000, outstanding: 1850000, monthlyEMI: 35000, interestRate: 8.5, tenure: 240, remainingMonths: 168, type: 'home', status: 'active', cardId: '1' },
    { id: '2', name: 'Car Loan', principal: 800000, outstanding: 450000, monthlyEMI: 18000, interestRate: 9.2, tenure: 60, remainingMonths: 28, type: 'vehicle', status: 'active', cardId: '2' },
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', title: 'Emergency Fund', description: 'Save for 6 months of expenses', targetAmount: 15000, currentAmount: 8500, targetDate: '2024-12-31', category: 'Emergency', status: 'active', priority: 'high', accountId: '3' },
    { id: '2', title: 'Vacation to Europe', description: 'Summer vacation trip', targetAmount: 5000, currentAmount: 2300, targetDate: '2024-06-30', category: 'Purchase', status: 'active', priority: 'medium', accountId: '2' },
  ]);

  const getBestCardForPayment = (amount: number): Card | null => {
    const availableCards = cards.filter(card => card.limit - card.balance >= amount);
    if (availableCards.length === 0) return null;
    
    return availableCards.reduce((best, current) => {
      const bestUtilization = best.balance / best.limit;
      const currentUtilization = current.balance / current.limit;
      return currentUtilization < bestUtilization ? current : best;
    });
  };

  const processPayment = (amount: number, cardId?: string): boolean => {
    let targetCard: Card | null = null;
    
    if (cardId) {
      targetCard = cards.find(card => card.id === cardId) || null;
    } else {
      targetCard = getBestCardForPayment(amount);
    }
    
    if (!targetCard || targetCard.limit - targetCard.balance < amount) {
      return false;
    }
    
    setCards(prev => prev.map(card => 
      card.id === targetCard!.id 
        ? { ...card, balance: card.balance + amount }
        : card
    ));
    
    return true;
  };

  // CRUD operations
  const addAccount = (account: Omit<Account, 'id'>) => {
    const newAccount = { ...account, id: Date.now().toString() };
    setAccounts(prev => [...prev, newAccount]);
  };

  const updateAccount = (id: string, account: Partial<Account>) => {
    setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, ...account } : acc));
  };

  const deleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(acc => acc.id !== id));
  };

  const addCard = (card: Omit<Card, 'id'>) => {
    const newCard = { ...card, id: Date.now().toString() };
    setCards(prev => [...prev, newCard]);
  };

  const updateCard = (id: string, card: Partial<Card>) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, ...card } : c));
  };

  const deleteCard = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: Date.now().toString() };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, transaction: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...transaction } : t));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addBill = (bill: Omit<Bill, 'id'>) => {
    const newBill = { ...bill, id: Date.now().toString() };
    setBills(prev => [...prev, newBill]);
  };

  const updateBill = (id: string, bill: Partial<Bill>) => {
    setBills(prev => prev.map(b => b.id === id ? { ...b, ...bill } : b));
  };

  const deleteBill = (id: string) => {
    setBills(prev => prev.filter(b => b.id !== id));
  };

  const addLoan = (loan: Omit<Loan, 'id'>) => {
    const newLoan = { ...loan, id: Date.now().toString() };
    setLoans(prev => [...prev, newLoan]);
  };

  const updateLoan = (id: string, loan: Partial<Loan>) => {
    setLoans(prev => prev.map(l => l.id === id ? { ...l, ...loan } : l));
  };

  const deleteLoan = (id: string) => {
    setLoans(prev => prev.filter(l => l.id !== id));
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal = { ...goal, id: Date.now().toString() };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id: string, goal: Partial<Goal>) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...goal } : g));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  return (
    <FinanceContext.Provider value={{
      accounts, cards, transactions, bills, loans, goals,
      addAccount, updateAccount, deleteAccount,
      addCard, updateCard, deleteCard,
      addTransaction, updateTransaction, deleteTransaction,
      addBill, updateBill, deleteBill,
      addLoan, updateLoan, deleteLoan,
      addGoal, updateGoal, deleteGoal,
      getBestCardForPayment, processPayment
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
