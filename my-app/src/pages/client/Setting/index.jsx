import { useState } from "react";
import WalletPage from "../WalletPage";
import Profile from "../Profile";
import Catalog from "../Catalog";

function Setting() {
  const [activeTab, setActiveTab] = useState("Account");
  const tabs = ["Account", "Wallet", "Categories"];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Account":
        return <Profile />;
      case "Wallet":
        return <WalletPage />;
      case "Categories":
        return <Catalog />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="bg-white min-h-screen">
          {/* Header with Avatar, Name, Email */}
          <div className="ml-6  border-gray-200">
            <div className="flex items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border border-purple-600 text-gray-500 mr-4">
                120 x 120
              </div>
              <div>
                <h2 className="text-xl font-semibold text-purple-800">
                  Ly Truong
                </h2>
                <p className="text-gray-600">ly.truong@email.com</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className=" ">
            <div className="flex px-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-gray-600 hover:text-purple-600 ${
                    activeTab === tab
                      ? "border-b-2 border-purple-600 text-purple-600"
                      : ""
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
