import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Wallet, ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Total Revenue",
    value: "$8,365.00",
    change: "+11.1%",
    trend: "up",
    icon: DollarSign,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "New Orders",
    value: "722",
    change: "+8.2%",
    trend: "up",
    icon: CreditCard,
    color: "from-blue-500 to-purple-500",
  },
  {
    title: "Sessions",
    value: "181",
    change: "-2.1%",
    trend: "down",
    icon: Wallet,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Avg Order Value",
    value: "$1,025.50",
    change: "+5.7%",
    trend: "up",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-500",
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl overflow-hidden relative">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-20`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-slate-400 text-sm">{stat.title}</p>
              </div>

              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5`} />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
