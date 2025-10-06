import httpRequest from "@/utils/httpRequest";
export const getAllWallet = async (userId) => {
  try {
    const response = await httpRequest.get(`/finance-service/wallet/getAll?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateDefaultWallet = async (userId, walletId) => {
  try {
    const response = await httpRequest.put(`/finance-service/wallet/default`, { userId, walletId });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// crud
export const getWalletById = async (id) => {
  try {
    const response = await httpRequest.get(`/finance-service/wallet?walletId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addWallet = async (data) => {
  try {
    const response = await httpRequest.post("/finance-service/wallet", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateWallet = async (id, data) => {
  try {
    const response = await httpRequest.put(`/finance-service/wallet?walletId=${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteWallet = async (id) => {
  try {
    const response = await httpRequest.delete(`/finance-service/wallet?walletId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const transferWallet = async (data) => {
  try {
    const response = await httpRequest.post("/finance-service/wallet/transfer", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};