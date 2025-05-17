import {  useState } from "react";
import GroupForm from "../../Groups/GroupForm";
import useGroup from "@/context/useGroup";
function SettingGroup() {
  const { group } = useGroup();
  
  const [showFormGroup, setShowFormGroup] = useState(false);
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-purple-700 mb-4">
        Group Settings
      </h3>
      <div className="text-gray-600 space-y-2">
        <p>
          <span className="font-medium">Group ID:</span> {group.id || "N/A"}
        </p>
        <p>
          <span className="font-medium">Group Name:</span>{" "}
          {group.groupName || "N/A"}
        </p>
        <p>
          <span className="font-medium">Icon:</span>{" "}
          {group.icon ? (
            <span
              src={group.icon}
              alt="Group Icon"
              className="inline-block w-6 h-6"
            />
          ) : (
            "No icon"
          )}
        </p>
        <p>
          <span className="font-medium">Created At:</span>{" "}
          {group.createdAt ? new Date(group.createdAt).toLocaleString() : "N/A"}
        </p>
        <p>
          <span className="font-medium">Member Count:</span>{" "}
          {group.memberCount ?? "N/A"}
        </p>
      </div>
      <button
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        onClick={() => setShowFormGroup(true)}
      >
        Edit Group
      </button>
      {showFormGroup && (
        <GroupForm
          initialGroup={group}
          onClose={() => setShowFormGroup(false)}
        />
      )}
    </div>
  );
}

export default SettingGroup;
