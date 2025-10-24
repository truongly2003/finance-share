// src/components/PostActions.jsx
import { Heart, MessageSquareMore, Share2 } from "lucide-react";
import PropTypes from "prop-types";
import ModalLikes from "../Likes/ModalLikes";
import { useState } from "react";
import useAuth from "@/context/useAuth";
import ModalShares from "../Shares/ModalShares";

const PostAction = ({
  likes = [],
  likesCount = 0,
  commentCount = 0,
  shareCount = 0,
  // userId,
  onLike,
  onComment,

  postId,
}) => {
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const { userId } = useAuth();
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex space-x-4 text-gray-500">
        {/* Like */}
        <div className="cursor-pointer flex items-center gap-x-2 text-sm">
          <Heart
            onClick={onLike}
            className={`h-5 w-5 ${
              likes.includes(userId) ? "text-red-700 fill-red-700" : ""
            }`}
          />

          <span
            onClick={() => setShowLikesModal(true)}
            className="hover:underline hover:text-purple-500"
          >
            {likesCount === 0 ? "0" : likesCount}
          </span>
        </div>

        {/* Comment */}
        <div
          className="cursor-pointer flex items-center gap-x-2 text-sm"
          onClick={onComment}
        >
          <MessageSquareMore className="h-5 w-5 " />
          {commentCount === 0 ? "0" : commentCount}
        </div>

        {/* Share */}
        <div className="cursor-pointer flex items-center gap-x-2 text-sm">
          <div className="flex space-x-3">
            <Share2 className="h-5 w-5" />
            <span
              onClick={() => setShowShareModal(true)}
              className="hover:underline hover:text-purple-500"
            >
              {shareCount === 0 ? "0" : shareCount}{" "}
            </span>
          </div>
        </div>
      </div>

      {showLikesModal && (
        <ModalLikes
          type="post"
          show={showLikesModal}
          id={postId}
          onClose={() => setShowLikesModal(false)}
        />
      )}
      {/*  danh sách chia sẻ */}
      {showShareModal && (
        <ModalShares id={postId} onClose={() => setShowShareModal(false)} />
      )}
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
  postId: PropTypes.string,
  shareCount: PropTypes.number,
};
export default PostAction;
