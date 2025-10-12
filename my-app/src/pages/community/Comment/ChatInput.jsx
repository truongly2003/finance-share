import { useState } from "react";
import { Paperclip, Image } from "lucide-react";
import PropTypes from "prop-types";
import avatar from "@assets/avatar_1.jpg";
import useAuth from "@/context/useAuth";
import { commentApi } from "@/services/community/CommentService";

const ChatInput = ({ postId, commentId }) => {
  const { userId } = useAuth();
  const [isFocused, setIsFocused] = useState(false);
  const [comment, setComment] = useState({
    postId,
    userId,
    content: "",
    parentCommentId: commentId || null,
  });

  const handleChange = (e) => {
    setComment((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!comment.content.trim()) return;
    try {
      await commentApi.createComment(comment);
      setComment((prev) => ({
        ...prev,
        content: "",
      }));
      setIsFocused(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCancel = () => {
    setComment((prev) => ({ ...prev, content: "" }));
    setIsFocused(false);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) console.log("File selected:", file.name);
  };

  return (
    <div className="  w-full max-w-3xl mx-auto mt-3">
      <div className="flex  items-start space-x-3 w-full max-w-3xl mx-auto mt-3">
        {/* Avatar */}
        <img
          src={avatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
        />

        {/* Input Section */}
        <div className="flex flex-1 items-center bg-white border border-gray-200 rounded-2xl shadow-sm px-3 py-2 transition-all focus-within:border-blue-400">
          <input
            type="text"
            name="content"
            value={comment.content}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            placeholder="Viết bình luận của bạn..."
            className="flex-1 text-sm text-gray-700 bg-transparent outline-none placeholder-gray-400"
          />

          {/* Icons */}
          <div className="flex items-center space-x-3 text-gray-500">
            <label
              title="Chèn hình ảnh"
              className="cursor-pointer hover:text-blue-500 transition"
            >
              <Image className="w-5 h-5" />
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>

            <button
              title="Đính kèm tệp"
              className="hover:text-blue-500 transition"
            >
              <Paperclip className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {isFocused && (
        <div className="flex justify-end space-x-2 mt-2 animate-fadeIn">
          <button
            onClick={handleCancel}
            className="w-24 py-2 rounded-full font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="w-24 py-2 rounded-full font-medium text-white bg-purple-500 hover:bg-purple-600 transition"
          >
            Bình luận
          </button>
        </div>
      )}
    </div>
  );
};

ChatInput.propTypes = {
  postId: PropTypes.string,
  commentId: PropTypes.string,
};

export default ChatInput;
