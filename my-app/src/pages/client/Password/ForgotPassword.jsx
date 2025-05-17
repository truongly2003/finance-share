import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import LoadingModal from "@/components/LoadingModal";
import useNotification from "@/context/useNotification";
import { forgotPassword } from "@/services/UserService";

function ForgotPassword() {
  const [email, setEmail] = useState("truonglykhong2003@gmail.com");
  const { notify } = useNotification();
  // const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
   
    if (!email) {
      notify("Please enter email", "error");
      return;
    }
    setIsProcessing(true);
    try {
      const response = await forgotPassword({ email });
      notify(response.message, response.code === 200 ? "success" : "error");
    } catch (error) {
      console.log(error);
      notify("An error occurred, please try again..", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-xl font-semibold mb-4">
          Forget password
        </h2>
        <div>
          <div className="mb-3">
            <input
              type="email"
              className="w-full p-2 border rounded"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={ handleSubmit}
          className="mt-4 w-full bg-purple-500 text-black py-2 rounded font-semibold "
          >
          Send request
          </button>
        </div>
      </div>

      <LoadingModal isProcessing={isProcessing} />
    </div>
  );
}

export default ForgotPassword;
