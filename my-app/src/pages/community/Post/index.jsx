import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "@/features/post/postSlice";
import PostForm from "@/pages/community/Post/CreatePost";

import BlogCard from "./BlogCard";
import LoadingSpinner from "@/components/Loading";

function Post() {
  const [showFormPost, setShowFormPost] = useState(false);
  const [loadingIsFilter, setLoadingIsFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("Tất cả");
  const { posts, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      setLoadingIsFilter(true);
      const timer = setTimeout(() => {
        setLoadingIsFilter(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, selectedTopic]);

  const filterPost = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.userName?.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesTopic = true;
    const financialTopics = [
      "tiết kiệm",
      "ngân sách",
      "tài chính",
      "đầu tư",
      "kinh doanh",
    ];

    if (selectedTopic !== "Tất cả") {
      if (selectedTopic === "Khác") {
        matchesTopic =
          Array.isArray(post.topic) &&
          !post.topic.some((item) =>
            financialTopics.includes(item.toLowerCase())
          );
      } else {
        matchesTopic =
          Array.isArray(post.topic) &&
          post.topic.some(
            (item) => item.toLowerCase() === selectedTopic.toLowerCase()
          );
      }
    }

    return matchesSearch && matchesTopic;
  });

  const topic = [
    "Tất cả",
    "Tiết kiệm",
    "Ngân sách",
    "Tài chính",
    "Đầu tư",
    "Kinh doanh",
    "Khác",
  ];

  return (
    <div className="  bg-gray-100 ">
      {/* Posts Section */}
      <div className=" p-4 space-y-6 mb-4 ">
        <h2 className="text-3xl font-bold text-center mb-6">
          Khám phá kiến thức
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Nơi chia sẻ những bài viết chất lượng cao về tài chính, đầu tư và quản
          lý doanh nghiệp.
        </p>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            className="w-1/3 p-2 rounded-full border border-gray-300 focus:outline-none"
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
                #{item}
              </button>
            ))}
          </div>
        </div>
      </div>
      {loading || loadingIsFilter ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        <BlogCard filterPost={filterPost} />
      )}

      {showFormPost && (
        <PostForm
          onClose={() => {
            setShowFormPost(false);
          }}
          onSuccess={() => dispatch(getPosts())}
        />
      )}
    </div>
  );
}

export default Post;
