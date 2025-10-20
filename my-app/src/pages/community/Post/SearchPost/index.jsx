import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "@/features/post/postSlice";
import { Link } from "react-router-dom";
function SearchPost() {
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filterPost = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.topic?.some((item) => item.toLowerCase().includes(searchTerm.toLowerCase())) ||
      post.userName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="relative flex-1">
      {/* Ô input */}
      <input
        type="text"
        placeholder="Tìm kiếm bài viết..."
        className="w-full px-4 py-3 border border-gray-200 rounded-xl  
                   focus:outline-none focus:ring-2 focus:ring-purple-500 
                   bg-white shadow-sm pr-10"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Nút X để xóa nội dung */}
      {searchTerm && (
        <button
          type="button"
          onClick={() => {
            setSearchTerm("");
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      )}
      {/* Hiển thị kết quả */}
      {searchTerm && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-xl mt-2 p-4 max-h-80 overflow-y-auto z-50">
          {!loading && (
            <div className="text-gray-700 font-medium mb-3">
              Kết quả tìm kiếm cho
              <span className="text-purple-600">{` "${searchTerm}"`}</span>
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center items-center py-6">
              <div className="border-t-2 border-b-2 border-blue-500 border-solid w-6 h-6 rounded-full animate-spin"></div>
            </div>
          ) : filterPost.length > 0 ? (
            posts.map((post) => (
              <Link
                to={`/community/post/detail-post/${post.id}`}
                key={post.id}
                className="p-2 hover:bg-purple-50 rounded flex items-center space-x-2 "
              >
                <div className="w-8 h-8 text-xs rounded-full bg-indigo-100 flex items-center justify-center text-gray-700 font-bold">
                  {post.userName[0]?.toUpperCase()}
                </div>
                <span>{post.title}</span>
              </Link>
            ))
          ) : (
            searchTerm && (
              <p className="text-gray-500 text-sm">
                Không tìm thấy bài viết nào
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPost;
