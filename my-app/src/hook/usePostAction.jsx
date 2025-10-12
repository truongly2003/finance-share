import { postApi } from "@/services/community/PostService";
import { useDispatch } from "react-redux";
import { getPosts } from "@/features/post/postSlice";
export const usePostAction = (userId) => {
  const dispatch = useDispatch();

  const handleLike = async (postId) => {
    try {
      await postApi.likePost(postId, userId);
      dispatch(getPosts());
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = (postId) => {
    return postId;
  };

  const handleShare = (postId) => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
  };

  return { handleLike, handleComment, handleShare };
};
