import { useParams, useNavigate } from "react-router-dom";
import { formatTime } from "@/utils/timeUtils";
import PostAction from "../PostAction";
import { postApi } from "@/services/community/PostService";
import useAuth from "@/context/useAuth";
import { getPosts } from "@/features/post/postSlice";
import { useEffect, useState } from "react";
import Comment from "../../Comment";
import { useDispatch } from "react-redux";
import LoadingSpinner from "@/components/Loading";
import { ArrowLeft } from "lucide-react";
function DetailPost() {
  const { userId } = useAuth();
  const [post, setPost] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [onComment, setOnComment] = useState({
    showComment: false,
    selectedPostId: null,
  });

  useEffect(() => {
    const fetPost = async () => {
      try {
        setLoading(true);
        const res = await postApi.getPostById(id);
        setPost(res);
        setTimeout(() => setLoading(false), 4000);
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetPost();
  }, [id]);

  const handleLike = async (postId) => {
    try {
      await postApi.likePost(postId, userId);
      setPost((prev) => {
        const isLiked = prev.likes.includes(userId);
        const updatedLikes = isLiked
          ? prev.likes.filter((id) => id !== userId)
          : [...prev.likes, userId];
        return {
          ...prev,
          likes: updatedLikes,
          likesCount: updatedLikes.length,
        };
      });
      dispatch(getPosts);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  if (!post || !post.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Không tìm thấy bài viết
          </h3>
          <p className="text-gray-600 mb-8 text-lg">
            Bài viết này có thể đã bị xóa hoặc không tồn tại
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const timeFromNow = formatTime(post.createdAt);

  return (
    <div className="min-h-screen  mb-4">
      <div className="">
        {/* Back Button */}

        {/* Main Card */}
        <div className="bg-white overflow-hidden border border-gray-100">
       
          {/* Header Section */}
          <div className=" px-6 md:px-10 py-8 border-b border-gray-300">
               <button
            onClick={() => navigate(-1)}
            className="mb-2 text-gray-600 hover:text-gray-900 font-semibold flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại
          </button>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-xl md:text-5xl font-bold   mb-3">
                  {post.title}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                  <p className="text-gray-600 font-medium">
                    {post.userName || "Unknown User"}
                  </p>
                  <span className="text-gray-400">•</span>
                  <p className="text-gray-500 text-sm">{timeFromNow}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 justify-start md:justify-end">
                <PostAction
                  likes={post.likes}
                  likesCount={post.likesCount}
                  commentCount={post.commentCount}
                  shareCount={post.shares === null ? 0 : post.shares.length}
                  postId={post.id}
                  onLike={() => handleLike(post.id)}
                  onComment={() =>
                    setOnComment({
                      showComment: true,
                      selectedPostId: post.id,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Topics */}
          {post.topic && post.topic.length > 0 && (
            <div className="px-6 md:px-10 py-4">
              <div className="flex flex-wrap gap-2">
                {post.topic.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                  >
                    #{item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="px-6 md:px-10 py-4 ">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap font-light">
                {post.content}
                {post.content}
                {post.content}
                {post.content}
                {post.content}
                {post.content}
                {post.content}
                {post.content}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="px-6 md:px-10">
            <div className="border-t border-gray-200"></div>
          </div>

          {/* Comments Section */}
          {onComment.showComment && (
            <div className="px-6 md:px-10 py-8 bg-gradient-to-b from-slate-50 to-white">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-7 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900">Bình luận</h3>
              </div>
              <Comment
                postId={onComment.selectedPostId}
                onClose={() => {
                  setOnComment({
                    showComment: false,
                    selectedPostId: null,
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailPost;
