import httpRequest from "@/utils/httpRequest";

export const getBudgetById = async (id) => {
  try {
    const response = await httpRequest.get(`/finance-service/budget?budgetId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllBudgetByUserId = async (id) => {
  try {
    const response = await httpRequest.get(`/finance-service/budget/filter?userId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const addBudget = async (data) => {
  try {
    const response = await httpRequest.post("/finance-service/budget", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateBudget = async (id, data) => {
  try {
    const response = await httpRequest.put(`/finance-service/budget?budgetId=${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteBudget = async (id) => {
  try {
    const response = await httpRequest.delete(`/finance-service/budget?budgetId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
