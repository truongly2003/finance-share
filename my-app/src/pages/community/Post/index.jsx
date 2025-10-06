import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, updatePostLikes } from "@/features/post/postSlice";
import PostForm from "@/pages/community/Post/PostForm";
import Comment from "../Comment";
import useAuth from "@/context/useAuth";
// import { postApi } from "@/services/community/PostService";
import BlogCard from "./BlogCard";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
function Post() {
  const { userId } = useAuth();
  const [showFormPost, setShowFormPost] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const topic = [
    "All",
    "Saving",
    "Budget",
    "Finance",
    "Investing",
    "Business",
    "Other",
  ];

  return (
    <div className=" min-h-screen bg-gray-100 ">
      {/* Posts Section */}
      <div className=" p-4 space-y-6 pr-4 container">
        <h2 className="text-3xl font-bold text-center mb-6">
          Khám phá kiến thức
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Nơi chia sẻ những bài viết chất lượng cao về công nghệ, thiết kế và
          kinh doanh
        </p>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            className="w-1/2 p-2 rounded-full border border-gray-300 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="">
            {topic.map((item, index) => (
              <button
                key={index}
                className={`p-2 px-4 rounded-full mx-1 transition ${
                  selectedTopic === item
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedTopic(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <BlogCard searchTerm={searchTerm} selectedTopic={selectedTopic}/>
      {showFormPost && (
        <PostForm
          onClose={() => {
            setShowFormPost(false);
          }}
          onSuccess={() => dispatch(getPosts())}
        />
      )}
      {showComment && (
        <Comment
          postId={selectedPostId}
          onClose={() => {
            setShowComment(false);
            setSelectedPostId(null);
          }}
        />
      )}
    </div>
  );
}

export default Post;
