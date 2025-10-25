import httpRequest from "@/utils/httpRequest";
const uploadFileApi = {
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await httpRequest.post(
        `/community-service/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
export { uploadFileApi };
