import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, DollarSign, Target, Lightbulb } from "lucide-react";

const recommendations = [
  {
    type: "FD",
    title: "Fixed Deposit",
    amount: 50000,
    returns: "6.5% p.a.",
    duration: "12 months",
    risk: "Low",
    description: "Safe investment with guaranteed returns"
  },
  {
    type: "SIP",
    title: "Mutual Fund SIP",
    amount: 5000,
    returns: "12-15% p.a.",
    duration: "Monthly",
    risk: "Medium",
    description: "Systematic investment for long-term wealth"
  },
  {
    type: "PPF",
    title: "Public Provident Fund",
    amount: 150000,
    returns: "7.1% p.a.",
    duration: "15 years",
    risk: "Low",
    description: "Tax-free returns with 15-year lock-in"
  }
];

export function InvestmentRecommendations() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-green-400" />
          AI Investment Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
          <div className="flex items-center mb-2">
            <Lightbulb className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-white font-semibold">Smart Savings Analysis</span>
          </div>
          <p className="text-slate-300 text-sm mb-2">
            Based on your spending patterns, you can save ₹8,000 monthly
          </p>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-400">₹45,000</p>
              <p className="text-slate-400 text-xs">Idle Balance</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">₹8,000</p>
              <p className="text-slate-400 text-xs">Monthly Savings</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-semibold">Recommended Investments</h4>
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h5 className="text-white font-medium">{rec.title}</h5>
                  <p className="text-slate-300 text-sm">{rec.description}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  rec.risk === 'Low' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'
                }`}>
                  {rec.risk} Risk
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div>
                  <p className="text-slate-400 text-xs">Amount</p>
                  <p className="text-white font-semibold">₹{rec.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Returns</p>
                  <p className="text-green-400 font-semibold">{rec.returns}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Duration</p>
                  <p className="text-white font-semibold">{rec.duration}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
