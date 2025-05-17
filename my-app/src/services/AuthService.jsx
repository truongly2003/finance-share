import httpRequest from "@/utils/httpRequest";
import axios from "axios";
export const loginWithOAuth = async (provider, token) => {
  try {
    const response = await axios.get(`/auth/${provider}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    // const { accessToken, refreshToken, email } = response.data;
    // localStorage.setItem("accessToken", accessToken);
    // localStorage.setItem("refreshToken", refreshToken);
    // localStorage.setItem("email", email);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.errorMessage ||
        `Đăng nhập với ${provider} thất bại.`,
    };
  }
};
export const loginWithEmail = async (data) => {
  try {
    const response = await httpRequest.post(`/auth/login`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
// const AuthService = {

//   refreshToken: async (refreshToken) => {
//     const response = await axios.post('/auth/refresh', {
//       refreshToken,
//     });
//     return response.data;
//   },

//   getUserInfo: async (token) => {
//     const response = await axios.get('/auth/me', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   },
// };

// export default AuthService;

// export const loginWithGoogle = async (data) => {
//   try {
//     const response = await httpRequest.post("/auth/callback", data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// import axios from "axios";

export const loginWithGoogle = async (code) => {
  try {
    const response = await httpRequest.post(
      "/auth/callback/google",
      { code },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const loginWithFacebook = async (code) => {
  try {
    const response = await httpRequest.post(
      "/auth/callback/facebook",
      { code },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
