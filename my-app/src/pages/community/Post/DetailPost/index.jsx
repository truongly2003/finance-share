import { useLocation, useNavigate } from "react-router-dom";
import { formatTime } from "@/utils/timeUtils";
import PostAction from "../PostAction";
import { postApi } from "@/services/community/PostService";
import useAuth from "@/context/useAuth";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Comment from "../../Comment";
function DetailPost() {
  const { userId } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [onComment, setOnComment] = useState({
    showComment: false,
    selectedPostId: null,
  });
  const [post, setPost] = useState(state.post);
  console.log(onComment.selectedPostId);
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
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600 mb-4">Không tìm thấy dữ liệu bài viết.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-purple-500 text-white rounded-full"
        >
          Quay lại
        </button>
      </div>
    );
  }

  const timeFromNow = formatTime(post.createdAt);
  const initial = post.userName[0]?.toUpperCase() || "";
  return (
    <div className=" ml-8 mr-8 space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors duration-200"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Quay lại</span>
      </button>
      <div className="  overflow-hidden bg-white ">
        {/* Header with Image */}
        <div className="relative h-48 ">
          <img src="" className="w-full h-full object-cover border-none" />
        </div>

        {/* Author + Content */}
        <div className="p-5">
          <div className="flex justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                {initial}
              </div>
              <div>
                <p className="text-sm font-medium">{post.userName}</p>
                <p className="text-xs text-gray-500">{timeFromNow}</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-base font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600 mt-2 ">{post.content}</p>
          </div>
          {/* topic */}
          <div className=" py-2">
            {post.topic && post.topic.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {post.topic.map((item, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 text-blue-700 text-xs px-3 py-1 rounded-full"
                  >
                    #{item}
                  </span>
                ))}
              </div>
            ) : (
              <span className="inline-block bg-gray-200 text-blue-700 text-xs px-3 py-1 rounded-full">
                No tags
              </span>
            )}
          </div>
          {/* action post */}
          <PostAction
            likes={post.likes}
            likesCount={post.likesCount}
            commentCount={post.commentCount}
            userId={post.userId}
            onLike={() => handleLike(post.id)}
            onComment={() =>
              setOnComment({
                showComment: true,
                selectedPostId: post.id,
              })
            }
            // onShare={() => handleShare(post.id)}
          />

          {onComment.showComment && (
            <Comment
              postId={onComment.selectedPostId}
              onClose={() => {
                // setShowComment(false);
                // setSelectedPostId(null);
                setOnComment({
                  showComment: false,
                  selectedPostId: null,
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailPost;
