import httpRequest from "@/utils/httpRequest";
export const addTransaction = async (data) => {
  try {
    const response = await httpRequest.post("/finance-service/transaction", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTransactionById = async (id) => {
  try {
    const response = await httpRequest.get(`/finance-service/transaction?transactionId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllTransactionByUserIdAndPeriod = async (
  userId,
  filterType,walletId
) => {
  try {
    const response = await httpRequest.get(
      `/finance-service/transaction/filter?userId=${userId}&filterType=${filterType}&walletId=${walletId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const getAllTransactionsByUserIdAndFilterRange = async (
  userId,
  startDate,
  endDate,walletId
) => {
  try {
    const response = await httpRequest.get(
      `/finance-service/transaction/filter-range?userId=${userId}&startDate=${startDate}&endDate=${endDate}&walletId=${walletId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateTransaction = async (id, data) => {
  try {
    const response = await httpRequest.put(`/finance-service/transaction/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteTransaction = async (id) => {
  try {
    const response = await httpRequest.delete(
      `/finance-service/transaction?transactionId=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// budget list
export const getAllTransactionByUserIdAndBudgetId = async (
  userId,
  budgetId
) => {
  try {
    const response = await httpRequest.get(
      `/finance-service/transaction/budget-list?userId=${userId}&budgetId=${budgetId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
