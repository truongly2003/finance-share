import httpRequest from "@/utils/httpRequest";
export const getBalance = async (id) => {
    try {
      const response = await httpRequest.get(`/overview/total-balance?userId=${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };