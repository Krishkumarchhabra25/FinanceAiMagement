import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, ArrowUpRight, ArrowDownLeft, Filter } from "lucide-react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, type: "expense", amount: 89.99, description: "Grocery Shopping", category: "Food", date: "2024-01-15", merchant: "Walmart" },
    { id: 2, type: "income", amount: 2500.00, description: "Salary", category: "Income", date: "2024-01-15", merchant: "Company Inc" },
    { id: 3, type: "expense", amount: 45.50, description: "Gas Station", category: "Transport", date: "2024-01-14", merchant: "Shell" },
    { id: 4, type: "expense", amount: 12.99, description: "Netflix Subscription", category: "Entertainment", date: "2024-01-14", merchant: "Netflix" },
  ]);
  
  const [newTransaction, setNewTransaction] = useState({
    type: "",
    amount: "",
    description: "",
    category: "",
    merchant: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const addTransaction = () => {
    if (newTransaction.type && newTransaction.amount && newTransaction.description) {
      const transaction = {
        id: transactions.length + 1,
        type: newTransaction.type,
        amount: parseFloat(newTransaction.amount),
        description: newTransaction.description,
        category: newTransaction.category || "Other",
        date: new Date().toISOString().split('T')[0],
        merchant: newTransaction.merchant || "Unknown"
      };
      setTransactions([transaction, ...transactions]);
      setNewTransaction({ type: "", amount: "", description: "", category: "", merchant: "" });
      setIsDialogOpen(false);
    }
  };

  const filteredTransactions = transactions.filter(t => 
    filter === "all" || t.type === filter
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Transactions</h1>
          <p className="text-slate-400">Track all your financial transactions</p>
        </div>
        
        <div className="flex gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-slate-700 hover:bg-slate-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">Add New Transaction</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-slate-300">Type</Label>
                  <Select value={newTransaction.type} onValueChange={(value) => setNewTransaction({...newTransaction, type: value})}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Amount</Label>
                  <Input
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Description</Label>
                  <Input
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Transaction description"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Category</Label>
                  <Input
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Food, Transport, etc."
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Merchant</Label>
                  <Input
                    value={newTransaction.merchant}
                    onChange={(e) => setNewTransaction({...newTransaction, merchant: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Store name"
                  />
                </div>
                <Button onClick={addTransaction} className="w-full bg-slate-600 hover:bg-slate-500">
                  Add Transaction
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    {transaction.type === 'income' ? 
                      <ArrowDownLeft className="w-5 h-5 text-green-400" /> : 
                      <ArrowUpRight className="w-5 h-5 text-red-400" />
                    }
                  </div>
                  <div>
                    <p className="text-white font-medium">{transaction.description}</p>
                    <p className="text-slate-400 text-sm">{transaction.merchant} • {transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-slate-400 text-sm">{transaction.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Transactions;
