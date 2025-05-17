import httpRequest from "@/utils/httpRequest";

export const getGoalById = async (id) => {
  try {
    const response = await httpRequest.get(`/goal?goalId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllGoalByUserId = async (id) => {
  try {
    const response = await httpRequest.get(`/goal/filter?userId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const addGoal = async (data) => {
  try {
    const response = await httpRequest.post("/goal", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateGoal = async (id, data) => {
  try {
    const response = await httpRequest.put(`/goal?goalId=${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteGoal = async (id) => {
  try {
    const response = await httpRequest.delete(`/goal?goalId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
