import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import moment from "moment";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
;
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { createNewTransaction, deleteTransaction, fetchAllTransactions, fetchTransactionById, updateExistingTransaction } from "@/redux/TransactionSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchAllCards } from "@/redux/CardSlice";
import { ArrowDownLeft, ArrowUpRight, Eye, Pencil, Trash, Filter, Plus } from "lucide-react";



const transactionTypes = ['transfer', 'deposit', 'withdrawal', 'payment', 'refund', 'fee'];
const categories = ['food', 'transport', 'shopping', 'bills', 'entertainment', 'healthcare', 'salary', 'investment', 'other'];
const statusOptions = ['pending', 'completed', 'failed', 'cancelled'];


export const transactionValidationSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(transactionTypes, 'Invalid transaction type')
    .required('Transaction type is required'),

  cardId: Yup.string()
    .nullable()
    .notRequired(),

 category: Yup.string()
  .test('is-valid-category', 'Invalid category', (value) => {
    return (
      value === '' ||
      (typeof value === 'string' && categories.includes(value))
    );
  }),
  description: Yup.string()
    .required('Description is required')
    .trim(),

  amount: Yup.number()
    .typeError('Amount must be a number')
    .min(0.01, 'Amount must be at least ₹0.01')
    .required('Amount is required'),

  status: Yup.string()
    .oneOf(statusOptions, 'Invalid status')
    .default('completed'),

  merchant: Yup.string()
    .trim()
    .notRequired(),
});

