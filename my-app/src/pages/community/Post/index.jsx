import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "@/features/post/postSlice";
import { Plus } from "lucide-react";
import BlogCard from "./BlogCard";
import LoadingSpinner from "@/components/Loading";
import PostForm from "@/pages/community/PostForm";
import SearchPost from "./SearchPost";

function Post() {
  const [showFormPost, setShowFormPost] = useState(false);
  const [loadingIsFilter, setLoadingIsFilter] = useState(false);
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
  }, [selectedTopic]);

  const filterPost = posts.filter((post) => {
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

    return matchesTopic;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-500 mb-3">
              Finance Hub: Share. Learn. Grow.
            </h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              A community for sharing valuable insights on finance, investment, and business management.
            </p>
          </div>

          {/* Search and Create Post */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="w-full sm:flex-1 max-w-2xl">
              <SearchPost />
            </div>
            <button
              onClick={() => setShowFormPost(true)}
              className="flex items-center gap-2 px-6 py-3  bg-purple-500 text-white rounded-xl hover:bg-purple-700  shadow-lg hover:shadow-xl transition-all duration-300 font-semibold whitespace-nowrap transform hover:scale-105 hover:-translate-y-0.5"
            >
              <Plus size={20} strokeWidth={2.5} />
              Đăng bài mới
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Topic Filter */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8 backdrop-blur-sm bg-opacity-80">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-purple-200 rounded-full"></div>
            <h3 className="text-base font-bold text-gray-800 uppercase tracking-wide">
              Chủ đề
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {topic.map((item, index) => (
              <button
                key={index}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedTopic === item
                    ? "bg-purple-600  text-white shadow-lg shadow-purple-500/30 transform scale-105"
                    : " from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 hover:shadow-md border border-gray-200"
                }`}
                onClick={() => setSelectedTopic(item)}
              >
                #{item}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {loading || loadingIsFilter ? (
          <div className="flex justify-center items-center py-32">
            <LoadingSpinner />
          </div>
        ) : filterPost.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-16 text-center backdrop-blur-sm bg-opacity-80">
            <div className="text-8xl mb-6 animate-bounce">📭</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Chưa có bài viết nào
            </h3>
            <p className="text-gray-500 text-lg mb-6">
              Hãy là người đầu tiên chia sẻ trong chủ đề này!
            </p>
            <button
              onClick={() => setShowFormPost(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold transform hover:scale-105"
            >
              <Plus size={20} strokeWidth={2.5} />
              Tạo bài viết đầu tiên
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <BlogCard filterPost={filterPost} />
          </div>
        )}
      </div>

      {/* Post Form Modal */}
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