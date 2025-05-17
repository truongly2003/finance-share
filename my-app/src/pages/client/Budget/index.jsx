import { useCallback, useEffect, useState } from "react";

import { getAllBudgetByUserId } from "@/services/BudgetService";
import { Link } from "react-router-dom";
import ProgressBar from "@/components/ProgressBar";
import BudgetForm from "@/components/BudgetForm";
import useAuth from "@/context/useAuth";
export default function Budget() {
  const { userId } = useAuth();
  const [budgets, setBudgets] = useState([]);
  const [showFormBudget, setShowFormBudget] = useState(false);
  const [statusFilter, setStatusFilter] = useState("active");
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };
  const fetchBudgets = useCallback(async () => {
    try {
      const response = await getAllBudgetByUserId(userId);
      setBudgets(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [userId]);
  const filteredBudgets = budgets.filter((budget) => {
    const currentDate = new Date();
    const endDate = new Date(budget.endDate);
    const isActive = endDate > currentDate;
    const isExpired = endDate < currentDate;
    const isOverlimit = budget.totalSpent > budget.amountLimit;
    if (statusFilter === "active") return isActive && !isOverlimit;
    if (statusFilter === "expired") return isExpired;
    if (statusFilter === "overlimit") return isOverlimit;
    return true;
  });
  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const getDaysRemaining = (startDate, endDate) => {
    // const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    if (today > end) return 0;
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className=" ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-purple-600">Budgets</h2>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              onClick={() => {
                setShowFormBudget(true);
              }}
            >
              Create New Budget
            </button>
          </div>
          <div className=" border bg-white  shadow-sm rounded-lg p-6 ">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Filter</h2>
            </div>
            <div className="grid grid-cols-3 gap-4  ">
              <div className="col-span-1 ">
                <label className="text-sm text-gray-600">Status</label>
                <select
                  value={statusFilter}
                  onChange={handleStatusChange}
                  className=" border rounded p-2 w-full "
                >
                  <option value="active">Active</option>
                  <option value="expired"> expired</option>
                  <option value="overlimit">over limit</option>
                </select>
              </div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <div className="mt-6">
            {filteredBudgets.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl mt-2">
                <p className="text-gray-500">No budget yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 ">
                {filteredBudgets.map((budget, index) => {
                  const progress =
                    (budget.totalSpent / budget.amountLimit) * 100;
                  const progressColor =
                    budget.totalSpent >= budget.amountLimit
                      ? "bg-red-500"
                      : "bg-purple-500";
                  const daysRemaining = getDaysRemaining(
                    budget.startDate,
                    budget.endDate
                  );
                  return (
                    <Link
                      key={index}
                      className="bg-white shadow-md rounded-lg p-4 cursor-pointer border hover:border-purple-300"
                      to={`/budget/budget-detail/${budget.id}`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center mb-4">
                          <h3 className="text-lg font-semibold text-purple-600">
                            {budget.budgetName}
                          </h3>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-2">
                            Spent: {budget.totalSpent.toLocaleString()} đ /{" "}
                            {budget.amountLimit.toLocaleString()} đ
                          </p>
                        </div>
                        {/* progress */}
                        <ProgressBar
                          progress={progress}
                          progressColor={progressColor}
                          startDate={budget.startDate}
                          endDate={budget.endDate}
                        />
                      </div>
                      <p className="text-gray-500">
                        {daysRemaining} days remaining
                      </p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {showFormBudget && (
            <BudgetForm
              onClose={() => setShowFormBudget(false)}
              onSuccess={fetchBudgets}
            />
          )}
        </div>
      </div>
    </div>
  );
}
