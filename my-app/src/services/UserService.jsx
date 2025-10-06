import httpRequest from "@/utils/httpRequest";

export const getUserById = async (id) => {
  try {
    const response = await httpRequest.get(`/user-service/api/auth/user?userId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await httpRequest.post("/user-service/api/user/register", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await httpRequest.put(`/user-service/api/user?userId=${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteUser = async (id) => {
  try {
    const response = await httpRequest.delete(`/user-service/api/user?userId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updatePassword = async (userId, data) => {
  try {
    const response = await httpRequest.put(
      `/user-service/api/user/change-password?userId=${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
// controller là emailController
// vefify email
export const verifyEmail = async (token) => {
  try {
    const response = await httpRequest.post(
      `/user-service/api/email/verify-email?token=${token}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// password
export const forgotPassword = async (data) => {
  try {
    const response = await httpRequest.post(`/user-service/api/user/forgot-password`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const resetPassword = async (data) => {
  console.log(data)
  try {
    const response = await httpRequest.post(`/user-service/api/user/reset-password`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
