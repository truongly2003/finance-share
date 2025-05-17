import PropTypes from "prop-types";
import { useState } from "react";
import {
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "@/services/TransactionService";
import { CircleX } from "lucide-react";
import CategoryDropdown from "../CategoryDropdown";
import useAuth from "@/context/useAuth";
import useWallet from "@/context/useWallet";
import MoneyInput from "../ui/MoneyInput";
import useNotification from "@/context/useNotification";
import useBalance from "@/context/useBalance";

export default function TransactionForm({
  onClose,
  initialTransaction,
  onSuccess,
}) {
  const { userId } = useAuth();
  const { walletId, fetchWallets } = useWallet();
  const { notify } = useNotification();
  const { refreshBalance } = useBalance();
  const [transaction, setTransactions] = useState(
    initialTransaction || {
      userId: userId,
      amount: "",
      description: "",
      transactionDate: new Date().toISOString().split("T")[0],
      categoryId: "",
      walletId: walletId,
      paymentMethod: "Card",
      transactionStatus: "complete",
    }
  );
  const handleChangeTransaction = (e) => {
    const { name, value } = e.target;
    setTransactions({
      ...transaction,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    try {
      let response;
      if (transaction.id) {
        response = await updateTransaction(transaction.id, transaction);
      } else {
        response = await addTransaction(transaction);
      }

      notify(response.message, response.code === 200 ? "success" : "error");
      fetchWallets();
      refreshBalance();
      onClose();
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteTransaction = async () => {
    if (!confirm("You are sure to delete this transaction")) return;
    try {
      const response = await deleteTransaction(transaction.id);
     
      notify(response.message, response.code === 200 ? "success" : "error");
      onClose();
      onSuccess();
      fetchWallets();
      refreshBalance();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectCategory = (category) => {
    setTransactions({
      ...transaction,
      categoryId: category.id,
    });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 ">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[1200px] relative border border-purple-600">
        <div className="grid grid-cols-6 gap-4 mt-3 ">
          {/* Ngày */}
          <div className="col-span-1">
            <label className="text-sm text-gray-600">Date</label>
            <input
              type="date"
              className="border rounded p-2 w-full"
              name="transactionDate"
              value={transaction.transactionDate}
              onChange={handleChangeTransaction}
            />
          </div>
           {/* Số tiền */}
           <div className="col-span-2">
            <MoneyInput
              name="amount"
              value={transaction.amount}
              onChange={handleChangeTransaction}
            />
          </div>
          {/* Loại */}
          <div className="col-span-3 ">
            <label className="text-sm text-gray-600">Category</label>
            <CategoryDropdown
              onSelectCategory={handleSelectCategory}
              initialCategoryId={Number(transaction.categoryId)}
            />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4 mt-3">
        
          {/* Lưu ý */}
          <div className="col-span-3">
            <label className="text-sm text-gray-600 h-[100px]">
              Description 
            </label>
            <textarea
              rows="5"
              className="w-full border rounded"
              placeholder="Nhập nội dung tại đây..."
              name="description"
              value={transaction.description}
              onChange={handleChangeTransaction}
            />
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-end mt-4 gap-2">
          <button className="flex items-center bg-gray-200 p-2 rounded">
            📷
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            {/* {transaction.id ? "Lưu thay đổi" : "Lưu"} */}
            Save
          </button>
          {transaction.id && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDeleteTransaction}
            >
              Delete
            </button>
          )}
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <CircleX />
          </button>
        </div>
      </div>
    </div>
  );
}

TransactionForm.propTypes = {
  initialTransaction: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
