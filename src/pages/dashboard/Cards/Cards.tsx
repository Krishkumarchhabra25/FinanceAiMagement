import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Eye, EyeOff, CreditCard } from "lucide-react";
import type { AppDispatch, RootState } from "@/redux/store";
import { fetchAllWallets } from "@/redux/WalletSlice";
import { createCard, deleteCard, fetchAllCards, fetchCardByCardId, updateCardById } from "@/redux/CardSlice";

const cardValidationSchema = Yup.object().shape({
  accountId: Yup.string().required("Account ID is required"),
  name: Yup.string().required("Card name is required"),
  type: Yup.string().oneOf([
    "Debit Card", "Credit Card", "ATM Card", "RuPay Card", "Prepaid Card", "Forex Card", "Business Credit Card"
  ]).required("Card type is required"),
  holderName: Yup.string().required("Card holder name is required"),
  cardNumber: Yup.string().matches(/^\d{16}$/, "Card number must be 16 digits").required("Card number is required"),
  expiryMonth: Yup.string().matches(/^(0[1-9]|1[0-2])$/, "Invalid month").required("Expiry month is required"),
  expiryYear: Yup.string().matches(/^\d{4}$/, "Invalid year").required("Expiry year is required"),
  cvv: Yup.string().matches(/^\d{3}$/, "CVV must be 3 digits").required("CVV is required"),
  creditLimit: Yup.number().required("Credit limit is required"),
  currentBalance: Yup.number().required("Current balance is required"),
  interestRate: Yup.number().required("Interest rate is required"),
  isActive: Yup.boolean().required("Status is required"),
});


const Cards = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allwallets } = useSelector((state: RootState) => state.wallet);
  const { allCards } = useSelector((state: RootState) => state.card);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  
  useEffect(() => {
    dispatch(fetchAllWallets());
    dispatch(fetchAllCards());
  }, [dispatch]);

const openDetails = async (id: string) => {
  const result = await dispatch(fetchCardByCardId(id));

  if (fetchCardByCardId.fulfilled.match(result)) {
    console.log("result of details", result.payload); // now this is guaranteed to be defined
    setSelectedCard(result.payload);
    setIsDetailOpen(true);
  } else {
    console.error("Failed to fetch card details:", result.payload);
    toast.error(result.payload as string); // show error toast if API failed
  }
};


  const formik = useFormik({
    initialValues: selectedCard ?? {
      accountId: "",
      name: "",
      type: "",
      holderName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      creditLimit: 0,
      currentBalance: 0,
      interestRate: 0,
      isActive: true,
    },
    enableReinitialize: true,
    validationSchema: cardValidationSchema,
  onSubmit: async (values, { resetForm }) => {
    if (isEditOpen && selectedCard) {
      const result = await dispatch(updateCardById({ id: selectedCard._id, cardData: values }));
      if (updateCardById.fulfilled.match(result)) {
        toast.success("Card updated!");
        dispatch(fetchAllCards());
        setIsEditOpen(false);
      } else if (updateCardById.rejected.match(result)) {
        toast.error(result.payload as string);
      }
    } else {
      const result = await dispatch(createCard(values));
      if (createCard.fulfilled.match(result)) {
        toast.success("Card created!");
        dispatch(fetchAllCards());
        resetForm();
        setIsDialogOpen(false);
      } else if (createCard.rejected.match(result)) {
        toast.error(result.payload as string);
      }
    }
  },
});

