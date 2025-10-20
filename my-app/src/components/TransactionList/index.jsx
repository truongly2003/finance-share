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
          Danh sách giao dịch
        </h3>
        {Object.keys(transactionsToRender).length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl mt-4">
            <p className="text-gray-500">Không có giao dịch</p>
          </div>
        ) : (
          Object.entries(transactionsToRender).map(([date, data], index) => (
            <div key={index} className="mb-6 bg-white rounded-lg">
              <div className="flex justify-between items-center p-2 border-b mb-4 border-gray-300">
                <p className="text-gray-700">{date}</p>
                <div className="flex items-center justify-between gap-6 text-sm font-medium">
                  <span className="text-red-600 bg-red-50 px-3 py-1 rounded-full shadow-sm">
                     Chi tiêu:{" "}
                    <span className="font-semibold">
                      - {data.totalExpense.toLocaleString()} đ
                    </span>
                  </span>
                  <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full shadow-sm">
                    Thu nhập:{" "}
                    <span className="font-semibold">
                      + {data.totalIncome.toLocaleString()} đ
                    </span>
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
                      className="p-2 mt-2 border rounded-lg  flex justify-between items-center cursor-pointer ml-2 mr-2  hover:bg-gray-200 hover:rounded-lg transition"
                      onClick={() => {
                        setShowFormTransaction(true);
                        setEditingTransaction(item);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-2 h-8 w-8 flex items-center justify-center ${iconData.color} rounded-full text-white`}
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
