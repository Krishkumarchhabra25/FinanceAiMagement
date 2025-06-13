import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const transactions = [
  {
    id: 1,
    date: "20 July 2024 03:25pm",
    type: "Transfer",
    description: "Service Fee",
    amount: "$560",
    status: "Credit",
    icon: ArrowUpRight,
  },
  {
    id: 2,
    date: "15 July 2024 012:35pm",
    type: "Card Payment",
    description: "UI/UX Project",
    amount: "$700",
    status: "Debit",
    icon: ArrowDownLeft,
  },
  {
    id: 3,
    date: "12 July 2024 10:05am",
    type: "Card Payment",
    description: "Freelancer Fee",
    amount: "$980",
    status: "Debit",
    icon: ArrowDownLeft,
  },
  {
    id: 4,
    date: "30 June 2024 11:12pm",
    type: "Transfer",
    description: "Monthly SIP Plan",
    amount: "$250",
    status: "Credit",
    icon: ArrowUpRight,
  },
];

export function TransactionHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">All Transactions</CardTitle>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Calendar className="w-4 h-4 mr-2" />
            This Month
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors group"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    transaction.status === 'Credit' 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    <transaction.icon className="w-4 h-4" />
                  </div>
                  
                  <div>
                    <p className="text-white font-medium">{transaction.description}</p>
                    <p className="text-slate-400 text-sm">{transaction.date}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge 
                    variant="outline" 
                    className={`${
                      transaction.status === 'Credit'
                        ? 'border-emerald-500 text-emerald-400'
                        : 'border-red-500 text-red-400'
                    }`}
                  >
                    {transaction.status}
                  </Badge>
                  
                  <p className="text-white font-bold text-lg">{transaction.amount}</p>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      View
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