useEffect(() => {
  if (selectedCard) {
    console.log("selected card.." , selectedCard)
    formik.setValues({
      accountId: selectedCard.accountId || "",
      name: selectedCard.name || "",
      type: selectedCard.type || "",
      holderName: selectedCard.holderName || "",
      cardNumber: selectedCard.cardNumber || "",
      expiryMonth: selectedCard.expiryMonth || "",
      expiryYear: selectedCard.expiryYear || "",
      cvv: selectedCard.cvv || "",
      creditLimit: selectedCard.creditLimit || 0,
      currentBalance: selectedCard.currentBalance || 0,
      interestRate: selectedCard.interestRate || 0,
      isActive: selectedCard.isActive ?? true,
    });
  }
}, [selectedCard]);

  const fields = [
    "accountId", "name", "type", "holderName", "cardNumber", "expiryMonth", "expiryYear",
    "cvv", "creditLimit", "currentBalance", "interestRate"
  ];

  const toggleVisibility = (cardId: string) => {
    setIsVisible((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  return (
    <motion.div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl text-white font-bold">Credit Cards</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-slate-700 text-white hover:bg-slate-600">
              <Plus className="w-4 h-4 mr-2" /> Add Card
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader><DialogTitle className="text-white">Add Card</DialogTitle></DialogHeader>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {fields.map((field) => (
        <div key={field}>
          <Label htmlFor={field} className="text-slate-300 capitalize">{field}</Label>

          {field === "accountId" ? (
            // AccountId dropdown (allwallets)
            <select
              id={field}
              name={field}
              value={formik.values.accountId}
              onChange={formik.handleChange}
              className="bg-slate-700 border-slate-600 text-white w-full p-2 rounded"
            >
              <option value="">Select Account</option>
              {allwallets.map((wallet) => (
                <option key={wallet._id} value={wallet._id}>
                  {wallet.name} ({wallet.type})
                </option>
              ))}
            </select>
          ) : field === "type" ? (
            // Card Type dropdown (fixed options)
            <select
              id={field}
              name={field}
              value={formik.values.type}
              onChange={formik.handleChange}
              className="bg-slate-700 border-slate-600 text-white w-full p-2 rounded"
            >
              <option value="">Select Card Type</option>
              {[
                "Debit Card",
                "Credit Card",
                "ATM Card",
                "RuPay Card",
                "Prepaid Card",
                "Forex Card",
                "Business Credit Card"
              ].map((typeOption) => (
                <option key={typeOption} value={typeOption}>
                  {typeOption}
                </option>
              ))}
            </select>
          ) : (
            // All other fields as input
            <Input
              id={field}
              name={field}
              type={typeof formik.values[field] === 'number' ? 'number' : 'text'}
              value={formik.values[field] as string | number}
              onChange={formik.handleChange}
              className="bg-slate-700 border-slate-600 text-white"
            />
          )}
        </div>
      ))}

    </div>

    <Button type="submit" className="w-full bg-slate-600 hover:bg-slate-500">Submit</Button>
  </form>
            
          </DialogContent>
        </Dialog>
      </div>

      {/* Details Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader><DialogTitle className="text-white">Card Details</DialogTitle></DialogHeader>
          {selectedCard && (
            <div className="space-y-2 text-slate-300">
              <p><b>Name:</b> {selectedCard.name}</p>
              <p><b>Type:</b> {selectedCard.type}</p>
              <p><b>Holder:</b> {selectedCard.holderName}</p>
              <p><b>Number:</b> {selectedCard.cardNumber}</p>
              <p><b>Expiry:</b> {selectedCard.expiryMonth}/{selectedCard.expiryYear}</p>
              <p><b>CVV:</b> {selectedCard.cvv}</p>
              <p><b>Credit Limit:</b> ₹{selectedCard.creditLimit}</p>
              <p><b>Balance:</b> ₹{selectedCard.currentBalance}</p>
              <p><b>Interest:</b> {selectedCard.interestRate}%</p>
              <p><b>Status:</b> {selectedCard.isActive ? "Active" : "Inactive"}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader><DialogTitle className="text-white">Edit Card</DialogTitle></DialogHeader>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

           {fields.map((field) => (
  <div key={field}>
    <Label htmlFor={field} className="text-slate-300">{field}</Label>

    {field === "accountId" ? (
      // AccountId dropdown (from allwallets)
      <select
        id={field}
        name={field}
        value={formik.values.accountId}
        onChange={formik.handleChange}
        className="bg-slate-700 border-slate-600 text-white w-full p-2 rounded"
      >
        <option value="">Select Account</option>
        {allwallets.map((wallet) => (
          <option key={wallet._id} value={wallet._id}>
            {wallet.name} ({wallet.type})
          </option>
        ))}
      </select>
    ) : field === "type" ? (
      // Card Type dropdown (fixed options)
      <select
        id={field}
        name={field}
        value={formik.values.type}
        onChange={formik.handleChange}
        className="bg-slate-700 border-slate-600 text-white w-full p-2 rounded"
      >
        <option value="">Select Card Type</option>
        {[
          "Debit Card",
          "Credit Card",
          "ATM Card",
          "RuPay Card",
          "Prepaid Card",
          "Forex Card",
          "Business Credit Card"
        ].map((typeOption) => (
          <option key={typeOption} value={typeOption}>
            {typeOption}
          </option>
        ))}
      </select>
    ) : (
      // All other fields as input
      <Input
        id={field}
        name={field}
        type={typeof formik.values[field] === 'number' ? 'number' : 'text'}
        value={formik.values[field] as string | number}
        onChange={formik.handleChange}
        className="bg-slate-700 border-slate-600 text-white"
      />
    )}
  </div>
))}
</div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">Update</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader><DialogTitle className="text-red-400">Confirm Delete</DialogTitle></DialogHeader>
          <p className="text-slate-300">Are you sure to delete <strong>{selectedCard?.name}</strong>?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setIsDeleteOpen(false)} variant="ghost" className="text-slate-400">Cancel</Button>
            <Button
              className="bg-red-700 hover:bg-red-600 text-white"
              onClick={async () => {
                const result = await dispatch(deleteCard(selectedCard._id));
                if (deleteCard.fulfilled.match(result)) {
                  toast.success("Card deleted!");
                  dispatch(fetchAllCards());
                  setIsDeleteOpen(false);
                }
              }}
            >Delete</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCards.map((card) => (
          <Card key={card._id} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-white flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />{card.name}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleVisibility(card._id)}
                className="text-slate-400 hover:text-white"
              >
                {isVisible[card._id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </CardHeader>
            <CardContent className="space-y-2 text-slate-300">
              <p>Number: **** **** **** {card.cardNumber.slice(-4)}</p>
              <p>Type: {card.type}</p>
              <p>Holder: {card.holderName}</p>
              <p>Limit: ₹{card.creditLimit}</p>
              <p>Balance: ₹{card.currentBalance}</p>
              <p>Interest: {card.interestRate}%</p>
              <div className="flex justify-between mt-2">
                <Button onClick={() => openDetails(card._id)} size="sm" className="bg-slate-700 text-white">View</Button>
                <Button onClick={() => { setSelectedCard(card); setIsEditOpen(true); }} size="sm" className="bg-blue-700 text-white">Edit</Button>
                <Button onClick={() => { setSelectedCard(card); setIsDeleteOpen(true); }} size="sm" className="bg-red-700 text-white">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default Cards;