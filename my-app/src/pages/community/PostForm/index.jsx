import PropTypes from "prop-types";
import { useRef, useState } from "react";
import useNotification from "@/context/useNotification";
import { postApi } from "@/services/community/PostService";
import useAuth from "@/context/useAuth";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { uploadFileApi } from "@/services/community/UploadService";
export default function PostForm({ initialPost, onClose, onSuccess }) {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { userId } = useAuth();
  const quillRef = useRef(null);
  const [post, setPost] = useState(
    initialPost || {
      userId: userId,
      topic: [],
      title: "",
      content: "",
      imageUrl: "",
    }
  );
  const [customTopic, setCustomTopic] = useState("");

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const url = await uploadFileApi.uploadFile(file);
      setPost((prev) => ({ ...prev, imageUrl: url }));
      notify("Upload ảnh đại diện thành công!", "success");
    } catch {
      notify("Upload ảnh đại diện thất bại!", "error");
    }
  };
  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          // Gọi API upload ảnh
          const url = await uploadFileApi.uploadFile(file);

          // Chèn ảnh vào editor
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, "image", url);
        } catch (error) {
          notify("Upload ảnh thất bại!", error);
        }
      }
    };
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
      if (response.code === 200) {
        onClose();
        onSuccess();
        navigate("/community/post");
      }
    } catch (error) {
      console.error("Lỗi khi đăng bài:", error);
      notify("Có lỗi xảy ra khi đăng bài. Vui lòng thử lại!", "error");
    }
  };

  const handleTopicChange = (e) => {
    const { value, checked } = e.target;
    if (value === "Khác") {
      if (checked) {
        setPost((prev) => ({ ...prev, topic: ["Khác"] }));
      } else {
        setPost((prev) => ({ ...prev, topic: [] }));
        setCustomTopic("");
      }
    } else {
      setPost((prev) => {
        if (checked) {
          return { ...prev, topic: [...prev.topic, value] };
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

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
    handlers: {
      image: handleImageUpload,
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-8 py-5 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800">Tạo bài viết mới</h2>
          <button
            onClick={() => onClose()}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

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

          {/* Chủ đề */}
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

          {/* ảnh đại diện */}
          <div>
            <label className="block font-medium mb-1">Ảnh đại diện</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
            {post.imageUrl.length > 0 && (
              <img
                src={post.imageUrl}
                alt="preview"
                className="mt-2 max-h-40 rounded"
              />
            )}
          </div>

          {/* Nội dung */}
          <div>
            <label className="block font-medium mb-1">
              Nội dung bài viết *
            </label>
            <div className="border rounded-lg overflow-hidden">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                modules={quillModules}
                value={post.content}
                onChange={(value) => setPost({ ...post, content: value })}
                className="h-[200px] md:h-[200px] lg:h-[300px]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-3">
            <button
              type="button"
              className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition"
              onClick={() => onClose()}
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

PostForm.propTypes = {
  initialPost: PropTypes.object,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};
