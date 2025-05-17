function OverviewGroup() {
    return (  
        <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="text-gray-600">Total Spent</h4>
            <p className="text-2xl font-semibold text-gray-800">12,500,000 đ</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="text-gray-600">Your Share</h4>
            <p className="text-2xl font-semibold text-red-500">3,125,000 đ</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="text-gray-600">Members</h4>
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 bg-gray-300 rounded-full border border-white"
                  ></div>
                ))}
                <div className="w-6 h-6 bg-gray-200 rounded-full border border-white flex items-center justify-center text-xs text-gray-600">
                  +1
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spending by Category */}
        <div>
          <h3 className="text-lg font-semibold text-purple-700 mb-4">Spending by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">🍽️</span>
                <h4 className="text-gray-800 font-semibold">Food & Dining</h4>
              </div>
              <p className="text-gray-600">6 transactions</p>
              <p className="text-gray-600 mt-1">Total Spent: 5,500,000 đ</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">🚗</span>
                <h4 className="text-gray-800 font-semibold">Transportation</h4>
              </div>
              <p className="text-gray-600">4 transactions</p>
              <p className="text-gray-600 mt-1">Total Spent: 3,200,000 đ</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-semibold text-purple-700 mb-4">Recent Activity</h3>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-2">🍽️</span>
                <div>
                  <p className="text-gray-800 font-semibold">Group Dinner</p>
                  <p className="text-gray-600 text-sm">Added by Ly Truong • Today, 19:30</p>
                </div>
              </div>
              <p className="text-red-500 font-semibold">-850,000 đ</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default OverviewGroup;