const Transactions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, loading } = useSelector(
    (state: RootState) => state.transaction
  );
  const { allCards } = useSelector((state: RootState) => state.card);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState<any>(null);
  const [viewTransaction, setViewTransaction] = useState<any>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deletedTransactionId, setDeletedTransactionId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const transactionTypes = ["transfer", "deposit", "withdrawal", "payment", "refund", "fee"];
  const categories = ["food", "transport", "shopping", "bills", "entertainment", "healthcare", "salary", "investment"];
  const statusOptions = ["completed", "pending", "failed"];

  const filteredTransactions = transactions.filter(
    (t) => filter === "all" || t.type === filter
  );

    type FieldKey = keyof typeof formik.values;

  const fields: FieldKey[] = [
    "type",
    "cardId",
    "category",
    "description",
    "amount",
    "status",
    "merchant"
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: editTransaction?.data?.type || "",
      cardId: editTransaction?.data?.cardId || "",
      amount: editTransaction?.data?.amount || 0,
      category: editTransaction?.data?.category || "",
      description: editTransaction?.data?.description || "",
      status: editTransaction?.data?.status || "completed",
      merchant: editTransaction?.data?.merchant || "",
    },
    validationSchema: transactionValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = {
          cardId: values.cardId,
          type: values.type,
          category: values.category,
          description: values.description,
          amount: parseFloat(values.amount as any),
          status: values.status,
          merchant: values.merchant || "",
        };

        let resultAction;
        if (editTransaction) {
          resultAction = await dispatch(
            updateExistingTransaction({ id: editTransaction.data._id, data })
          );
          if (resultAction.meta.requestStatus === "fulfilled") {
            toast.success("Transaction updated successfully!");
            resetForm();
            setEditTransaction(null);
            setIsDialogOpen(false);
            dispatch(fetchAllTransactions());
          } else {
            toast.error("Error updating transaction.");
          }
        } else {
          resultAction = await dispatch(createNewTransaction(data));
          if (resultAction.meta.requestStatus === "fulfilled") {
            toast.success("Transaction created successfully!");
            resetForm();
            setIsDialogOpen(false);
            dispatch(fetchAllTransactions());
          } else {
            toast.error("Error creating transaction.");
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("Unexpected error occurred.");
      }
    },
  });

  useEffect(() => {
    dispatch(fetchAllCards());
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  const handleDeleteTransaction = async () => {
    if (!deletedTransactionId) return;
    const result = await dispatch(deleteTransaction(deletedTransactionId));
    if (deleteTransaction.fulfilled.match(result)) {
      toast.success("Transaction deleted successfully!");
      dispatch(fetchAllTransactions());
    } else {
 toast.error(result.payload || "Error deleting transaction.");
    }
    setDeletedTransactionId(null);
    setConfirmDeleteOpen(false);
  };

const handleViewTransaction = async (id: string) => {
  const result = await dispatch(fetchTransactionById(id));
  if (fetchTransactionById.fulfilled.match(result)) {
    setViewTransaction(result.payload); // ✅ FIXED: Don't access `.data`
  } else {
    toast.error(result.payload || "Failed to fetch transaction details.");
  }
};


  const formatDateTime = (isoDate: string): string => {
    return moment(isoDate).local().format("DD MMM YYYY, h:mm A");
  };

  return (
   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Transactions</h1>
          <p className="text-slate-400">Track all your financial transactions</p>
        </div>
        <div className="flex gap-2">
          {/* Filter */}
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="all">All</SelectItem>
              {transactionTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Add Button */}
          <Button onClick={() => { setEditTransaction(null); setIsDialogOpen(true); }} className="bg-slate-700 hover:bg-slate-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Transaction List */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${["deposit", "refund"].includes(transaction.type) ? "bg-green-500/20" : "bg-red-500/20"}`}>
                    {["deposit", "refund"].includes(transaction.type) ? (
                      <ArrowDownLeft className="w-5 h-5 text-green-400" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{transaction.description}</p>
                    <p className="text-slate-400 text-sm">{transaction.merchant} • {transaction.category}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className={`font-bold ${["deposit", "refund"].includes(transaction.type) ? "text-green-400" : "text-red-400"}`}>
                    {["deposit", "refund"].includes(transaction.type) ? "+" : "-"}₹{transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-slate-400 text-sm">{formatDateTime(transaction.createdAt)}</p>
                  <div className="flex justify-end gap-2 mt-1">
                    <Eye className="w-4 h-4 text-blue-400 hover:text-blue-300 cursor-pointer" onClick={() => handleViewTransaction(transaction._id)} />
                    <Pencil className="w-4 h-4 text-yellow-400 hover:text-yellow-300 cursor-pointer" onClick={() => {
                      setEditTransaction({ data: transaction });
                      setIsDialogOpen(true);
                    }} />
                    <Trash className="w-4 h-4 text-red-400 hover:text-red-300 cursor-pointer" onClick={() => {
                      setDeletedTransactionId(transaction._id);
                      setConfirmDeleteOpen(true);
                    }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reuseable Dialogs */}
      {/* Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        if (!open) setEditTransaction(null);
        setIsDialogOpen(open);
      }}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>{editTransaction ? "Edit Transaction" : "Add New Transaction"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => {
                const label = field.replace("_", " ").toUpperCase();
                const isSelect = ["type", "category", "status", "cardId"].includes(field);
                let options: any[] = [];

                if (field === "type") options = transactionTypes;
                else if (field === "category") options = categories;
                else if (field === "status") options = statusOptions;
                else if (field === "cardId") options = allCards.map(card => ({
                  value: card._id,
                  label: `${card.name} (${card.accountId})`,
                }));

                const touched = formik.touched[field];
                const error = formik.errors[field];

                return (
                  <div key={field}>
                    <Label className="text-slate-300 capitalize">{label}</Label>
                    {isSelect ? (
                      <select
                        name={field}
                        value={formik.values[field] as string}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-slate-700 border-slate-600 text-white w-full p-2 rounded"
                      >
                        <option value="">Select {label}</option>
                        {options.map((opt: any) =>
                          typeof opt === "string" ? (
                            <option key={opt} value={opt}>{opt}</option>
                          ) : (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          )
                        )}
                      </select>
                    ) : (
                      <Input
                        type={field === "amount" ? "number" : "text"}
                        name={field}
                        value={formik.values[field] as string | number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder={label}
                      />
                    )}
                    {touched && typeof error === "string" && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}
                  </div>
                );
              })}
            </div>
            <Button type="submit" className="w-full bg-slate-600 hover:bg-slate-500" disabled={loading}>
              {loading ? "Saving..." : editTransaction ? "Update Transaction" : "Add Transaction"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Transaction Dialog */}
   <Dialog open={!!viewTransaction} onOpenChange={() => setViewTransaction(null)}>
  <DialogContent className="bg-slate-800 border-slate-700 text-white">
    <DialogHeader>
      <DialogTitle>Transaction Details</DialogTitle>
    </DialogHeader>
    {viewTransaction && (
  <div className="space-y-2 text-sm">
    <p><strong>Type:</strong> {viewTransaction.type || "N/A"}</p>
    <p><strong>Amount:</strong> ₹{viewTransaction.amount || "0.00"}</p>
    <p><strong>Category:</strong> {viewTransaction.category || "N/A"}</p>
    <p><strong>Description:</strong> {viewTransaction.description || "N/A"}</p>
    <p><strong>Status:</strong> {viewTransaction.status}</p>
    <p><strong>Merchant:</strong> {viewTransaction.merchant || "N/A"}</p>
    <p><strong>Date:</strong> {moment(viewTransaction.createdAt).format("DD MMM YYYY, h:mm A")}</p>

    {typeof viewTransaction.cardId === "object" && (
      <>
        <p><strong>Card Name:</strong> {viewTransaction.cardId.name}</p>
        <p><strong>Card Number:</strong> •••• {viewTransaction.cardId.lastFourDigits}</p>
      </>
    )}
  </div>
)}
  </DialogContent>
</Dialog>


      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this transaction? This action cannot be undone.</p>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="ghost" onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
            <Button className="bg-red-600 hover:bg-red-500" onClick={handleDeleteTransaction}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Transactions;
