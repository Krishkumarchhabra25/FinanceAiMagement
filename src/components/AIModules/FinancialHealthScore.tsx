import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Activity, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const healthMetrics = [
  { metric: "Debt-to-Income Ratio", score: 75, value: "25%", status: "good", target: "<30%" },
  { metric: "Emergency Fund", score: 60, value: "3 months", status: "average", target: "6 months" },
  { metric: "Savings Rate", score: 80, value: "20%", status: "good", target: ">20%" },
  { metric: "Investment Diversity", score: 45, value: "Low", status: "poor", target: "High" },
  { metric: "Credit Utilization", score: 70, value: "35%", status: "average", target: "<30%" }
];

export function FinancialHealthScore() {
  const overallScore = 68;
  const scoreColor = overallScore >= 80 ? "text-green-400" : 
                    overallScore >= 60 ? "text-yellow-400" : "text-red-400";
  
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-indigo-400" />
          AI Financial Health Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center p-6 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-lg border border-indigo-500/30">
          <div className="flex items-center justify-center mb-4">
            <Activity className="w-8 h-8 text-indigo-400 mr-2" />
            <span className="text-white text-lg">Financial Health Score</span>
          </div>
          <div className={`text-6xl font-bold ${scoreColor} mb-2`}>
            {overallScore}
          </div>
          <div className="text-slate-400 text-sm mb-4">out of 100</div>
          <Progress value={overallScore} className="h-3" />
          <div className="mt-4 text-slate-300 text-sm">
            {overallScore >= 80 ? "Excellent financial health!" :
             overallScore >= 60 ? "Good, but room for improvement" :
             "Needs attention - follow recommendations"}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-semibold">Health Breakdown</h4>
          {healthMetrics.map((metric, index) => (
            <motion.div
              key={metric.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-slate-700/30 rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">{metric.metric}</span>
                <div className="flex items-center space-x-2">
                  {metric.status === 'good' ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : metric.status === 'average' ? (
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                  <span className={`text-sm ${
                    metric.status === 'good' ? 'text-green-400' :
                    metric.status === 'average' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {metric.status}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Current: {metric.value}</span>
                <span className="text-slate-400">Target: {metric.target}</span>
              </div>
              
              <Progress value={metric.score} className="h-2" />
              <div className="text-slate-400 text-xs mt-1">{metric.score}/100</div>
            </motion.div>
          ))}
        </div>

        <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-500/30">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-4 h-4 text-indigo-400 mr-2" />
            <span className="text-white font-semibold">Improvement Plan</span>
          </div>
          <p className="text-slate-300 text-sm">
            Your financial health is 68/100. To improve: Build emergency fund to 6 months, 
            diversify investments, and save ₹2,000 more monthly. This could raise your score to 82/100.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
