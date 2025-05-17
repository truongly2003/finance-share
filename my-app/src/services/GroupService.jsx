import httpRequest from "@/utils/httpRequest";

export const getGroupById = async (id) => {
  try {
    const response = await httpRequest.get(`/group/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllGroupByUserId = async (id) => {
  try {
    const response = await httpRequest.get("/group", {
      params: {
        userId: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addGroup = async (data) => {
  try {
    const response = await httpRequest.post("/group", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateGroup = async (id, data) => {
  try {
    const response = await httpRequest.put(`/group?groupId=${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteGroup = async (id) => {
  try {
    const response = await httpRequest.delete(`/group?groupId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
