import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Plus, Trophy, Calendar, DollarSign } from "lucide-react";

const Goals = () => {
  const [goals, setGoals] = useState([
    { 
      id: 1, 
      title: "Emergency Fund", 
      description: "Save for 6 months of expenses",
      targetAmount: 15000, 
      currentAmount: 8500, 
      targetDate: "2024-12-31",
      category: "Emergency",
      status: "active",
      priority: "high"
    },
    { 
      id: 2, 
      title: "Vacation to Europe", 
      description: "Summer vacation trip",
      targetAmount: 5000, 
      currentAmount: 2300, 
      targetDate: "2024-06-30",
      category: "Purchase",
      status: "active",
      priority: "medium"
    },
    { 
      id: 3, 
      title: "New Car Down Payment", 
      description: "Save for car down payment",
      targetAmount: 8000, 
      currentAmount: 8000, 
      targetDate: "2024-03-15",
      category: "Purchase",
      status: "completed",
      priority: "high"
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    targetAmount: "",
    targetDate: "",
    category: "",
    priority: "medium"
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const categories = ["Savings", "Investment", "Debt", "Purchase", "Emergency", "Other"];
  const priorities = ["Low", "Medium", "High"];

  const addGoal = () => {
    if (newGoal.title && newGoal.targetAmount && newGoal.targetDate) {
      const goal = {
        id: goals.length + 1,
        title: newGoal.title,
        description: newGoal.description,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: 0,
        targetDate: newGoal.targetDate,
        category: newGoal.category,
        status: "active",
        priority: newGoal.priority.toLowerCase()
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: "", description: "", targetAmount: "", targetDate: "", category: "", priority: "medium" });
      setIsDialogOpen(false);
    }
  };

  const getProgressPercentage = (current: number, target: number) => (current / target) * 100;
  const getDaysRemaining = (targetDate: string) => {
    const target = new Date(targetDate);
    const today = new Date();
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-400";
      case "medium": return "text-yellow-400";
      case "low": return "text-green-400";
      default: return "text-slate-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Financial Goals</h1>
          <p className="text-slate-400">Track and achieve your financial objectives</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-slate-700 hover:bg-slate-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Goal Title</Label>
                <Input
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Emergency Fund"
                />
              </div>
              <div>
                <Label className="text-slate-300">Description</Label>
                <Input
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Save for 6 months expenses"
                />
              </div>
              <div>
                <Label className="text-slate-300">Target Amount</Label>
                <Input
                  type="number"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="10000"
                />
              </div>
              <div>
                <Label className="text-slate-300">Target Date</Label>
                <Input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label className="text-slate-300">Category</Label>
                <Select value={newGoal.category} onValueChange={(value) => setNewGoal({...newGoal, category: value})}>
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
                <Label className="text-slate-300">Priority</Label>
                <Select value={newGoal.priority} onValueChange={(value) => setNewGoal({...newGoal, priority: value})}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {priorities.map(priority => (
                      <SelectItem key={priority} value={priority.toLowerCase()}>{priority}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addGoal} className="w-full bg-slate-600 hover:bg-slate-500">
                Create Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal, index) => {
          const progressPercentage = getProgressPercentage(goal.currentAmount, goal.targetAmount);
          const daysRemaining = getDaysRemaining(goal.targetDate);
          const isCompleted = goal.status === "completed";
          
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`bg-slate-800/50 border-slate-700 ${isCompleted ? 'border-green-500' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <Trophy className={`w-5 h-5 mr-2 ${isCompleted ? 'text-green-400' : 'text-slate-400'}`} />
                      {goal.title}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(goal.priority)}`}>
                      {goal.priority.toUpperCase()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300 text-sm">{goal.description}</p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-white">
                      ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  
                  <Progress 
                    value={isCompleted ? 100 : progressPercentage} 
                    className="w-full h-2"
                  />
                  
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center text-slate-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {isCompleted ? 'Completed!' : `${daysRemaining} days left`}
                    </div>
                    <div className="flex items-center text-white">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {progressPercentage.toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="text-xs text-slate-400">
                    Category: {goal.category} • Status: {goal.status}
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

export default Goals;
