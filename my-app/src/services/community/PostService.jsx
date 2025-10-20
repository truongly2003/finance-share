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
  getPostById: async (postId) => {
    try {
      const response = await httpRequest.get(
        `/community-service/post/getById?postId=${postId}`
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài post:", error);
      throw error;
    }
  },
  getAllPostByUserId: async (userId) => {
    try {
      const response = await httpRequest.get(
        `/community-service/post/getByUserId?userId=${userId}`
      );
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

  likePost: async (postId, userId) => {
    try {
      const response = await httpRequest.post(
        `/community-service/post/like?postId=${postId}&userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo bài post:", error);
      throw error;
    }
  },
  getLikePost: async (postId) => {
    try {
      const response = await httpRequest.get(
        `/community-service/like/get-list-likes-post?postId=${postId}`
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thích bài viết:", error);
      throw error;
    }
  },
  likeComment: async (commentId, userId) => {
    try {
      const response = await httpRequest.post(
        `/community-service/like/comment?commentId=${commentId}&userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo bài post:", error);
      throw error;
    }
  },
  getLikeComment: async (commentId) => {
    try {
      const response = await httpRequest.get(
        `/community-service/like/get-list-likes-comment?commentId=${commentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thích bình luận:", error);
      throw error;
    }
  },

  sharePost: async (postId, userId) => {
    try {
      const response = await httpRequest.post(
        `/community-service/post/share?postId=${postId}&userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi chia sẻ bài viết:", error);
      throw error;
    }
  },
  getSharePost: async (postId) => {
    try {
      const response = await httpRequest.get(
        `/community-service/post/get-list-post-share?postId=${postId}`
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách chia sẻ:", error);
      throw error;
    }
  },
};
export { postApi };
