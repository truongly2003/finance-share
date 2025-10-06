import httpRequest from "@/utils/httpRequest";

export const getGoalById = async (id) => {
  try {
    const response = await httpRequest.get(`/finance-service/goal?goalId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllGoalByUserId = async (id) => {
  try {
    const response = await httpRequest.get(`/finance-service/goal/filter?userId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const addGoal = async (data) => {
  try {
    const response = await httpRequest.post("/finance-service/goal", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateGoal = async (id, data) => {
  try {
    const response = await httpRequest.put(`/finance-service/goal?goalId=${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteGoal = async (id) => {
  try {
    const response = await httpRequest.delete(`/finance-service/goal?goalId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
