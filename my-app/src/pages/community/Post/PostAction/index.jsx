// src/components/PostActions.jsx
import { Heart, MessageSquareMore, Share2 } from "lucide-react";
import PropTypes from "prop-types";
const PostAction = ({
  likes = [],
  likesCount = 0,
  commentCount = 0,
  userId,
  onLike,
  onComment,
  onShare,
  
}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex space-x-4 text-gray-500">
        {/* Like */}
        <div
          className="cursor-pointer flex items-center gap-x-2"
          onClick={onLike}
        >
          <Heart
            className={`${
              likes.includes(userId) ? "text-red-700 fill-red-700" : ""
            }`}
          />
          {likesCount === 0 ? "" : likesCount} Thích
        </div>

        {/* Comment */}
        <div
          className="cursor-pointer flex items-center gap-x-2"
          onClick={onComment}
        >
          <MessageSquareMore />
          {commentCount === 0 ? "" : commentCount} Bình luận
        </div>

        {/* Share */}
        <div
          className="cursor-pointer flex items-center gap-x-2"
          onClick={onShare}
        >
          <Share2 /> Chia sẻ
        </div>
      </div>
    </div>
  );
};
PostAction.propTypes = {
  likes: PropTypes.arrayOf(PropTypes.string),
  likesCount: PropTypes.number,
  commentCount: PropTypes.number,
  userId: PropTypes.string,
  onLike: PropTypes.func,
  onComment: PropTypes.func,
  onShare: PropTypes.func,
};
export default PostAction;
