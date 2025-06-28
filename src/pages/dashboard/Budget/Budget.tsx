import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, AlertTriangle } from "lucide-react";

const Budget = () => {
  const [budgets, setBudgets] = useState([
    { id: 1, category: "Food", budgetAmount: 800, spentAmount: 650, month: 1, year: 2024, alertThreshold: 80 },
    { id: 2, category: "Transport", budgetAmount: 400, spentAmount: 380, month: 1, year: 2024, alertThreshold: 80 },
    { id: 3, category: "Entertainment", budgetAmount: 300, spentAmount: 120, month: 1, year: 2024, alertThreshold: 80 },
    { id: 4, category: "Shopping", budgetAmount: 600, spentAmount: 520, month: 1, year: 2024, alertThreshold: 80 },
  ]);

  const [newBudget, setNewBudget] = useState({
    category: "",
    budgetAmount: "",
    alertThreshold: "80"
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Healthcare", "Other"];

  const addBudget = () => {
    if (newBudget.category && newBudget.budgetAmount) {
      const budget = {
        id: budgets.length + 1,
        category: newBudget.category,
        budgetAmount: parseFloat(newBudget.budgetAmount),
        spentAmount: 0,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        alertThreshold: parseInt(newBudget.alertThreshold)
      };
      setBudgets([...budgets, budget]);
      setNewBudget({ category: "", budgetAmount: "", alertThreshold: "80" });
      setIsDialogOpen(false);
    }
  };

  const getSpentPercentage = (spent: number, budget: number) => (spent / budget) * 100;
  const isOverThreshold = (spent: number, budget: number, threshold: number) => 
    (spent / budget) * 100 >= threshold;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Budget Management</h1>
          <p className="text-slate-400">Track and manage your spending budgets</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-slate-700 hover:bg-slate-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Budget</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Category</Label>
                <Select value={newBudget.category} onValueChange={(value) => setNewBudget({...newBudget, category: value})}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-300">Budget Amount</Label>
                <Input
                  type="number"
                  value={newBudget.budgetAmount}
                  onChange={(e) => setNewBudget({...newBudget, budgetAmount: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="500.00"
                />
              </div>
              <div>
                <Label className="text-slate-300">Alert Threshold (%)</Label>
                <Input
                  type="number"
                  value={newBudget.alertThreshold}
                  onChange={(e) => setNewBudget({...newBudget, alertThreshold: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="80"
                />
              </div>
              <Button onClick={addBudget} className="w-full bg-slate-600 hover:bg-slate-500">
                Create Budget
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget, index) => {
          const spentPercentage = getSpentPercentage(budget.spentAmount, budget.budgetAmount);
          const isAlert = isOverThreshold(budget.spentAmount, budget.budgetAmount, budget.alertThreshold);
          
          return (
            <motion.div
              key={budget.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      {budget.category}
                    </div>
                    {isAlert && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Spent</span>
                    <span className="text-white">${budget.spentAmount} / ${budget.budgetAmount}</span>
                  </div>
                  <Progress 
                    value={spentPercentage} 
                    className="w-full h-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Progress</span>
                    <span className={`${isAlert ? 'text-yellow-400' : 'text-green-400'}`}>
                      {spentPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-sm text-slate-400">
                    Remaining: ${(budget.budgetAmount - budget.spentAmount).toFixed(2)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Budget;
