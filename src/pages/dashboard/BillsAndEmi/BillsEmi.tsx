import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, AlertTriangle, CheckCircle, Clock, Edit, Trash2, Eye } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
;

const BillsEmi = () => {
  const { bills, cards, addBill, updateBill, deleteBill } = useFinance();
  const [newBill, setNewBill] = useState({
    name: "",
    amount: "",
    dueDate: "",
    category: "",
    autopay: false,
    cardId: ""
  });
  const [editingBill, setEditingBill] = useState(null);
  const [viewingBill, setViewingBill] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const addNewBill = () => {
    if (newBill.name && newBill.amount && newBill.dueDate) {
      addBill({
        name: newBill.name,
        amount: parseFloat(newBill.amount),
        dueDate: newBill.dueDate,
        category: newBill.category,
        status: "pending",
        autopay: newBill.autopay,
        cardId: newBill.cardId || undefined
      });
      setNewBill({ name: "", amount: "", dueDate: "", category: "", autopay: false, cardId: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleEdit = (bill) => {
    setEditingBill({
      ...bill,
      amount: bill.amount.toString(),
      cardId: bill.cardId || ""
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (editingBill) {
      updateBill(editingBill.id, {
        name: editingBill.name,
        amount: parseFloat(editingBill.amount),
        dueDate: editingBill.dueDate,
        category: editingBill.category,
        autopay: editingBill.autopay,
        cardId: editingBill.cardId || undefined
      });
      setEditingBill(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleView = (bill) => {
    setViewingBill(bill);
    setIsViewDialogOpen(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'overdue': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default: return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getCardName = (cardId) => {
    const card = cards.find(c => c.id === cardId);
    return card ? card.name : "No card selected";
  };

  const totalPending = bills.filter(b => b.status === 'pending').reduce((sum, b) => sum + b.amount, 0);
  const totalOverdue = bills.filter(b => b.status === 'overdue').reduce((sum, b) => sum + b.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Bills & EMI</h1>
          <p className="text-slate-400">Manage your bills and EMI payments</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-slate-700 hover:bg-slate-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Bill
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Bill</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Bill Name</Label>
                <Input
                  value={newBill.name}
                  onChange={(e) => setNewBill({...newBill, name: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Electricity Bill"
                />
              </div>
              <div>
                <Label className="text-slate-300">Amount</Label>
                <Input
                  type="number"
                  value={newBill.amount}
                  onChange={(e) => setNewBill({...newBill, amount: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="2500"
                />
              </div>
              <div>
                <Label className="text-slate-300">Due Date</Label>
                <Input
                  type="date"
                  value={newBill.dueDate}
                  onChange={(e) => setNewBill({...newBill, dueDate: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label className="text-slate-300">Category</Label>
                <Select value={newBill.category} onValueChange={(value) => setNewBill({...newBill, category: value})}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="utility">Utility</SelectItem>
                    <SelectItem value="emi">EMI</SelectItem>
                    <SelectItem value="subscription">Subscription</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-300">Payment Card</Label>
                <Select value={newBill.cardId} onValueChange={(value) => setNewBill({...newBill, cardId: value})}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select card" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {cards.map(card => (
                      <SelectItem key={card.id} value={card.id}>{card.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addNewBill} className="w-full bg-slate-600 hover:bg-slate-500">
                Add Bill
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Pending</p>
                <p className="text-2xl font-bold text-yellow-400">₹{totalPending.toLocaleString()}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Overdue</p>
                <p className="text-2xl font-bold text-red-400">₹{totalOverdue.toLocaleString()}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">This Month</p>
                <p className="text-2xl font-bold text-white">₹{bills.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}</p>
              </div>
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bills List */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Upcoming Bills & EMIs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bills.map((bill, index) => (
              <motion.div
                key={bill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(bill.status)}
                  <div>
                    <p className="text-white font-medium">{bill.name}</p>
                    <p className="text-slate-400 text-sm">
                      {bill.category} • Due: {bill.dueDate}
                      {bill.autopay && <span className="ml-2 text-green-400">• Auto-pay</span>}
                    </p>
                    <p className="text-slate-500 text-xs">Card: {getCardName(bill.cardId)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right mr-4">
                    <p className="text-white font-bold">₹{bill.amount.toLocaleString()}</p>
                    <p className={`text-sm ${
                      bill.status === 'paid' ? 'text-green-400' :
                      bill.status === 'pending' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {bill.status.toUpperCase()}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleView(bill)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(bill)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-slate-800 border-slate-700">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Delete Bill</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-400">
                          Are you sure you want to delete "{bill.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-slate-600 text-white hover:bg-slate-500">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteBill(bill.id)} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Bill</DialogTitle>
          </DialogHeader>
          {editingBill && (
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Bill Name</Label>
                <Input
                  value={editingBill.name}
                  onChange={(e) => setEditingBill({...editingBill, name: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label className="text-slate-300">Amount</Label>
                <Input
                  type="number"
                  value={editingBill.amount}
                  onChange={(e) => setEditingBill({...editingBill, amount: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label className="text-slate-300">Due Date</Label>
                <Input
                  type="date"
                  value={editingBill.dueDate}
                  onChange={(e) => setEditingBill({...editingBill, dueDate: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label className="text-slate-300">Category</Label>
                <Select value={editingBill.category} onValueChange={(value) => setEditingBill({...editingBill, category: value})}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="utility">Utility</SelectItem>
                    <SelectItem value="emi">EMI</SelectItem>
                    <SelectItem value="subscription">Subscription</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-300">Payment Card</Label>
                <Select value={editingBill.cardId} onValueChange={(value) => setEditingBill({...editingBill, cardId: value})}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {cards.map(card => (
                      <SelectItem key={card.id} value={card.id}>{card.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleUpdate} className="w-full bg-slate-600 hover:bg-slate-500">
                Update Bill
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Bill Details</DialogTitle>
          </DialogHeader>
          {viewingBill && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-400">Name</Label>
                  <p className="text-white">{viewingBill.name}</p>
                </div>
                <div>
                  <Label className="text-slate-400">Amount</Label>
                  <p className="text-white">₹{viewingBill.amount.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-slate-400">Due Date</Label>
                  <p className="text-white">{viewingBill.dueDate}</p>
                </div>
                <div>
                  <Label className="text-slate-400">Category</Label>
                  <p className="text-white">{viewingBill.category}</p>
                </div>
                <div>
                  <Label className="text-slate-400">Status</Label>
                  <p className={`${
                    viewingBill.status === 'paid' ? 'text-green-400' :
                    viewingBill.status === 'pending' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>{viewingBill.status.toUpperCase()}</p>
                </div>
                <div>
                  <Label className="text-slate-400">Auto-pay</Label>
                  <p className="text-white">{viewingBill.autopay ? 'Yes' : 'No'}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-slate-400">Payment Card</Label>
                  <p className="text-white">{getCardName(viewingBill.cardId)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default BillsEmi;
