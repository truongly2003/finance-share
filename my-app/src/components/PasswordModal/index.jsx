import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PropTypes from "prop-types";
import useNotification from "@/context/useNotification";
import { updatePassword } from "@/services/UserService";
import useAuth from "@/context/useAuth";
import { useNavigate } from "react-router-dom";
function PasswordModal({ isOpen, onClose }) {
  const { notify } = useNotification();
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      notify("Mật khẩu mới và xác nhận mật khẩu không khớp!", "error");
      return;
    }
    try {
      const res = await updatePassword(userId, passwordData);
      notify(res.message, res.code === 200 ? "success" : "error");
      onClose();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-lg font-medium mb-4">Đổi mật khẩu</h2>
        <div>
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-gray-700 font-medium">
                Mật khẩu hiện tại
              </label>
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPasswords.current ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            <div className="relative">
              <label className="block text-gray-700 font-medium">
                Mật khẩu mới
              </label>
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative">
              <label className="block text-gray-700 font-medium">
                Xác nhận mật khẩu mới
              </label>
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPasswords.confirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-sm shadow-md hover:bg-gray-600"
            >
              Hủy
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-sm shadow-md hover:bg-green-600"
              onClick={() => handleSubmit()}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
PasswordModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};
export default PasswordModal;
