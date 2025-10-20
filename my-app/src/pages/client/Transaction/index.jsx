import { useEffect, useState, useCallback } from "react";
import ICONS from "@/components/Icons";
import {
  getAllTransactionByUserIdAndPeriod,
  getAllTransactionsByUserIdAndFilterRange,
} from "@/services/TransactionService";
import { Input } from "@/components/ui/input";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import useAuth from "@/context/useAuth";
import useWallet from "@/context/useWallet";

function Transaction() {
  const { userId } = useAuth();
  const { walletId } = useWallet();
  const [transaction, setTransactions] = useState([]);
  const [showFormTransaction, setShowFormTransaction] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filter, setFilter] = useState("day");
  const [searchItem, setSearchItem] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchTransactions = useCallback(async () => {
    try {
      if (!walletId) return;
      let response;
      if (startDate && endDate) {
        response = await getAllTransactionsByUserIdAndFilterRange(
          userId,
          startDate,
          endDate,
          walletId
        );
      } else {
        response = await getAllTransactionByUserIdAndPeriod(
          userId,
          'year',
          walletId
        );
      }
      if (response.data) {
        setTransactions(response.data);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [filter, startDate, endDate, userId, walletId]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  
  // console.log(transaction)
  const groupedTransactions = transaction.reduce((acc, item) => {
    let dateKey;
    if (filter === "day") {
      dateKey = new Date(item.transactionDate).toLocaleDateString("vi-VN");
    } else if (filter === "week") {
      const date = new Date(item.transactionDate);
      const weekNumber = Math.ceil(date.getDate() / 7);
      dateKey = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-Tuần ${weekNumber}`;
    } else if (filter === "month") {
      const date = new Date(item.transactionDate);
      dateKey = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
    } else if (filter === "year") {
      dateKey = new Date(item.transactionDate).getFullYear().toString();
    }

    if (!acc[dateKey]) {
      acc[dateKey] = { transactions: [], totalExpense: 0, totalIncome: 0 };
    }

    acc[dateKey].transactions.push(item);

    if (item.categoryType === "expense") {
      acc[dateKey].totalExpense += item.amount;
    } else if (item.categoryType === "income") {
      acc[dateKey].totalIncome += item.amount;
    }

    return acc;
  }, {});

  const searchTransactions = Object.entries(groupedTransactions).reduce(
    (acc, [date, data]) => {
      const searchData = data.transactions.filter(
        (item) =>
          item.categoryName.includes(searchItem) ||
          item.categoryType.includes(searchItem) ||
          item.categoryName.toLowerCase().includes(searchItem.toLowerCase()) ||
          (searchItem.toLowerCase() === "thu nhập" &&
            item.categoryType === "income") ||
          (searchItem.toLowerCase() === "chi phí" &&
            item.categoryType === "expense")
      );
      if (searchData.length > 0) {
        acc[date] = { ...data, transactions: searchData };
      }
      return acc;
    },
    {}
  );

  const transactionsToRender =
    searchItem.trim() !== "" ? searchTransactions : groupedTransactions;
  return (
    <div className=" bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-purple-600">
            Transaction
          </h2>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            onClick={() => {
              setShowFormTransaction(true);
              setEditingTransaction(null);
            }}
          >
            Create new transaction
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg  border  p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Filter</h2>
          </div>
          <div className="grid grid-cols-4 gap-4  ">
            {/* Loại */}
            <div className="col-span-1 ">
              <label className="text-sm text-gray-600">Type</label>
              <select
                className=" border rounded p-2 w-full "
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
      

            {/* day week month year */}
            <div className="col-span-1">
              <label className="text-sm text-gray-600">Over time</label>
              <select
                className=" border rounded p-2 w-full"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setStartDate("");
                  setEndDate("");
                  setSearchItem("");
                }}
              >
                <option value="day">Day</option>
                <option value="week">Week </option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-600 ">To time period</label>
              <div className="flex gap-4 items-center">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setFilter("");
                  }}
                />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setFilter("");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <TransactionList
          transactionsToRender={transactionsToRender}
          setShowFormTransaction={setShowFormTransaction}
          setEditingTransaction={setEditingTransaction}
          ICONS={ICONS}
        />

        {/* add transaction */}

        {showFormTransaction && (
          <TransactionForm
            onClose={() => setShowFormTransaction(false)}
            initialTransaction={editingTransaction}
            onSuccess={fetchTransactions}
          />
        )}
      </div>
    </div>
  );
}

export default Transaction;
