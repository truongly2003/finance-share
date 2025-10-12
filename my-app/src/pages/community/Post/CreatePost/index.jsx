// import PropTypes from "prop-types";
// import { useState } from "react";
// import { postApi } from "@/services/community/PostService";
// import useNotification from "@/context/useNotification";
// import useAuth from "@/context/useAuth";
// const CreatePost = ({ onClose, onSuccess }) => {
//   const {userId}= useAuth();
//   console.log(userId)
//   const { notify } = useNotification();
//   const [post, setPost] = useState(
//     {
//       userId: userId,
//       title: "",
//       content: "",
//       mediaUrls: [
//         "http://example.com/image1.jpg",
//         "http://example.com/image2.jpg",
//       ],
//     }
//   );

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPost((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newMediaUrls = files.map((file) => URL.createObjectURL(file));
//     setPost((prev) => ({
//       ...prev,
//       mediaUrls: [...prev.mediaUrls, ...newMediaUrls],
//     }));
//   };
//   const handleSubmit = async () => {
//     try {
//       let response;
//       if (post.id) {
//         response = await postApi.updatePost(post.id, post);
//       } else {
//         response = await postApi.addPost(post);
//       }
//       notify(response.message, response.code === 200 ? "success" : "error");
//       onClose();
//       onSuccess();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="">
//       <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl w-full">
//         <h2 className="text-lg font-semibold mb-4">Create New Post</h2>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Title
//             </label>
//             <input
//               name="title"
//               value={post.title}
//               onChange={handleInputChange}
//               type="text"
//               placeholder="Enter post title..."
//               className="mt-1 block w-full border rounded-md shadow-sm p-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Content
//             </label>
//             <textarea
//               name="content"
//               value={post.content}
//               onChange={handleInputChange}
//               placeholder="What's on your mind?"
//               className="mt-1 block w-full border rounded-md shadow-sm h-56"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Photos/Videos
//             </label>
//             <div className="mt-1 flex items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-md p-10">
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*,video/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//                 id="file-upload"
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="flex items-center justify-center text-gray-500 hover:text-gray-700 cursor-pointer"
//               >
//                 <span className="text-xl">+</span>
//                 <span className="ml-2 text-sm">
//                   Add photos/videos or drag and drop
//                 </span>
//               </label>
//             </div>
//             {post.mediaUrls.length > 0 && (
//               <div className="mt-2 flex flex-wrap gap-2">
//                 {post.mediaUrls.map((url, index) => (
//                   <img
//                     key={index}
//                     src={url}
//                     alt="Preview"
//                     className="w-20 h-20 object-cover rounded"
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//               onClick={() => handleSubmit()}
//             >
//               Save
//             </button>

//             <button
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// CreatePost.propTypes = {
//   onClose: PropTypes.func,
//   onSuccess: PropTypes.func,

// };
// export default CreatePost;
import PropTypes from "prop-types";
import { useState } from "react";
import { Plus } from "lucide-react";
import useNotification from "@/context/useNotification";
import { postApi } from "@/services/community/PostService";
import useAuth from "@/context/useAuth";
import { useNavigate } from "react-router-dom";

export default function CreatePost({ initialPost }) {
  const navigate=useNavigate()
  const { notify } = useNotification();
  const { userId } = useAuth();
  const [post, setPost] = useState(
    initialPost || {
      userId: userId,
      topic: [],
      title: "",
      content: "",
      mediaUrls: [],
    }
  );
  const [customTopic, setCustomTopic] = useState("");
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!post.title || !post.topic || !post.content) {
      notify("Vui lòng nhập đầy đủ tiêu đề, chủ đề và nội dung!", "warning");
      return;
    }
    try {
      let response;
      let newPost = { ...post };
      if (post.topic.includes("Khác")) {
        newPost.topic = [customTopic];
      }
      if (post.id) {
        response = await postApi.updatePost(post.id, newPost);
      } else {
        response = await postApi.addPost(newPost);
      }
      notify(response.message, response.code === 200 ? "success" : "error");
      if(response.code===200){
        navigate("/community")
      }
    } catch (error) {
      console.error("Lỗi khi đăng bài:", error);
      notify("Có lỗi xảy ra khi đăng bài. Vui lòng thử lại!", "error");
    }
  };

  const handleTopicChange = (e) => {
    const { value, checked } = e.target;
    console.log(value, checked);
    if (value === "Khác") {
      if (checked) {
        // Bỏ chọn tất cả các chủ đề khác, chỉ giữ "Khác"
        setPost((prev) => ({ ...prev, topic: ["Khác"] }));
      } else {
        // Bỏ chọn "Khác" → làm trống ô nhập
        setPost((prev) => ({ ...prev, topic: [] }));
        setCustomTopic("");
      }
    } else {
      setPost((prev) => {
        if (checked) {
          const Newtopic = { ...prev, topic: [...prev.topic, value] };
          return Newtopic;
        } else {
          return {
            ...prev,
            topic: prev.topic.filter((topic) => topic !== value),
          };
        }
      });
    }
  };
  const topics = [
    "Tiết kiệm",
    "Ngân sách",
    "Tài chính",
    "Đầu tư",
    "Kinh doanh",
    "Khác",
  ];
 
  return (
    <div className="min-h-screen  flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-2xl  rounded shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-purple-500 text-white px-6 py-4 flex items-center space-x-2">
          <div className="bg-white bg-opacity-20 p-1.5 rounded-lg">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Tạo bài viết mới</h2>
            <p className="text-sm opacity-90">
              Chia sẻ kiến thức và truyền cảm hứng cho cộng đồng
            </p>
          </div>
        </div>

        {/* Form content */}
        <div className="p-6 space-y-4">
          {/* Tiêu đề */}
          <div>
            <label className="block font-medium mb-1">Tiêu đề bài viết *</label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              placeholder="Nhập tiêu đề hấp dẫn và thu hút người đọc..."
              className="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Chủ dề */}
          <div>
            <label className="block font-medium mb-1">Chủ đề</label>
            <div className="grid grid-cols-4 gap-2">
              {topics.map((topic) => (
                <label
                  key={topic}
                  className="flex items-center space-x-2 border rounded-lg p-2 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    value={topic}
                    checked={post.topic.includes(topic)}
                    onChange={handleTopicChange}
                    className="w-4 h-4 accent-purple-500"
                  />
                  <span>{topic}</span>
                </label>
              ))}
            </div>

            {/* ✅ Nếu chọn “Khác” thì hiện ô nhập */}
            {post.topic.includes("Khác") && (
              <div className="mt-3">
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Nhập chủ đề khác..."
                  className="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            )}
          </div>

          {/* URL hình ảnh */}
          <div>
            <label className="block font-medium mb-1">
              URL hình ảnh đại diện
            </label>
            <input
              type="text"
              name="mediaUrls"
              // value={post.mediaUrls}
              // onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Nội dung */}
          <div>
            <label className="block font-medium mb-1">
              Nội dung bài viết *
            </label>
            <textarea
              name="content"
              value={post.content}
              onChange={handleChange}
              className="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              rows="6"
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-3">
            <button
              type="button"
              className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            >
              {post.id ? "Cập nhật bài viết" : "Đăng bài viết"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

CreatePost.propTypes = {
  initialPost: PropTypes.object,
  // onClose: PropTypes.func,
  // onSuccess: PropTypes.func,
};
