import httpRequest from "@/utils/httpRequest";

export const getAllContributeByGoalIdAndUserId = async (goalId, userId) => {
  try {
    const response = await httpRequest.get(
      `/finance-service/contribute/filter?goalId=${goalId}&userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllGoalByUserId = async (id) => {
  try {
    const response = await httpRequest.get(`/finance-service/contribute?contributeId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const addContribute = async (data) => {
  try {
    const response = await httpRequest.post("/finance-service/contribute", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateContribute = async (id, data) => {
  try {
    const response = await httpRequest.put(
      `/finance-service/contribute?contributeId=${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteContribute = async (id) => {
  try {
    const response = await httpRequest.delete(`/finance-service/contribute?contributeId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
