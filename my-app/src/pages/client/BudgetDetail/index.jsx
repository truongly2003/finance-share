import ProgressBar from "@/components/ProgressBar";
import TransactionList from "@/components/TransactionList";
import ICONS from "@/components/Icons";
import { getBudgetById } from "@/services/BudgetService";
import { getAllTransactionByUserIdAndBudgetId } from "@/services/TransactionService";
import { MoveLeft } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import TransactionForm from "@/components/TransactionForm";
import BudgetForm from "@/components/BudgetForm";
import useAuth from "@/context/useAuth";

function BudgetDetail() {
  const { id } = useParams();
  const { userId } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(null);
  //
  const [showFormTransaction, setShowFormTransaction] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  //
  const [showFormBudget, setShowFormBudget] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await getAllTransactionByUserIdAndBudgetId(userId, id);
      if (response.data) {
        setTransactions(response.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [id, userId]);
  const fetchBudgets = useCallback(async () => {
    const response = await getBudgetById(id);
    if (response.data) {
      setBudget(response.data);
    } else {
      console.error("Không tìm thấy dữ liệu ngân sách.");
    }
  }, [id]);
  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);
  const filter = "year";
  const groupedTransactions = transactions.reduce((acc, item) => {
    let dateKey;
    if (filter === "year") {
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

  if (!budget) {
    return <div>Đang tải dữ liệu...</div>;
  }
  const amountLimit = budget.amountLimit || 0;
  const totalSpent = budget.totalSpent || 0;
  const remainingAmount = amountLimit - totalSpent;
  // const overspentAmount = totalSpent - amountLimit;
  const progress = (budget.totalSpent / budget.amountLimit) * 100;
  const progressColor =
    budget.totalSpent >= budget.amountLimit ? "bg-red-500" : "bg-purple-500";
  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="  ">
          <div className="rounded-lg bg-white">
            <div className=" items-center justify-between">
              {/* Thanh điều hướng */}
              <div className="flex justify-between  space-x-1">
                <Link
                  to="/budget"
                  className="text-gray-600 hover:text-purple-600 space-x-4 flex items-center"
                >
                  <MoveLeft className="text-gray-400" /> Back to Budgets
                </Link>

                <h2 className="text-xl font-semibold text-purple-600">
                  {budget.budgetName}
                </h2>
                <button
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700  "
                  onClick={() => {
                    setShowFormBudget(true);
                    setEditingBudget(budget);
                  }}
                >
                  Edit Budget
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-4">
              {[
                { title: "Budget Amount", value: amountLimit },
                { title: "Amount Spent", value: totalSpent },
                { title: "Remaining", value: remainingAmount },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-purple-50 rounded-lg p-4 border border-purple-200 text-center"
                >
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-lg font-semibold text-purple-600">
                    {item.value.toLocaleString()}đ
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white mt-4">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-purple-500 mb-4">
                Spending Progress
              </h3>

              <div className="flex justify-between">
                <p className="text-gray-500 mb-2">{`${progress.toFixed(
                  0
                )}% of budget used`}</p>
                <p className="text-gray-500 ">
                  {amountLimit.toLocaleString()}đ / {totalSpent.toLocaleString()}đ
                </p>
              </div>
              <div className="flex justify-center w-full">
                <div className="w-full ">
                  <ProgressBar
                    progress={progress}
                    progressColor={progressColor}
                    startDate={budget.startDate}
                    endDate={budget.endDate}
                  />
                </div>
              </div>
              <div className="mt-4">
                <TransactionList
                  transactionsToRender={groupedTransactions}
                  setShowFormTransaction={setShowFormTransaction}
                  setEditingTransaction={setEditingTransaction}
                  ICONS={ICONS}
                />
              </div>
            </div>
          </div>
          {showFormTransaction && (
            <TransactionForm
              onClose={() => setShowFormTransaction(false)}
              initialTransaction={editingTransaction}
              onSuccess={fetchTransactions}
            />
          )}
          {showFormBudget && (
            <BudgetForm
              onClose={() => setShowFormBudget(false)}
              initialBudget={editingBudget}
              onSuccess={fetchBudgets}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BudgetDetail;
