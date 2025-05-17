import { useState } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import useNotification from "@/context/useNotification";
import { resetPassword } from "@/services/UserService";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      notify("Passwords do not match", "error");
      return;
    }
    try {
      const response = await resetPassword({ token, password });
      notify(response.message, response.code === 200 ? "success" : "error");
      navigate("/login");
    } catch (error) {
      console.log(error);
      notify("Có lỗi xảy ra, vui lòng thử lại.", "error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-xl font-semibold mb-4">
        Reset password
        </h2>
        <div>
          <div className="mb-3">
            <input
              type="password"
              className="w-full p-2 border rounded"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="w-full p-2 border rounded"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-purple-500 text-black py-2 rounded font-semibold "
          >
            Reset password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
