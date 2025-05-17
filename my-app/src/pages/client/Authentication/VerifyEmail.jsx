import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useNotification from "@/context/useNotification";
import LoadingModal from "@/components/LoadingModal";

function VerifyEmail() {
  const { notify } = useNotification();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [isCheck, setIsCheck] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleVerifyEmail = async () => {
    if (!token) {
      setMessage("Invalid confirmation link");
      setIsError(true);
      return;
    }

    setMessage("Confirming email...");
    try {
      const response = await axios.get(
        `http://localhost:8080/api/email/verify-email?token=${token}`
      );
      setIsProcessing(true);
      if (response.data.status === true) {
        setIsCheck(false)
        setMessage(response.data.message);
        notify(response.data.message, "success");
         navigate("/login")
      }
    } catch (error) {
      setIsError(true);
      setMessage(
        error.response?.data?.message ||
          "Có lỗi xảy ra khi xác nhận email. Vui lòng thử lại."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Confirm email
        </h2>
        <p
          className={`text-center text-lg ${
            isError ? "text-red-500" : "text-green-500"
          } mb-4`}
        >
          {message || "Please click the button below to confirm your email."}
        </p>
        {isCheck && (
          <button
            onClick={handleVerifyEmail}
            className="w-full py-2 bg-[#ff6f61] text-white rounded hover:bg-[#ff4a38] mb-4"
          >
          Confirm email
          </button>
        )}

        {isError && (
          <button
            onClick={() => navigate("/signup")}
            className="w-full py-2 bg-[#ff6f61] text-white rounded hover:bg-[#ff4a38]"
          >
          Return to registration
          </button>
        )}
      </div>
    <LoadingModal isProcessing={isProcessing}/>
    </div>
  );
}

export default VerifyEmail;
