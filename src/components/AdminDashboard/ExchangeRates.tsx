import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const exchangeRates = [
  { country: "USA", flag: "🇺🇸", rate: "0.835230", change: "+1.10%" },
  { country: "Spain", flag: "🇪🇸", rate: "0.896532", change: "+0.91%" },
  { country: "France", flag: "🇫🇷", rate: "0.875433", change: "-0.11%" },
  { country: "Germany", flag: "🇩🇪", rate: "0.795621", change: "+0.85%" },
];

export function ExchangeRates() {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white">Exchange Rate</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {exchangeRates.map((rate, index) => (
          <motion.div
            key={rate.country}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{rate.flag}</span>
              <span className="text-white font-medium">{rate.country}</span>
            </div>
            
            <div className="text-right">
              <p className="text-white font-bold">{rate.rate}</p>
              <div className={`flex items-center space-x-1 text-sm ${
                rate.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {rate.change.startsWith('+') ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{rate.change}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
