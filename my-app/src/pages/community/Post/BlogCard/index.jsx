import PropTypes from "prop-types";

import { getPosts } from "@/features/post/postSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Heart, MessageSquareMore, Share2 } from "lucide-react";
import { formatTime } from "@/utils/timeUtils";
import { postApi } from "@/services/community/PostService";
import useAuth from "@/context/useAuth";

const BlogCard = ({ searchTerm, selectedTopic }) => {
  const { posts } = useSelector((state) => state.posts);
  const { userId } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const filterPost = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.userName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTopic =
      selectedTopic === "All" ||
      (Array.isArray(post.topic) &&
        post.topic.some(
          (item) => item.toLowerCase() === selectedTopic.toLowerCase()
        ));

    return matchesSearch && matchesTopic;
  });

  const handleLike = async (postId) => {
    try {
      await postApi.likePost(postId, userId);
      dispatch(getPosts());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-8 mr-8">
      {filterPost.length > 0 ? (
        filterPost.map((post, index) => {
          const timeFromNow = formatTime(post.createdAt);
          const initial = post.userName[0]?.toUpperCase() || "";
          return (
            <div
              key={index}
              className="rounded-2xl shadow-lg overflow-hidden bg-white"
            >
              {/* Header with Image */}
              <div className="relative h-48 ">
                <img
                  src=""
                  className="w-full h-full object-cover border-none"
                />
              </div>

              {/* Author + Content */}
              <div className="p-5">
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
                          className="inline-block bg-gray-300 text-gray-700 text-sm px-3 py-1 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="inline-block bg-gray-300 text-gray-700 text-sm px-3 py-1 rounded-full">
                      No tags
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-4 text-gray-500">
                    <div className="cursor-pointer flex items-center gap-x-2">
                      <span onClick={() => handleLike(post.id)}>
                        <Heart
                          className={`${
                            post.likes.includes(userId)
                              ? "text-red-700 fill-red-700"
                              : ""
                          }`}
                        />
                      </span>
                      {post.likesCount === 0 ? "" : post.likesCount} Like
                    </div>
                    <div
                      className="cursor-pointer flex items-center gap-x-2"
                      onClick={() => {
                        // setSelectedPostId(post.id);
                        // setShowComment(true);
                      }}
                    >
                      <MessageSquareMore />
                      {post.commentCount === 0 ? "" : post.commentCount} Comment
                    </div>
                    <div className="cursor-pointer flex items-center gap-x-2">
                      <Share2 /> Share
                    </div>
                  </div>
                  <div className="text-purple-600 cursor-pointer"></div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <p className="text-center text-gray-500 w-full">
            Không tìm thấy bài viết phù hợp
          </p>
        </div>
      )}
    </div>
  );
};
BlogCard.propTypes = {
  searchTerm: PropTypes.string,
  selectedTopic: PropTypes.string,
};
export default BlogCard;
