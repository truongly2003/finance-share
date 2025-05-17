import { useState } from "react";
import PropTypes from "prop-types";

export default function MemberForm({ onClose }) {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const members = [
    { id: 1, name: "Nguyễn Văn A" },
    { id: 2, name: "Trần Thị B" },
    { id: 3, name: "Lê Văn C" },
    { id: 4, name: "Phạm Văn D" },
    { id: 5, name: "Hoàng Thị E" },
  ];

  const handleCheckboxChange = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const handleAddMembers = () => {
    console.log("Thêm thành viên:", selectedMembers);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[50]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative border-2 border-blue-600">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add member</h2>
          <button className="text-blue-600 hover:text-blue-800" onClick={onClose}>✕</button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Enter search member..."
          />
        </div>

        {/* Member List */}
        <div className="max-h-40 overflow-y-auto">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center p-2 hover:bg-gray-100"
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedMembers.includes(member.id)}
                onChange={() => handleCheckboxChange(member.id)}
              />
              <div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
              <span>{member.name}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded"
            onClick={handleAddMembers}
          >
            Save
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
MemberForm.propTypes = {
  //   initialGroup: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  //   onSuccess: PropTypes.func.isRequired,
};
