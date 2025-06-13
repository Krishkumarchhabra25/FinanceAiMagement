import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, CreditCard, Eye, EyeOff } from "lucide-react";

const Cards = () => {
  const [cards, setCards] = useState([
    { id: 1, name: "Main Credit Card", number: "**** **** **** 4521", type: "Visa", balance: 2580.50, limit: 5000 },
    { id: 2, name: "Business Card", number: "**** **** **** 7834", type: "Mastercard", balance: 1200.25, limit: 10000 },
    { id: 3, name: "Travel Card", number: "**** **** **** 9012", type: "American Express", balance: 850.75, limit: 3000 },
  ]);
  
  const [isVisible, setIsVisible] = useState<{[key: number]: boolean}>({});
  const [newCard, setNewCard] = useState({ name: "", number: "", type: "", limit: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleVisibility = (cardId: number) => {
    setIsVisible(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const addCard = () => {
    if (newCard.name && newCard.number && newCard.type && newCard.limit) {
      const card = {
        id: cards.length + 1,
        name: newCard.name,
        number: "**** **** **** " + newCard.number.slice(-4),
        type: newCard.type,
        balance: 0,
        limit: parseFloat(newCard.limit)
      };
      setCards([...cards, card]);
      setNewCard({ name: "", number: "", type: "", limit: "" });
      setIsDialogOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Credit Cards</h1>
          <p className="text-slate-400">Manage your credit cards and limits</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-slate-700 hover:bg-slate-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Credit Card</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardName" className="text-slate-300">Card Name</Label>
                <Input
                  id="cardName"
                  value={newCard.name}
                  onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="My Credit Card"
                />
              </div>
              <div>
                <Label htmlFor="cardNumber" className="text-slate-300">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={newCard.number}
                  onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="1234567890123456"
                />
              </div>
              <div>
                <Label htmlFor="cardType" className="text-slate-300">Card Type</Label>
                <Input
                  id="cardType"
                  value={newCard.type}
                  onChange={(e) => setNewCard({...newCard, type: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Visa"
                />
              </div>
              <div>
                <Label htmlFor="cardLimit" className="text-slate-300">Credit Limit</Label>
                <Input
                  id="cardLimit"
                  type="number"
                  value={newCard.limit}
                  onChange={(e) => setNewCard({...newCard, limit: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="5000"
                />
              </div>
              <Button onClick={addCard} className="w-full bg-slate-600 hover:bg-slate-500">
                Add Card
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  {card.name}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleVisibility(card.id)}
                  className="text-slate-400 hover:text-white"
                >
                  {isVisible[card.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-slate-400 text-sm">Card Number</p>
                  <p className="text-white font-mono">
                    {isVisible[card.id] ? card.number.replace(/\*/g, "1234").slice(0, -4) + card.number.slice(-4) : card.number}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Type</p>
                  <p className="text-white">{card.type}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Balance</p>
                  <p className="text-white font-bold">${card.balance.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Limit</p>
                  <p className="text-white">${card.limit.toFixed(2)}</p>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-slate-400 h-2 rounded-full" 
                    style={{ width: `${(card.balance / card.limit) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Cards;
