import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const cards = [
  {
    type: "MASTER CARD",
    balance: "$98,659.50",
    holder: "Daniel Leonard",
    number: "**** **** **** 1234",
    expiry: "01/32",
    cvv: "301",
    gradient: "from-blue-500 via-blue-600 to-blue-700",
  },
  {
    type: "VISA CARD",
    balance: "$44,125.50",
    holder: "Mary Mallory",
    number: "**** **** **** 1234",
    expiry: "01/35",
    cvv: "650",
    gradient: "from-orange-500 via-orange-600 to-orange-700",
  },
  {
    type: "MASTER CARD",
    balance: "$36,251.50",
    holder: "John Carter",
    number: "**** **** **** 1234",
    expiry: "01/30",
    cvv: "511",
    gradient: "from-slate-800 via-slate-900 to-black",
  },
];

export function CreditCards() {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Cards</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Card
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="min-w-[320px] relative"
            >
              <div className={`h-48 rounded-2xl bg-gradient-to-br ${card.gradient} p-6 text-white relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white transform translate-x-16 -translate-y-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white transform -translate-x-12 translate-y-12" />
                </div>

                {/* Card Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm opacity-80">{card.type}</p>
                      <p className="text-xs opacity-60 mt-1">BALANCE</p>
                      <p className="text-2xl font-bold mt-1">{card.balance}</p>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-6 h-6 rounded-full bg-red-500" />
                      <div className="w-6 h-6 rounded-full bg-yellow-500 -ml-2" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs opacity-60">EXPIRY: {card.expiry}</p>
                        <p className="text-sm mt-1">{card.holder}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs opacity-60">CVV: {card.cvv}</p>
                        <p className="text-sm mt-1">{card.number}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
