import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { formatTime } from "@/utils/timeUtils";
import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import ShareMenu from "../Shares/ShareMenu";

const BlogCard = ({ filterPost }) => {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRefs = useRef({});
  const navigate = useNavigate();

  // Xử lý click ngoài menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideAll = Object.values(menuRefs.current).every(
        (ref) => ref && !ref.contains(event.target)
      );
      if (isOutsideAll) setActiveMenuId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6">
      {filterPost.length > 0 ? (
        filterPost.map((post) => {
          const timeFromNow = formatTime(post.createdAt);
          const initial = post.userName?.[0]?.toUpperCase() || "";

          return (
            <div
              key={post.id}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              {/* ==========  Content ========== */}
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 p-6 flex flex-col">
                  {/* ===== Author + Menu ===== */}
                  <div className="flex justify-between items-center gap-3 mb-4">
                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {initial}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {post.userName}
                        </p>
                        <p className="text-xs text-gray-500">{timeFromNow}</p>
                      </div>
                    </div>

                    {/* Menu */}
                    <div
                      className="relative"
                      ref={(el) => (menuRefs.current[post.id] = el)}
                    >
                      <button
                        onClick={() =>
                          setActiveMenuId(
                            activeMenuId === post.id ? null : post.id
                          )
                        }
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                      >
                        <MoreHorizontal size={20} />
                      </button>

                      {activeMenuId === post.id && (
                        <ShareMenu
                          postId={post.id}
                          onClose={() => setActiveMenuId(null)}
                        />
                      )}
                    </div>
                  </div>

                  {/* ===== Post Title + Image ===== */}
                  <div className="flex justify-between gap-6">
                    {/* Title & Content */}
                    <div>
                      <h3
                        onClick={() =>
                          navigate(`/community/post/detail-post/${post.id}`, {
                            state: { post },
                          })
                        }
                        className="cursor-pointer text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors"
                      >
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {post.content.replace(/<[^>]+>/g, "")}
                      </p>
                    </div>

                    {/* Image */}
                    <div className="flex-shrink-0 w-36 h-24 rounded-lg overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* ===== Topic Tags ===== */}
                  <div className="flex justify-between items-center mt-4 mb-4">
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
                </div>
              </div>
            </div>
          );
        })
      ) : (
        /* ========== Post Empty ========== */
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
