import {
  Google,
  Facebook,
  Twitter,
  LinkedIn,
  Email,
} from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "@/services/AuthService";
import useAuth from "@/context/useAuth";
import useNotification from "@/context/useNotification";

// import { googleConfig } from "@/configs/loginConfig";
import axios from "axios";

function Login() {
  // const { clientId } = googleConfig;
  // authUri
  const { login } = useAuth();
  const { notify } = useNotification();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async () => {
    try {
      const response = await loginWithEmail(data);
      if (response.status) {
        notify("Login successfully! 🎉", "success");
        login(response.accessToken);
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("userId", response.userId);
        navigate("/");
      } else {
        notify("Incorrect email or password 🎉", "error");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // login google
  const handleLoginWithGoogle = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/oauth/google"
      );
      
      window.location.href = response.data.authUrl;
    } catch (error) {
      console.error("Lỗi khi gọi backend để đăng nhập với Google", error);
    }
  };
  // // login facebook
  const handleLoginWithFacebook = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/oauth/facebook"
      );

      const { authUrl } = response.data;
      window.location.href = authUrl;
    } catch (error) {
      console.error("Lỗi khi gọi backend để đăng nhập với Facebook", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md border bg-white  p-6 rounded-lg shadow-md">
        <h2 className="text-center text-xl font-semibold mb-4 text-black">
          Login
        </h2>
        <div>
          <div className="mb-3">
            <div className="flex items-center border  rounded p-2 border-purple-500">
              <Email className="text-purple-500" />
              <input
                type="email"
                className="ml-2 w-full outline-none bg-transparent text-dark placeholder-slate-500"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center border  rounded p-2 border-purple-500">
              <input
                type="text"
                className="ml-2 w-full outline-none bg-transparent text-dark placeholder-slate-500"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-between text-sm text-black">
            <label>
              <input type="checkbox" className="mr-2 accent-white" /> Remember password
            </label>
            <Link to="/forgot-password" className="text-blac hover:underline">
              Forget password?
            </Link>
          </div>

          <button
            className="mt-4 w-full bg-purple-500 text-black py-2 rounded font-semibold "
            onClick={handleLogin}
          >
            Login
          </button>

          <div className="mt-4 text-center text-sm text-black">
            <p>Or login with</p>
            <div className="flex justify-center gap-3 mt-2">
              <button
                className="p-2 bg-white border rounded "
                onClick={handleLoginWithGoogle}
              >
                <Google className="text-purple-500"/>
              </button>
              <button
                className="p-2 bg-white border rounded "
                onClick={handleLoginWithFacebook}
              >
                <Facebook className="text-purple-500"/>
              </button>
              <button className="p-2 bg-white border rounded ">
                <Twitter className="text-purple-500"/>
              </button>
              <button className="p-2 bg-white border rounded ">
                <LinkedIn className="text-purple-500"/>
              </button>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-black">
          You do not have an account?{" "}
            <Link to="/signup" className="text-blac hover:underline">
            Sign Up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
