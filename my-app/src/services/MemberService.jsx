import httpRequest from "@/utils/httpRequest";

export const getMemberById = async (id) => {
  try {
    const response = await httpRequest.get(`/member?memberId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllMemberByGroupId = async (id) => {
  try {
    const response = await httpRequest.get(`/member?groupId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const addMember = async (data) => {
  try {
    const response = await httpRequest.post("/member", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateMember = async (id, data) => {
  try {
    const response = await httpRequest.put(`/member?memberId=${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteMember = async (id) => {
  try {
    const response = await httpRequest.delete(`/member?memberId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
