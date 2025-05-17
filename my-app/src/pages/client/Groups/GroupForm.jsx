// [Previous imports remain the same]
import { useState } from "react";
import useAuth from "@/context/useAuth";
import useNotification from "@/context/useNotification";
import { useNavigate } from "react-router-dom";
import { CircleX, ArrowDownUp } from "lucide-react";
import PropTypes from "prop-types";
import { addGroup, deleteGroup, updateGroup } from "@/services/GroupService";
import { iconList, getIcon } from "./iconGroup";
export default function GroupForm({ onClose, onSuccess, initialGroup }) {
  const { userId } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [group, setGroup] = useState(
    initialGroup || {
      userId: userId,
      icon: "",
      groupName: "",
    }
  );

  const handleChangeGroup = (e) => {
    setGroup({
      ...group,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      let response;
      const updatedGroup = { ...group };
      if (group.id) {
        response = await updateGroup(group.id, updatedGroup);
      } else {
        response = await addGroup(updatedGroup);
      }
      notify(response.message, response.code === 200 ? "success" : "error");
      onClose();
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure delete this group?")) return;
    try {
      const response = await deleteGroup(group.id);
      notify(response.message, response.code === 200 ? "success" : "error");
      onClose();
      onSuccess();
      navigate("/group");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[50]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative border-2 ">
        {/* Header */}
        <h2 className="text-xl text-black mb-4">Create New Group</h2>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-black">Group Name</label>
            <input
              type="text"
              className="w-full p-2  text-black border rounded-md"
              placeholder="Enter group name"
              name="groupName"
              value={group.groupName}
              onChange={handleChangeGroup}
            />
          </div>
          <div className="relative">
            <label className="text-sm text-black">Icon</label>
            <div
              className="mt-1 border rounded p-2 bg-white flex items-center justify-between cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div>
                {group.icon ? (
                  getIcon(group.icon)
                ) : (
                  <span className="text-black">Chọn icon</span>
                )}
              </div>
              <span className="text-black">
                <ArrowDownUp />
              </span>
            </div>

            {isOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-40 overflow-y-auto">
                {iconList.map((iconName) => (
                  <div
                    key={iconName}
                    className={`p-2 flex items-center cursor-pointer ${
                      group.icon === iconName
                        ? "bg-gray-100"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      setGroup({ ...group, icon: iconName });
                      setIsOpen(false);
                    }}
                  >
                    {getIcon(iconName)}
                    <span className="ml-2 text-black">{iconName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
          {group.id && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Delete group
            </button>
          )}
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="absolute top-1 right-1 text-gray-300 hover:text-gray-500"
            onClick={onClose}
          >
            <CircleX />
          </button>
        </div>
      </div>
    </div>
  );
}

GroupForm.propTypes = {
  initialGroup: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
