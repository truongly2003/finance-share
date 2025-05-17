function TransactionGroup() {
    return (  <div className="p-6">
        <h3 className="text-lg font-semibold text-purple-700 mb-4">
          Recent Transactions
        </h3>
        <ul className="space-y-4">
          <li className="flex justify-between">
            <span>Dinner Expense</span>
            <span>2,000,000 đ</span>
          </li>
          <li className="flex justify-between">
            <span>Taxi Fare</span>
            <span>500,000 đ</span>
          </li>
        </ul>
      </div>  );
}

export default TransactionGroup;