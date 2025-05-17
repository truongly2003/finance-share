import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useState, useEffect } from "react";
import { getBalance } from "@/services/Overview";
import { getAllTransactionsByUserIdAndFilterRange } from "@/services/TransactionService";
import useAuth from "@/context/useAuth";
import { Input } from "@/components/ui/input";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Card = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
      }}
    >
      {children}
    </div>
  );
};
import PropTypes from "prop-types";
import useWallet from "@/context/useWallet";
Card.propTypes = {
  children: PropTypes.node.isRequired,
};
const Overview = () => {
  const { userId } = useAuth();
  const { walletId } = useWallet();
  const [balance, setBalance] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balanceResponse = await getBalance(userId);
        setBalance({
          totalBalance: balanceResponse.totalBalance || 0,
          totalIncome: balanceResponse.totalIncome || 0,
          totalExpense: balanceResponse.totalExpense || 0,
        });

        const today = new Date();
        let start = startDate;
        let end = endDate;

        if (!startDate || !endDate) {
          switch (filter) {
            case "day":
              start = end = today.toISOString().split("T")[0];
              break;
            case "week":
              start = new Date(today.setDate(today.getDate() - 7))
                .toISOString()
                .split("T")[0];
              end = new Date().toISOString().split("T")[0];
              break;
            case "month":
              start = new Date(today.setMonth(today.getMonth() - 1))
                .toISOString()
                .split("T")[0];
              end = new Date().toISOString().split("T")[0];
              break;
            case "year":
              start = new Date(today.setFullYear(today.getFullYear() - 1))
                .toISOString()
                .split("T")[0];
              end = new Date().toISOString().split("T")[0];
              break;
          }
        }

        const transactionResponse =
          await getAllTransactionsByUserIdAndFilterRange(
            userId,
            start,
            end,
            walletId
          );

        setTransactions(transactionResponse.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userId, filter, startDate, endDate, walletId]);

  const getChartData = () => {
    let groupByKey;
    let formatLabel;

    switch (filter) {
      case "year":
        groupByKey = (t) => new Date(t.transactionDate).getFullYear();
        formatLabel = (key) => `${key}`;
        break;
      case "month":
        groupByKey = (t) => {
          const d = new Date(t.transactionDate);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            "0"
          )}`;
        };
        formatLabel = (key) => key;
        break;
      case "week":
        groupByKey = (t) => {
          const d = new Date(t.transactionDate);
          const startOfWeek = new Date(d.setDate(d.getDate() - d.getDay()));
          return `${startOfWeek.getFullYear()}-${String(
            startOfWeek.getMonth() + 1
          ).padStart(2, "0")}-${String(startOfWeek.getDate()).padStart(
            2,
            "0"
          )}`;
        };
        formatLabel = (key) => `Tuần bắt đầu ${key}`;
        break;
      case "day":
      default:
        groupByKey = (t) => t.transactionDate;
        formatLabel = (key) => key;
    }

    const groupedData = transactions.reduce((acc, t) => {
      const key = groupByKey(t);
      if (!acc[key]) {
        acc[key] = { income: 0, expense: 0 };
      }
      if (t.categoryType === "income") {
        acc[key].income += t.amount;
      } else if (t.categoryType === "expense") {
        acc[key].expense += t.amount;
      }
      return acc;
    }, {});

    const labels = Object.keys(groupedData).sort().map(formatLabel);
    const incomeData = Object.keys(groupedData)
      .sort()
      .map((key) => groupedData[key].income);
    const expenseData = Object.keys(groupedData)
      .sort()
      .map((key) => groupedData[key].expense);

    const incomeExpenseData = {
      labels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "#4caf50",
        },
        {
          label: "Expense",
          data: expenseData,
          backgroundColor: "#f44336",
        },
      ],
    };

    const categoryTotals = transactions
      .filter((t) => t.categoryType === "expense")
      .reduce((acc, t) => {
        acc[t.categoryName] = (acc[t.categoryName] || 0) + t.amount;
        return acc;
      }, {});

    const categoryData = {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#ffce56",
            "#4bc0c0",
            "#9966ff",
          ],
        },
      ],
    };

    // Calculate totals for the filtered period
    const filteredTotals = transactions.reduce(
      (acc, t) => {
        if (t.categoryType === "income") {
          acc.income += t.amount;
        } else if (t.categoryType === "expense") {
          acc.expense += t.amount;
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );

    return { incomeExpenseData, categoryData, filteredTotals };
  };

  const { incomeExpenseData, categoryData, filteredTotals } = getChartData();

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-purple-600">Overview</h2>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            cry huh huh
          </button>
        </div>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-4">
            {[
              { title: "Total Balance", value: balance.totalBalance },
              { title: "Total Expense", value: balance.totalExpense },
              { title: "Total Income", value: balance.totalIncome },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-purple-50 rounded-lg p-4 border border-purple-200 text-center"
              >
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  {item.title}
                </h3>
                <p
                  className={`text-lg font-semibold ${
                    item.title === "Total Income"
                      ? "text-green-600"
                      : item.title === "Total Expense"
                      ? "text-red-600"
                      : "text-purple-600"
                  }`}
                >
                  {item.value.toLocaleString()}đ
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 p-4">
            <div className="col-span-1">
              <label className="text-sm text-gray-600">To time line</label>
              <select
                className="border rounded p-2 w-full"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setStartDate("");
                  setEndDate("");
                }}
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-600">To time period</label>
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

          <Card title="Income & Expenditure Statistics">
            <h2 className="text-2xl font-bold text-gray-800">
              Income & Expense
            </h2>
            <div className="p-4">
              <p className="text-green-600 font-semibold">
                Income: {filteredTotals.income.toLocaleString()}đ
              </p>
              <p className="text-red-600 font-semibold">
                Expense: {filteredTotals.expense.toLocaleString()}đ
              </p>
            </div>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
              <Bar
                data={incomeExpenseData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    tooltip: {
                      callbacks: {
                        label: (context) =>
                          `${
                            context.dataset.label
                          }: ${context.parsed.y.toLocaleString()}đ`,
                      },
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Amount (VNĐ)",
                      },
                      ticks: {
                        callback: (value) => value.toLocaleString(),
                      },
                    },
                    x: {
                      title: {
                        display: true,
                        text:
                          filter === "year"
                            ? "Year"
                            : filter === "month"
                            ? "Month"
                            : filter === "week"
                            ? "Week"
                            : "Day",
                      },
                    },
                  },
                }}
              />
            </div>
          </Card>

          <Card className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Spending By Category
            </h2>
            <div className="flex flex-wrap items-center gap-6">
              {/* Pie Chart Container */}
              <div className="w-[300px] flex-shrink-0">
                <Pie
                  data={categoryData}
                  options={{ responsive: true }}
                  className="w-full h-full"
                />
              </div>

              {/* Transaction List */}
              <div className="flex-1 min-w-[300px]">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  List Transaction
                </h3>
                <ul className="max-h-[300px] overflow-y-auto space-y-3 pr-2">
                  {transactions
                    .filter((t) => t.categoryType === "expense")
                    .map((t, index) => (
                      <li
                        key={index}
                        className="pb-3 border-b border-gray-200 last:border-b-0 flex justify-between items-center"
                      >
                        <div>
                          <strong className="text-gray-800">
                            {t.categoryName}:
                          </strong>
                          <span className="ml-2 text-gray-600">
                            {t.amount.toLocaleString()}đ
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {t.transactionDate}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;
