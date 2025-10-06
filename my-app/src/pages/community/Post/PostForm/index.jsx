import PropTypes from "prop-types";
import { useState } from "react";
import { postApi } from "@/services/community/PostService";
import useNotification from "@/context/useNotification";
import useAuth from "@/context/useAuth";
const PostForm = ({ onClose, onSuccess }) => {
  const {userId}= useAuth();
  console.log(userId)
  const { notify } = useNotification();
  const [post, setPost] = useState(
    {
      userId: userId,
      title: "",
      content: "",
      mediaUrls: [
        "http://example.com/image1.jpg",
        "http://example.com/image2.jpg",
      ],
    }
  );
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newMediaUrls = files.map((file) => URL.createObjectURL(file));
    setPost((prev) => ({
      ...prev,
      mediaUrls: [...prev.mediaUrls, ...newMediaUrls],
    }));
  };
  const handleSubmit = async () => {
    try {
      let response;
      if (post.id) {
        response = await postApi.updatePost(post.id, post);
      } else {
        response = await postApi.addPost(post);
      }
      notify(response.message, response.code === 200 ? "success" : "error");
      onClose();
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl w-full">
        <h2 className="text-lg font-semibold mb-4">Create New Post</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              name="title"
              value={post.title}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter post title..."
              className="mt-1 block w-full border rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              value={post.content}
              onChange={handleInputChange}
              placeholder="What's on your mind?"
              className="mt-1 block w-full border rounded-md shadow-sm h-56"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photos/Videos
            </label>
            <div className="mt-1 flex items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-md p-10">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <span className="text-xl">+</span>
                <span className="ml-2 text-sm">
                  Add photos/videos or drag and drop
                </span>
              </label>
            </div>
            {post.mediaUrls.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {post.mediaUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => handleSubmit()}
            >
              Save
            </button>
       
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
PostForm.propTypes = {
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,

};
export default PostForm;
