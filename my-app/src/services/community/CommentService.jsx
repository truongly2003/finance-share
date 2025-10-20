import httpRequest from "@/utils/httpRequest";
const commentApi = {
  getAllCommentByPostId: async (postId) => {
    try {
      const response = await httpRequest.get(
        `community-service/comments/${postId}`
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài post:", error);
      throw error;
    }
  },
  createComment: async (data) => {
    try {
      const response = await httpRequest.post(
        `community-service/comments`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("error post:", error);
      throw error;
    }
  },
  deleteComment: async (commentId) => {
    try {
      const response = await httpRequest.delete(
        `community-service/comments?commentId=${commentId}`
      );
      return response.data;
    } catch (error) {
      console.error("error post:", error);
      throw error;
    }
  },
  getAllCommentChildren: async (commentId) => {
    try {
      const response = await httpRequest.get(
        `community-service/comments/children?commentId=${commentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài post:", error);
      throw error;
    }
  },
};
export { commentApi };
