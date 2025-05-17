import httpRequest from "@/utils/httpRequest";
export const getAllWallet = async (userId) => {
  try {
    const response = await httpRequest.get(`/wallet/getAll?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateDefaultWallet = async (userId, walletId) => {
  try {
    const response = await httpRequest.put(`/wallet/default`, { userId, walletId });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// crud
export const getWalletById = async (id) => {
  try {
    const response = await httpRequest.get(`/wallet?walletId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addWallet = async (data) => {
  try {
    const response = await httpRequest.post("/wallet", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateWallet = async (id, data) => {
  try {
    const response = await httpRequest.put(`/wallet?walletId=${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteWallet = async (id) => {
  try {
    const response = await httpRequest.delete(`/wallet?walletId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const transferWallet = async (data) => {
  try {
    const response = await httpRequest.post("/wallet/transfer", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};