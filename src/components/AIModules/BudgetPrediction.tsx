import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, AlertTriangle, TrendingUp } from "lucide-react";

const budgetRecommendations = [
  { category: "Food & Dining", current: 3200, recommended: 2800, status: "over" },
  { category: "Transportation", current: 1800, recommended: 2000, status: "good" },
  { category: "Shopping", current: 1500, recommended: 1200, status: "over" },
  { category: "Bills & Utilities", current: 2000, recommended: 2000, status: "perfect" },
  { category: "Entertainment", current: 800, recommended: 1000, status: "good" }
];

export function BudgetPrediction() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-blue-400" />
          AI Budget Prediction & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgetRecommendations.map((item, index) => {
          const percentage = (item.current / item.recommended) * 100;
          const statusColor = item.status === 'over' ? 'text-red-400' : 
                             item.status === 'perfect' ? 'text-green-400' : 'text-yellow-400';
          
          return (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{item.category}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-300 text-sm">
                    ₹{item.current.toLocaleString()} / ₹{item.recommended.toLocaleString()}
                  </span>
                  {item.status === 'over' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                  {item.status === 'perfect' && <Target className="w-4 h-4 text-green-400" />}
                </div>
              </div>
              <Progress value={Math.min(percentage, 100)} className="h-2" />
              <div className="flex justify-between text-xs">
                <span className={statusColor}>
                  {item.status === 'over' ? 'Over Budget' : 
                   item.status === 'perfect' ? 'Perfect!' : 'Within Budget'}
                </span>
                <span className="text-slate-400">{percentage.toFixed(0)}%</span>
              </div>
            </motion.div>
          );
        })}
        
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-white font-semibold">AI Recommendation</span>
          </div>
          <p className="text-slate-300 text-sm">
            Reduce Food & Dining expenses by ₹400 and Shopping by ₹300 monthly. 
            This will help you save ₹700 extra towards your goal: "Emergency Fund".
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
