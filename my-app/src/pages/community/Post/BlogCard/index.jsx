import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { formatTime } from "@/utils/timeUtils";
import { ArrowRight } from "lucide-react";
// Heart, MessageSquareMore, Share2
const BlogCard = ({ filterPost }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-6">
      {filterPost.length > 0 ? (
        filterPost.map((post, index) => {
          const timeFromNow = formatTime(post.createdAt);
          const initial = post.userName[0]?.toUpperCase() || "";

          return (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image/Topic Section */}
                <div className="relative lg:w-80 h-48 lg:h-auto flex-shrink-0">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5"></div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent px-6 text-center relative z-10">
                      {post.topic[0]}
                    </h3>
                  </div>

                  {/* Stats Overlay
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm shadow-lg text-xs font-semibold rounded-full px-3 py-1.5 border border-gray-100">
                      <Heart
                        className="w-3.5 h-3.5 text-red-500"
                        fill="currentColor"
                      />
                      <span className="text-gray-700">{post.likesCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm shadow-lg text-xs font-semibold rounded-full px-3 py-1.5 border border-gray-100">
                      <MessageSquareMore className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-gray-700">{post.commentCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm shadow-lg text-xs font-semibold rounded-full px-3 py-1.5 border border-gray-100">
                      <Share2 className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-gray-700">
                        {post.shares.length}
                      </span>
                    </div>
                  </div> */}
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {initial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {post.userName}
                      </p>
                      <p className="text-xs text-gray-500">{timeFromNow}</p>
                    </div>
                  </div>

                  {/* Title & Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {post.content}
                    </p>
                  </div>

                  {/* Topics */}
                  <div className="mt-4 mb-4">
                    {post.topic && post.topic.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {post.topic.map((item, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                          >
                            #{item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="inline-flex items-center bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                        No tags
                      </span>
                    )}
                  </div>

                  {/* Read More Button */}
                  <button
                    onClick={() =>
                      navigate(`/community/post/detail-post/${post.id}`, {
                        state: { post },
                      })
                    }
                    className="group/btn flex items-center justify-center gap-2 w-full py-3 px-4 bg-purple-500  hover:bg-purple-700  text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <span>Đọc thêm</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="text-6xl mb-4 opacity-50">📭</div>
            <p className="text-gray-500 text-lg">
              Không tìm thấy bài viết phù hợp
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

BlogCard.propTypes = {
  filterPost: PropTypes.array,
};

export default BlogCard;
