import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, Banknote } from "lucide-react";

const Wallet = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Main Checking", type: "Checking", balance: 5420.50, bank: "Chase Bank" },
    { id: 2, name: "Savings Account", type: "Savings", balance: 12340.75, bank: "Bank of America" },
    { id: 3, name: "Emergency Fund", type: "Savings", balance: 8900.00, bank: "Wells Fargo" },
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, type: "transfer", amount: 500, description: "Transfer to Savings", date: "2024-01-15", account: "Main Checking" },
    { id: 2, type: "deposit", amount: 2500, description: "Salary Deposit", date: "2024-01-15", account: "Main Checking" },
    { id: 3, type: "withdrawal", amount: 120, description: "ATM Withdrawal", date: "2024-01-14", account: "Main Checking" },
  ]);

  const [newAccount, setNewAccount] = useState({ name: "", type: "", bank: "", balance: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addAccount = () => {
    if (newAccount.name && newAccount.type && newAccount.bank) {
      const account = {
        id: accounts.length + 1,
        name: newAccount.name,
        type: newAccount.type,
        balance: parseFloat(newAccount.balance) || 0,
        bank: newAccount.bank
      };
      setAccounts([...accounts, account]);
      setNewAccount({ name: "", type: "", bank: "", balance: "" });
      setIsDialogOpen(false);
    }
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Digital Wallet</h1>
          <p className="text-slate-400">Manage your bank accounts and balances</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-slate-700 hover:bg-slate-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Bank Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Account Name</Label>
                <Input
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="My Checking Account"
                />
              </div>
              <div>
                <Label className="text-slate-300">Account Type</Label>
                <Input
                  value={newAccount.type}
                  onChange={(e) => setNewAccount({...newAccount, type: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Checking, Savings, etc."
                />
              </div>
              <div>
                <Label className="text-slate-300">Bank Name</Label>
                <Input
                  value={newAccount.bank}
                  onChange={(e) => setNewAccount({...newAccount, bank: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Chase Bank"
                />
              </div>
              <div>
                <Label className="text-slate-300">Initial Balance</Label>
                <Input
                  type="number"
                  value={newAccount.balance}
                  onChange={(e) => setNewAccount({...newAccount, balance: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="0.00"
                />
              </div>
              <Button onClick={addAccount} className="w-full bg-slate-600 hover:bg-slate-500">
                Add Account
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Total Balance */}
      <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm">Total Balance</p>
              <p className="text-3xl font-bold text-white">${totalBalance.toFixed(2)}</p>
            </div>
            <WalletIcon className="w-12 h-12 text-slate-400" />
          </div>
        </CardContent>
      </Card>

      {/* Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account, index) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Banknote className="w-5 h-5 mr-2" />
                  {account.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-slate-400 text-sm">Type</p>
                  <p className="text-white">{account.type}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Bank</p>
                  <p className="text-white">{account.bank}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Balance</p>
                  <p className="text-2xl font-bold text-white">${account.balance.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Wallet Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-slate-600">
                    {transaction.type === 'deposit' ? 
                      <ArrowDownLeft className="w-5 h-5 text-green-400" /> : 
                      <ArrowUpRight className="w-5 h-5 text-slate-400" />
                    }
                  </div>
                  <div>
                    <p className="text-white font-medium">{transaction.description}</p>
                    <p className="text-slate-400 text-sm">{transaction.account}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">${transaction.amount.toFixed(2)}</p>
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

export default Wallet;

