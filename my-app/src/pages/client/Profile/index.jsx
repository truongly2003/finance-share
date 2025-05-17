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
        Are you sure you want to delete your account? If you do,
         all of your data (including personal information, activity history, etc.)
         will be lost and cannot be recovered.
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
    <div className="">
      <div className=" ">
        <div>
          <label className="block text-sm  text-gray-400 mb-1">
            {" "}
            Name
          </label>
          <input
            type="text"
            name="userName"
            value={user.userName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm  text-gray-400 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm  text-gray-400 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm  text-gray-400 mb-1">
            Create at
          </label>
          <input
            type="tel"
            value={new Date(user.createdAt).toLocaleDateString("vi-VN")}
            disabled
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
          />
        </div>

        <div className="mt-2">
          <label className="block text-sm  text-gray-400 mb-1">
            Language
          </label>
          <select
            name="language"
            // value={user.language}
            // onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
          >
            <option value="English">English</option>
            <option value="Vietnamese">Vietnamese</option>
          </select>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4">
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              onClick={handleSubmit}
            >
              Save Change
            </button>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              onClick={() => setIsModalOpen(true)}
            >
              Change PassWord
            </button>
          </div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete Account
          </button>
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
