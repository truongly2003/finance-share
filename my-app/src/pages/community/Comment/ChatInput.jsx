import { useState } from "react";
import { Paperclip, Image, Send } from "lucide-react";
import PropTypes from "prop-types";
import avatar from "@assets/avatar_1.jpg";
import useAuth from "@/context/useAuth";
import { commentApi } from "@/services/community/CommentService";
const ChatInput = ({ postId, commentId }) => {
  const { userId } = useAuth();
  const [comment, setComment] = useState({
    postId,
    userId,
    content: "",
    parentCommentId:commentId || null,
  });
  const handleChange = (e) => {
    setComment((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await commentApi.createComment(comment);
      setComment((prev) => ({
        ...prev,
        content: "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
    }
  };

  return (
    <div className="flex">
      <img
        src={avatar}
        alt="User Avatar"
        className="w-10 h-10 rounded-full mr-2"
      />
      <div className="flex items-center p-2 bg-gray-100 rounded-xl shadow-md w-full max-w-4xl mx-auto">
        <div className="flex-1">
          <div className="flex items-center   mt-1">
            <input
              type="text"
              value={comment.content}
              name="content"
              onChange={handleChange}
              className="flex-1 p-2 border-none focus:outline-none text-sm bg-transparent"
              placeholder="Type a message..."
            />
            <div className="flex space-x-2 p-2 text-gray-500">
              <label title="Attach Image" className="relative group">
                <Image />
                <input
                  type="file"
                  className="hidden "
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
              <div title="Attach File" className="relative group">
                <Paperclip />
              </div>
            </div>
          </div>
        </div>
        <button className="ml-2 text-blue-500" onClick={handleSubmit}>
          <Send />
        </button>
      </div>
    </div>
  );
};

ChatInput.propTypes = {
  postId: PropTypes.string,
  stompClient: PropTypes.object,
  isConnected: PropTypes.bool,
  commentId: PropTypes.string
};

export default ChatInput;
