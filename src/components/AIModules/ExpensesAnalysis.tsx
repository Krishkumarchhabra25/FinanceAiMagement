import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Brain, TrendingUp } from "lucide-react";

const categoryData = [
  { name: "Food & Dining", value: 3200, color: "#8B5CF6", percentage: 32 },
  { name: "Transportation", value: 1800, color: "#06B6D4", percentage: 18 },
  { name: "Shopping", value: 1500, color: "#84CC16", percentage: 15 },
  { name: "Bills & Utilities", value: 2000, color: "#F59E0B", percentage: 20 },
  { name: "Entertainment", value: 800, color: "#EF4444", percentage: 8 },
  { name: "Healthcare", value: 700, color: "#10B981", percentage: 7 }
];

const monthlyTrends = [
  { month: "Jan", amount: 8500 },
  { month: "Feb", amount: 9200 },
  { month: "Mar", amount: 8800 },
  { month: "Apr", amount: 10500 },
  { month: "May", amount: 9800 },
  { month: "Jun", amount: 10000 }
];

export function ExpenseAnalysis() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-400" />
          AI Expense Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-semibold mb-4">Expense Categories</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={(entry) => `${entry.percentage}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Monthly Trends</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Bar dataKey="amount" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-slate-700/30 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-white font-semibold">AI Insights</span>
          </div>
          <p className="text-slate-300 text-sm">
            Your spending on Food & Dining increased by 15% this month. Consider meal planning to reduce costs.
            Transportation expenses are optimal. Healthcare spending is below average - ensure you're not skipping important medical care.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
