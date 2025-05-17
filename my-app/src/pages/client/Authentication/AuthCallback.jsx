import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingModal from "@/components/LoadingModal";
import useNotification from "@/context/useNotification";
import useAuth from "@/context/useAuth";
import { loginWithGoogle, loginWithFacebook } from "@/services/AuthService";
import PropTypes from "prop-types";

const AuthCallback = ({ provider }) => {
  const [searchParams] = useSearchParams();
  const { notify } = useNotification();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const code = searchParams.get("code");
    const handledKey = `${provider}_oauth_handled`;
    if (!code || sessionStorage.getItem(handledKey) === "true") {
      return;
    }

    sessionStorage.setItem(handledKey, "true");
    const handleOAuth = async () => {
      setIsProcessing(true);
      try {
        let response;
        if (provider === "google") {
          response = await loginWithGoogle(code);
        } else if (provider === "facebook") {
          response = await loginWithFacebook(code);
        }
        if (response) {
          notify("Login successfully", "success");
          login(response.accessToken);
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
          localStorage.setItem("userId", response.userId);
          navigate("/");
        }
      } catch (error) {
        console.error(`${provider} OAuth error:`, error);
        navigate("/login", { state: { error: "Đăng nhập thất bại" } });
      } finally {
        setIsProcessing(false);
      }
    };

    handleOAuth();
  }, [searchParams, provider, notify, login, navigate]);

  return <LoadingModal isProcessing={isProcessing} />;
};
AuthCallback.propTypes = {
  provider: PropTypes.oneOf(["google", "facebook"]),
};

export default AuthCallback;
