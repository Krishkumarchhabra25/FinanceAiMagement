import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";

const Analytics = () => {
  const monthlyData = [
    { month: "Jan", income: 3000, expenses: 2200 },
    { month: "Feb", income: 3200, expenses: 2400 },
    { month: "Mar", income: 3100, expenses: 2100 },
    { month: "Apr", income: 3300, expenses: 2600 },
    { month: "May", income: 3400, expenses: 2300 },
    { month: "Jun", income: 3200, expenses: 2500 },
  ];

  const categoryData = [
    { name: "Food", value: 800, color: "#8B5CF6" },
    { name: "Transport", value: 400, color: "#06B6D4" },
    { name: "Entertainment", value: 300, color: "#84CC16" },
    { name: "Shopping", value: 600, color: "#F59E0B" },
    { name: "Bills", value: 500, color: "#EF4444" },
  ];

  const aiInsights = [
    {
      title: "Spending Pattern Alert",
      description: "Your food expenses increased by 15% this month compared to last month.",
      type: "warning",
      icon: TrendingUp
    },
    {
      title: "Savings Opportunity",
      description: "You could save $200/month by reducing entertainment expenses.",
      type: "info",
      icon: Target
    },
    {
      title: "Income Trend",
      description: "Your income has been consistently growing over the past 3 months.",
      type: "positive",
      icon: TrendingUp
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">AI Analytics</h1>
        <p className="text-slate-400">Intelligent insights into your financial patterns</p>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {aiInsights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg flex items-center">
                  <insight.icon className="w-5 h-5 mr-2" />
                  {insight.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm">{insight.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Bar dataKey="income" fill="#10B981" />
                <Bar dataKey="expenses" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Expense Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={(entry) => entry.name}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Spending Analysis */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">AI Financial Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">$1,200</p>
              <p className="text-slate-400 text-sm">Monthly Savings</p>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <TrendingUp className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">85%</p>
              <p className="text-slate-400 text-sm">Budget Efficiency</p>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <Target className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-slate-400 text-sm">Savings Goals</p>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <TrendingDown className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">-5%</p>
              <p className="text-slate-400 text-sm">Expense Reduction</p>
            </div>
          </div>
          
          <div className="bg-slate-700/20 p-4 rounded-lg">
            <h3 className="text-white font-semibold mb-2">AI Recommendation</h3>
            <p className="text-slate-300">
              Based on your spending patterns, consider setting up automatic transfers to savings 
              when your income exceeds $3,200. This could help you save an additional $300 per month.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Analytics;
