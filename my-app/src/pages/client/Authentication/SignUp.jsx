import LoadingModal from "@/components/LoadingModal";
import useNotification from "@/context/useNotification";
import { registerUser } from "@/services/UserService";
import {
  Google,
  Facebook,
  Twitter,
  LinkedIn,
  Email,
} from "@mui/icons-material";

import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const { notify } = useNotification();
  const navigate = useNavigate();

  // State to track the form data
  const [formData, setFormData] = useState({
    email: "",
    password: "12345",
    confirmPassword: "12345",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      notify("Re-enter incorrect password", "error");
      return;
    }
    setIsProcessing(true);
    try {
      const res = await registerUser(formData.email, formData.password);
      notify(res.message, res.code === 200 ? "success" : "error");
      navigate("/check-email");
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white border p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-semibold mb-4">Sign Up</h2>

        <div className="">
          <div className="mb-3">
            <div className="flex items-center border border-purple-500 rounded p-2 ">
              <Email className="text-purple-500" />
              <input
                name="email"
                type="email"
                className="ml-2 w-full outline-none bg-transparent text-dark placeholder-slate-900"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center border border-purple-500 rounded p-2 ">
              <GppMaybeIcon className="text-purple-500" />
              <input
                name="password"
                type="password"
                className="ml-2 w-full outline-none bg-transparent text-dark placeholder-slate-900"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center border border-purple-500 rounded p-2 ">
              <GppMaybeIcon className="text-purple-500" />
              <input
                name="confirmPassword"
                type="password"
                className="ml-2 w-full outline-none bg-transparent text-dark placeholder-slate-900"
                placeholder="Confirm password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-sm">
            I agree to the terms
            </label>
          </div>

          <button
            className="mt-4 w-full bg-purple-500 text-black py-2 rounded font-semibold"
            onClick={handleSubmit}
          
          >
            Sign Up
          </button>
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-800">Or Login with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center space-x-3">
          <button className="p-2 bg-white  rounded border">
            <Google className="text-purple-500"/>
          </button>
          <button className="p-2 bg-white  rounded border">
            <Facebook className="text-purple-500"/>
          </button>
          <button className="p-2 bg-white  rounded border">
            <Twitter className="text-purple-500"/>
          </button>
          <button className="p-2 bg-white  rounded border">
            <LinkedIn className="text-purple-500" />
          </button>
        </div>

        <div className="text-center mt-4">
          <span className="text-sm">
            You already have a account?{" "}
            <Link to="/login" className="text-gray-500 hover:underline">
              Login now
            </Link>
          </span>
        </div>
      </div>

     <LoadingModal isProcessing={isProcessing}/>
    </div>
  );
}

export default SignUp;
