import { useState } from "react";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import OverviewGroup from "./OverviewGroup";
import Chat from "./Chat";
import SettingGroup from "./SettingGroup";
import Member from "./Member";
import TransactionGroup from "./TransactionGroup";
import { Share2 } from "lucide-react";
import MemberForm from "./Member/MemberForm";
import useGroup from "@/context/useGroup";
function GroupDetail() {
  const { group } = useGroup();
 
  const [activeTab, setActiveTab] = useState("Chat");
  const tabs = ["Overview", "Transactions", "Members", "Chat", "Settings"];

  const [showFormMember, setShowFormMember] = useState(false);
  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return <OverviewGroup />;
      case "Transactions":
        return <TransactionGroup />;
      case "Members":
        return <Member />;
      case "Chat":
        return <Chat />;
      case "Settings":
        return <SettingGroup />;
      default:
        return null;
    }
  };
  const handleShareGroup = () => {
    alert("Chức năng chia sẻ nhóm đang được phát triển!");
  };
  return (
    <div className="bg-gray-100 ">
      <div className="rounded-lg shadow-md p-6  border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div className="  w-full">
            <div className="bg-white rounded-lg  border border-gray-200 w-full p-6">
              {/* Header */}

              <div className="flex  space-x-1 justify-between mb-6">
                <Link
                  to="/groups"
                  className="text-gray-600 hover:text-purple-600 space-x-4 flex items-center"
                >
                  <MoveLeft className="text-gray-400" /> Back to group
                </Link>
                <h2 className="text-xl font-semibold text-purple-600">
                  {group.groupName}
                </h2>
                <div className="space-x-4 flex">
                  <button
                    className=" bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 "
                    onClick={() => setShowFormMember(true)}
                  >
                    Add New Member
                  </button>
                  <button
                    onClick={handleShareGroup}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <Share2 className="w-4 h-4 mr-2" /> Share Group
                  </button>
                </div>
              </div>
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-gray-600 hover:text-purple-700 ${
                      activeTab === tab
                        ? "border-b-2 border-purple-700 text-purple-700"
                        : ""
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
      {showFormMember && (
        <MemberForm onClose={() => setShowFormMember(false)} />
      )}
    </div>
  );
}

export default GroupDetail;
