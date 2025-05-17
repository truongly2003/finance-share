import httpRequest from "@/utils/httpRequest";

export const getChatById = async (id) => {
  try {
    const response = await httpRequest.get(`/group/chat?chatId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllChatByUserId = async (id) => {
  try {
    const response = await httpRequest.get(`/group/chat/?userId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const addChat = async (data) => {
  try {
    const response = await httpRequest.post("/group/chat", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateChat = async (id, data) => {
  try {
    const response = await httpRequest.put(`/group/chat?chatId=${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteChat = async (id) => {
  try {
    const response = await httpRequest.delete(`/group/chat?chatId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
