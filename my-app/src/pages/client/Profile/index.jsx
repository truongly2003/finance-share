import PasswordModal from "@/components/PasswordModal";
import PropTypes from "prop-types";
import useAuth from "@/context/useAuth";
import useNotification from "@/context/useNotification";
import { deleteUser, getUserById, updateUser } from "@/services/UserService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function DeleteAccountModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Confirm account deletion
        </h2>
        <p className="text-gray-400 mb-4">
          Are you sure you want to delete your account? If you do, all of your
          data (including personal information, activity history, etc.) will be
          lost and cannot be recovered.
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={onConfirm}
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
}
DeleteAccountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
function Profile() {
  const { userId } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserById(userId);

      setUser({
        userName: res.userName || "",
        email: res.email || "",
        phoneNumber: res.phoneNumber || "",
        createdAt: res.createdAt || "",
      });
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await updateUser(userId, user);
      notify(res.message, res.code === 200 ? "success" : "error");
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDeleteAccount = async () => {
    try {
      const response = await deleteUser(userId);
      notify(response.message, response.code === 200 ? "success" : "error");
      setIsDeleteModalOpen(false);
      navigate("/login");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      sessionStorage.removeItem("google_oauth_handled");
      sessionStorage.removeItem("facebook_oauth_handled");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" ">
      <div className="bg-white rounded-2xl  p-8">
        <div className=" flex justify-center items-center mb-4  ">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border border-purple-600 text-gray-500 mr-4">
            120 x 120
          </div>
          <div>
            <h2 className="text-xl font-semibold text-purple-800">Ly Truong</h2>
            <p className="text-gray-600">ly.truong@email.com</p>
          </div>
        </div>
        <div className="border-b mb-6"></div>
        <di className="mt-4">
          <h1 className="text-black text-xl">Thông tin cá nhân</h1>
        </di>
        <div className="space-y-5 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên
            </label>
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày tạo
            </label>
            <input
              type="tel"
              value={new Date(user.createdAt).toLocaleDateString("vi-VN")}
              disabled
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngôn ngữ
            </label>
            <select
              name="language"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Vietnamese">Tiếng việt</option>
            </select>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-all shadow-lg shadow-purple-200"
                onClick={handleSubmit}
              >
                Lưu thay đổi
              </button>
              <button
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all"
                onClick={() => setIsModalOpen(true)}
              >
                Thay đổi mật khẩu
              </button>
            </div>
            <button
              className="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-medium hover:bg-red-100 transition-all border border-red-200"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Xóa tài khoản
            </button>
          </div>
        </div>
      </div>

      <PasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteAccount}
      />
    </div>
  );
}

export default Profile;
