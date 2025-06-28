import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, CreditCard, TrendingUp, AlertCircle } from "lucide-react";

const scoreFactors = [
  { factor: "Payment History", impact: 85, weight: "35%", status: "excellent" },
  { factor: "Credit Utilization", impact: 70, weight: "30%", status: "good" },
  { factor: "Credit Length", impact: 60, weight: "15%", status: "average" },
  { factor: "Credit Mix", impact: 75, weight: "10%", status: "good" },
  { factor: "New Credit", impact: 80, weight: "10%", status: "good" }
];

export function CreditScorePrediction() {
  const predictedScore = 742;
  const scoreColor = predictedScore >= 750 ? "text-green-400" : 
                    predictedScore >= 700 ? "text-yellow-400" : "text-red-400";
  
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-400" />
          AI Credit Score Prediction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center p-6 bg-slate-700/30 rounded-lg">
          <div className="flex items-center justify-center mb-4">
            <CreditCard className="w-8 h-8 text-purple-400 mr-2" />
            <span className="text-white text-lg">Predicted Credit Score</span>
          </div>
          <div className={`text-6xl font-bold ${scoreColor} mb-2`}>
            {predictedScore}
          </div>
          <div className="text-slate-400 text-sm">out of 900</div>
          <div className="mt-4">
            <Progress value={(predictedScore / 900) * 100} className="h-3" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-semibold">Score Factors Analysis</h4>
          {scoreFactors.map((factor, index) => (
            <motion.div
              key={factor.factor}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{factor.factor}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 text-sm">({factor.weight})</span>
                  <span className={`text-sm ${
                    factor.status === 'excellent' ? 'text-green-400' :
                    factor.status === 'good' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {factor.status}
                  </span>
                </div>
              </div>
              <Progress value={factor.impact} className="h-2" />
              <div className="text-slate-400 text-xs">{factor.impact}/100</div>
            </motion.div>
          ))}
        </div>

        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-white font-semibold">Improvement Tips</span>
          </div>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>• Reduce credit utilization below 30% to improve score</li>
            <li>• Continue making on-time payments</li>
            <li>• Avoid applying for new credit cards</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
