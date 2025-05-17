import httpRequest from "@/utils/httpRequest";

export const getBudgetById = async (id) => {
  try {
    const response = await httpRequest.get(`/budget?budgetId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllBudgetByUserId = async (id) => {
  try {
    const response = await httpRequest.get(`/budget/filter?userId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const addBudget = async (data) => {
  try {
    const response = await httpRequest.post("/budget", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateBudget = async (id, data) => {
  try {
    const response = await httpRequest.put(`/budget?budgetId=${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteBudget = async (id) => {
  try {
    const response = await httpRequest.delete(`/budget?budgetId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
