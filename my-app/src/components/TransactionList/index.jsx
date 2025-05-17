import PropTypes from "prop-types";
const TransactionList = ({
  transactionsToRender,
  setShowFormTransaction,
  setEditingTransaction,
  ICONS,
}) => {
  return (
    <div className="mt-6">
      <div className="space-y-2 h-vh">
        <h3 className="text-lg font-semibold text-purple-500 mb-4 ">
          Transaction list
        </h3>
        {Object.keys(transactionsToRender).length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl mt-4">
            <p className="text-gray-500">No transactions yet</p>
          </div>
        ) : (
          Object.entries(transactionsToRender).map(([date, data], index) => (
            <div key={index} className="mb-6 bg-white rounded-lg">
              <div className="flex justify-between items-center p-2 border-b mb-4 border-gray-300">
                <p className="text-gray-600 font-bold">{date}</p>
                <div className="text-sm text-gray-500 flex gap-4">
                  <span className="font-bold text-red-500">
                    Expense: - {data.totalExpense.toLocaleString()} đ
                  </span>
                  <span className="font-bold text-purple-500">
                    Income: + {data.totalIncome.toLocaleString()} đ
                  </span>
                </div>
              </div>
              
              {data.transactions.map((item, idx) => {
                const iconData = ICONS[item.icon] || {
                  icon: "?",
                  color: "bg-gray-400",
                };
                return (
                  <div key={idx} className="">
                    <div
                      className="p-2 mt-2 border rounded-lg  flex justify-between items-center cursor-pointer ml-2 mr-2  hover:bg-purple-200 hover:rounded-lg transition"
                      onClick={() => {
                        setShowFormTransaction(true);
                        setEditingTransaction(item);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-2 flex items-center justify-center ${iconData.color} rounded-full text-white`}
                        >
                          {iconData.icon}
                        </div>

                        <div>
                          <p className="text-gray-600 font-medium">
                            {item.categoryName}
                          </p>
                          <div className="">
                            <p className="text-gray-600 font-normal">
                              {item.transactionDate}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p
                        className={` ${
                          item.categoryType === "income"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {`${
                          item.categoryType === "income" ? "+" : "-"
                        }${item.amount.toLocaleString()} đ`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

TransactionList.propTypes = {
  transactionsToRender: PropTypes.object.isRequired,
  setShowFormTransaction: PropTypes.func.isRequired,
  setEditingTransaction: PropTypes.func.isRequired,
  ICONS: PropTypes.object.isRequired,
};

export default TransactionList;
