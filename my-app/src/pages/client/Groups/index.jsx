import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getAllGroupByUserId } from "@/services/GroupService";
import useAuth from "@/context/useAuth";
import { getIcon } from "./iconGroup";
import GroupForm from "./GroupForm";

function Groups() {
  const { userId } = useAuth();
  const [groups, setGroup] = useState([]);
  const [showFormGroup, setShowFormGroup] = useState(false);
  const fetchGroup = useCallback(async () => {
    try {
      const response = await getAllGroupByUserId(userId);
      if (response.data) {
        setGroup(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [userId]);
  useEffect(() => {
    fetchGroup()
  }, [fetchGroup]);

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-purple-600">My Groups</h2>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            onClick={() => setShowFormGroup(true)}
          >
            Create New Group
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, index) => (
            <Link
              to={`/group-detail/${group.id}`}
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-purple-300 transition"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl mb-4">{getIcon(group.icon)}</div>
                  <h3 className="text-lg font-semibold text-purple-700 mb-2">
                    {group.groupName}
                  </h3>
                </div>
                <div className="flex items-center mb-4">
                  <span className="ml-2 text-gray-600">
                    {group.memberCount} members
                  </span>
                </div>
                <p className="text-gray-600 mb-2">
                  Total Spent:{group.memberCount}
                  <span className="font-semibold">{group.totalSpent}</span>
                </p>
                <p className="text-red-500 font-semibold">
                  Your Share: {group.yourShare}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {showFormGroup && (
        <GroupForm
          onClose={() => setShowFormGroup(false)}
          onSuccess={fetchGroup}
        />
      )}
    </div>
  );
}

export default Groups;
