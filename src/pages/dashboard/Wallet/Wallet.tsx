import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet as WalletIcon, Plus, Banknote } from "lucide-react";
import * as Yup from "yup";
import type { WalletData, WalletRequest } from "@/types/wallet";
import {
  createWallet,
  deleteWallet,
  fetchAllWallets,
  fetchWalletDetails,
  updateWallet,
} from "@/redux/WalletSlice";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";

export const walletValidationSchema = Yup.object({
  name: Yup.string().required("Account name is required"),
  type: Yup.string().required("Account type is required"),
  bank: Yup.string().required("Bank name is required"),
  balance: Yup.number()
    .required("Initial balance is required")
    .min(0, "Balance cannot be negative"),
  routing_number: Yup.string().required("Routing number is required"),
  account_number: Yup.string().required("Account number is required"), // add this
  currency: Yup.string().required("Currency is required"),
  isActive: Yup.string().oneOf(["true", "false"], "Select Yes or No"),
});

const Wallet = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, allwallets } = useSelector(
    (state: RootState) => state.wallet
  );

  type FieldKey = keyof typeof formik.values;

  const fields: FieldKey[] = [
    "name",
    "type",
    "bank",
    "balance",
    "routing_number",
    "account_number",
    "currency",
  ];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editWallet, setEditWallet] = useState<WalletData | null>(null);
  const [viewWallet, setViewWallet] = useState<WalletData | null>(null);
  const [deletedWalletId, setDeletedWalletId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllWallets());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      bank: "",
      balance: "",
      routing_number: "",
      account_number: "", // add this
      isActive: "true",
      currency: "",
    },
    validationSchema: walletValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const walletData: WalletRequest = {
          ...values,
          balances: parseFloat(values.balance),
          isActive: values.isActive === "true",
          account_number: values.account_number,
        };

        let resultAction;

        if (editWallet) {
          // UPDATE WALLET
          resultAction = await dispatch(
            updateWallet({ id: editWallet._id, walletData })
          );

          if (resultAction.meta.requestStatus === "fulfilled") {
            toast.success("Wallet updated successfully!");
            resetForm();
            setEditWallet(null);
            setIsDialogOpen(false);
            dispatch(fetchAllWallets());
          } else {
            toast.error(
              `Error updating wallet: ${
                resultAction.payload || "Unknown error"
              }`
            );
          }
        } else {
          // CREATE WALLET
          resultAction = await dispatch(createWallet(walletData));

          if (resultAction.meta.requestStatus === "fulfilled") {
            toast.success("Wallet created successfully!");
            resetForm();
            setIsDialogOpen(false);
            dispatch(fetchAllWallets());
          } else {
            toast.error(
              `Error creating wallet: ${
                resultAction.payload || "Unknown error"
              }`
            );
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("Unexpected error occurred.");
      }
    },
  });

  const handleDeleteWallet = async (walletId: string) => {
  const result = await dispatch(deleteWallet(walletId));
  if (deleteWallet.fulfilled.match(result)) {
    toast.success("Wallet deleted successfully!");
    dispatch(fetchAllWallets()); // Refresh
  } else {
    toast.error("Error deleting wallet.");
  }
  setDeletedWalletId(null);
};


const handleViewWallet = async (walletId: string) => {
  const result = await dispatch(fetchWalletDetails(walletId));
  if (fetchWalletDetails.fulfilled.match(result)) {
    setViewWallet(result.payload); // Payload is WalletData
  } else {
    toast.error("Failed to fetch wallet details.");
  }
};

  useEffect(() => {
    if (editWallet) {
      formik.setValues({
        name: editWallet.name,
        type: editWallet.type,
        bank: "",
        balance: editWallet.balances.toString(),
        routing_number: editWallet.routing_number,
        account_number: editWallet.account_number,
        isActive: editWallet.isActive ? "true" : "false",
        currency: editWallet.currency,
      });
      setIsDialogOpen(true);
    }
  }, [editWallet]);

  console.log("allwalelletes..", allwallets);

  const totalBalance =
    allwallets.length > 0
      ? allwallets.reduce((sum, account) => sum + (account?.balances || 0), 0)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Digital Wallet</h1>
          <p className="text-slate-400">
            Manage your bank accounts and balances
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-slate-700 hover:bg-slate-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              {editWallet ? "Edit Account" : "Add Account"}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editWallet ? "Edit Bank Account" : "Add New Bank Account"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field}>
                  <Label className="text-slate-300 capitalize">
                    {field.replace("_", " ")}
                  </Label>
                  <Input
                    type={field === "balance" ? "number" : "text"}
                    name={field}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[field]}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder={field}
                  />
                  {formik.touched[field] && formik.errors[field] && (
                    <p className="text-red-500 text-sm">
                      {formik.errors[field]}
                    </p>
                  )}
                </div>
              ))}
              <div>
                <Label className="text-slate-300">Is Active</Label>
                <select
                  name="isActive"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.isActive}
                  className="bg-slate-700 border-slate-600 text-white w-full p-2 rounded"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <Button
                type="submit"
                className="w-full bg-slate-600 hover:bg-slate-500"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editWallet
                  ? "Update Account"
                  : "Add Account"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Total Balance Card */}
      <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm">Total Balance</p>
              <p className="text-3xl font-bold text-white">
                ₹{totalBalance.toFixed(2)}
              </p>
            </div>
            <WalletIcon className="w-12 h-12 text-slate-400" />
          </div>
        </CardContent>
      </Card>

      {/* Accounts Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allwallets
          .filter(
            (account): account is WalletData =>
              account !== undefined && account !== null
          )
          .map((account, index) => (
            <motion.div
              key={account._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Banknote className="w-5 h-5 mr-2" />
                    {account.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-slate-400 text-sm">
                    Type: <span className="text-white">{account.type}</span>
                  </p>
                  <p className="text-slate-400 text-sm">
                    Account:{" "}
                    <span className="text-white">{account.account_number}</span>
                  </p>
                  <p className="text-2xl font-bold text-white">
                    ₹{account?.balances ? account.balances.toFixed(2) : "0.00"}
                  </p>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewWallet(account._id)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => setEditWallet(account)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setDeletedWalletId(account._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>

      {/* View Modal */}
      {viewWallet && (
        <Dialog open={true} onOpenChange={() => setViewWallet(null)}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle>Wallet Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {viewWallet.name}
              </p>
              <p>
                <strong>Type:</strong> {viewWallet.type}
              </p>
              <p>
                <strong>Account No:</strong> {viewWallet.account_number}
              </p>
              <p>
                <strong>Balance:</strong> ₹{viewWallet.balances.toFixed(2)}
              </p>
              <p>
                <strong>Currency:</strong> {viewWallet.currency}
              </p>
              <p>
                <strong>Active:</strong> {viewWallet.isActive ? "Yes" : "No"}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Modal */}
      {deletedWalletId && (
        <Dialog open={true} onOpenChange={() => setDeletedWalletId(null)}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this wallet?</p>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                variant="secondary"
                onClick={() => setDeletedWalletId(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-500"
                 onClick={async () => {
            if (deletedWalletId) {
              await handleDeleteWallet(deletedWalletId); // Call delete
              setDeletedWalletId(null); // Close modal after delete
            }
          }}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
};

export default Wallet;
