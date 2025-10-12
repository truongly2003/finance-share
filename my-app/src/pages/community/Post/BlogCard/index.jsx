import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { formatTime } from "@/utils/timeUtils";
import { Heart, MessageSquareMore, Share2 } from "lucide-react";
const BlogCard = ({ filterPost }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-8 mr-8">
      {filterPost.length > 0 ? (
        filterPost.map((post, index) => {
          const timeFromNow = formatTime(post.createdAt);
          const initial = post.userName[0]?.toUpperCase() || "";
          return (
            <div
              key={index}
              className="rounded-lg shadow-lg overflow-hidden bg-white"
            >
              {/* Image */}
              <div className="relative h-48">
                {/* <img
                  src="data:image/jpeg;base64,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"
                  className="w-full h-full object-cover border-none"
                  alt="Header image"
                /> */}
                <div className="w-full h-full text-center  content-center bg-gray-200">
                  <h3 className="text-2xl font-bold  text-gray-800 px-4">
                    {post.topic}
                  </h3>
                </div>
                <div className="absolute top-1 right-1 flex space-x-2 rounded-lg p-1">
                  <div className="flex items-center text-dark  shadow-slate-400 text-xs border rounded-full px-1.5 py-0.5">
                    <Heart className="w-4 h-4 mr-0.5" />
                    {post.likesCount}
                  </div>
                  <div className="flex items-center text-dark  shadow-slate-400 text-xs border rounded-lg px-1.5 py-0.5">
                    <MessageSquareMore className="w-4 h-4 mr-0.5" />
                    {post.commentCount}
                  </div>
                  <div className="flex items-center text-dark  shadow-slate-400 text-xs border rounded-full px-1.5 py-0.5">
                    <Share2 className="w-4 h-4 mr-0.5" />
                    {post.shares}
                  </div>
                </div>
              </div>

              {/* Author + Content */}
              <div className="p-5 ">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {initial}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{post.userName}</p>
                    <p className="text-xs text-gray-500">{timeFromNow}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-base font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {post.content}
                  </p>
                </div>
                {/* topic */}
                <div className=" py-2">
                  {post.topic && post.topic.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {post.topic.map((item, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-200 text-blue-700 text-xs px-3 p-2  rounded-full"
                        >
                          #{item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="inline-block bg-gray-200 text-blue-700 text-xs px-3 py-1 rounded-full">
                      No tags
                    </span>
                  )}
                </div>
                <div
                  className="p-2 mt-2 rounded-full  border flex content-center justify-center cursor-pointer"
                  onClick={() =>
                    navigate(`/community/detail-post/${post.id}`, {
                      state: { post },
                    })
                  }
                >
                  <button className="">Đọc thêm</button>
                </div>
                {/* <PostAction
                  likes={post.likes}
                  likesCount={post.likesCount}
                  commentCount={post.commentCount}
                  userId={userId}
                  onLike={() => handleLike(post.id)}
                  // onComment={() => handleComment(post.id)}
                  // onShare={() => handleShare(post.id)}
                /> */}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex r justify-center h-screen">
          <p className="text-center text-gray-500 w-full">
            Không tìm thấy bài viết phù hợp
          </p>
        </div>
      )}
    </div>
  );
};
BlogCard.propTypes = {
  filterPost: PropTypes.array,
};
export default BlogCard;
