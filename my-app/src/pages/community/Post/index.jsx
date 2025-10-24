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

  const financialTopics = [
    "tiết kiệm",
    "ngân sách",
    "tài chính",
    "đầu tư",
    "kinh doanh",
  ];
  const topic = [
    "Tất cả",
    "Tiết kiệm",
    "Ngân sách",
    "Tài chính",
    "Đầu tư",
    "Kinh doanh",
    "Khác",
  ];

  const filterPost = posts.filter((post) => {
    let matchesTopic = true;
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

  return (
    <div className="min-h-screen">
      {/* =======header======== */}
      <div className="border-b border-gray-100 mb-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-purple-600">
              Finance Hub: Share. Learn. Grow.
            </h2>
            <p className="text-gray-600  max-w-2xl mx-auto">
              A community for sharing valuable insights on finance, investment,
              and business management.
            </p>
          </div>

          {/* search and create */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-4">
            <div className="w-full sm:flex-1 max-w-2xl">
              <SearchPost />
            </div>

            <button
              onClick={() => setShowFormPost(true)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold whitespace-nowrap transform hover:scale-105 hover:-translate-y-0.5"
            >
              <Plus size={20} strokeWidth={2.5} />
              Create new post
            </button>
          </div>

          {/* filter */}
          <div className="bg-white rounded shadow-md border border-gray-200 p-6 mb-4 backdrop-blur-sm bg-opacity-80">
            <div className="flex items-center gap-2 mb-5">
              <h3 className="text-base font-bold text-gray-800 uppercase tracking-wide">
                Topic
              </h3>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {topic.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTopic(item)}
                  className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedTopic === item
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30 transform scale-105"
                      : "from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 hover:shadow-md border border-gray-200"
                  }`}
                >
                  #{item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ======content====== */}
      <div>
        {loading || loadingIsFilter ? (
          //  loading
          <div className="flex justify-center items-center py-32">
            <LoadingSpinner />
          </div>
        ) : filterPost.length === 0 ? (
          //  post empty
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-16 text-center backdrop-blur-sm bg-opacity-80">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Chưa có bài viết nào
            </h3>
            <p className="text-gray-500 text-lg mb-6">
              Hãy là người đầu tiên chia sẻ trong chủ đề này!
            </p>
          </div>
        ) : (
          //  list post
          <div className="space-y-6">
            <BlogCard filterPost={filterPost} />
          </div>
        )}
      </div>

      {/* show form create post */}
      {showFormPost && (
        <PostForm
          onClose={() => setShowFormPost(false)}
          onSuccess={() => dispatch(getPosts())}
        />
      )}
    </div>
  );
}

export default Post;
