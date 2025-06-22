import httpRequest from "@/utils/httpRequest";
const postApi = {
  getAllPost: async () => {
    try {
      const response = await httpRequest.get(`/community-service/post`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài post:", error);
      throw error; 
    }
  },

  addPost: async (data) => {
    try {
      const response = await httpRequest.post("/community-service/post", data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo bài post:", error);
      throw error;
    }
  },

  updatePost: async (id, data) => {
    try {
      const response = await httpRequest.put(
        `/community-service/post?postId=${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật bài post:", error);
      throw error;
    }
  },

  deletePost: async (id) => {
    try {
      const response = await httpRequest.delete(
        `/community-service/post?postId=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi xóa bài post:", error);
      throw error;
    }
  },
  
  likePost: async (postId,userId) => {
    try {
      const response = await httpRequest.post(`/community-service/post/like?postId=${postId}&userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo bài post:", error);
      throw error;
    }
  },

};
export { postApi };
