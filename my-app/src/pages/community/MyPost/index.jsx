import {
  File,
  Heart,
  MessageCircle,
  Edit,
  Trash2,
  Eye,
  MessageSquareMore,
  Share2,
} from "lucide-react";
import { formatTime } from "@/utils/timeUtils";
import { useEffect, useState, useCallback } from "react";
import { postApi } from "@/services/community/PostService";
import useAuth from "@/context/useAuth";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "@/components/Loading";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import useNotification from "@/context/useNotification";
import PostForm from "../PostForm";

const MyPost = () => {
  const [showFormPost, setShowFormPost] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const { userId } = useAuth();
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { notify } = useNotification();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const response = await postApi.getAllPostByUserId(userId);
      setPost(response);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleDelete = async () => {
    if (!selectedPost) return;
    let res;
    try {
      res = await postApi.deletePost(selectedPost);
      setOpenConfirm(false);
      fetchPost();
    } catch (error) {
      console.error("Lỗi xóa bài viết:", error);
    }
    notify(res.message, "success");
  };

  const summary = posts.reduce(
    (acc, post) => {
      acc.totalPosts += 1;
      acc.totalLikes += post.likesCount || 0;
      acc.totalComments += post.commentCount || 0;
      acc.shares = acc.shares.concat(post.shares || []);
      return acc;
    },
    { totalPosts: 0, totalLikes: 0, totalComments: 0, shares: [] }
  );

  const filterPost = posts
    .filter((post) => {
      const matchesSearch =
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.userName?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "Newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen rounded-lg bg-white border border-gray-200">
      {loading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          {/* Header thống kê */}
          <div className="shadow-sm border-gray-200 p-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-purple-500 mb-3">
                My Post
              </h2>
              <p className="text-gray-600 text-base max-w-2xl mx-auto">
                Manage and track your posts
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="border border-gray-200 p-4 rounded-lg flex justify-center space-x-8 items-center">
                <div className="p-2 rounded-lg">
                  <File />
                </div>
                <div>
                  <div className="text-2xl">{summary.totalPosts}</div>
                  <div>Post</div>
                </div>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg flex justify-center space-x-8 items-center">
                <div className="p-2 rounded-lg">
                  <Heart />
                </div>
                <div>
                  <div className="text-2xl">{summary.totalLikes}</div>
                  <div>Like</div>
                </div>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg flex justify-center space-x-8 items-center">
                <div className="p-2 rounded-lg">
                  <MessageCircle />
                </div>
                <div>
                  <div className="text-2xl">{summary.totalComments}</div>
                  <div>Comment</div>
                </div>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg flex justify-center space-x-8 items-center">
                <div className="p-2 rounded-lg">
                  <Share2 />
                </div>
                <div>
                  <div className="text-2xl">{summary.shares.length}</div>
                  <div>Share</div>
                </div>
              </div>
            </div>
          </div>

          {/* Danh sách bài viết */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white p-4 rounded-lg flex items-center justify-center space-x-2  shadow-md border border-gray-200 mb-4 backdrop-blur-sm bg-opacity-80">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search post..."
                className="flex-1 p-2 rounded-lg w-5/6 border border-gray-300 focus:outline-none focus:ring-2"
              />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="p-2 w-1/6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              >
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
            <div className="space-y-4 mt-6 rounded-lg">
              {filterPost.length > 0 ? (
                filterPost.map((post, index) => {
                  const timeFromNow = formatTime(post.createdAt);
                  return (
                    <div
                      key={index}
                      className="p-4 bg-white border shadow-sm rounded-lg flex items-center justify-between"
                    >
                      {/* Nội dung bài viết */}
                      <div className="flex-1">
                        <div className="text-center content-center">
                          <h3 className="text-2xl font-bold text-gray-800 px-4">
                            {posts.topic}
                          </h3>
                        </div>

                        <div className="p-2 flex">
                          <div>
                            <div className="flex justify-between">
                              <p className="text-xs text-gray-500">
                                {timeFromNow}
                              </p>
                            </div>

                            <div>
                              <h3 className="text-base font-semibold">
                                {post.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                {post.content}
                              </p>
                            </div>
                          </div>
                          {/* Hành động */}
                          <div className="flex flex-col items-center space-y-3 text-gray-600 ml-4">
                            <div
                              onClick={() => {
                                setEditingPost(post);
                                setShowFormPost(true);
                              }}
                              className="p-2 rounded-lg bg-[#EEF2FF] flex justify-center items-center cursor-pointer hover:bg-indigo-100 transition"
                            >
                              <Edit size={15} />
                            </div>
                            <div
                              onClick={() => {
                                setSelectedPost(post.id);
                                setOpenConfirm(true);
                              }}
                              className="p-2 rounded-lg bg-[#EEF2FF] flex justify-center items-center cursor-pointer hover:bg-red-100 transition"
                            >
                              <Trash2 size={15} />
                            </div>
                            <div
                              onClick={() => {
                                navigate(
                                  `/community/post/detail-post/${post.id}`,
                                  {
                                    state: { post },
                                  }
                                );
                              }}
                              className="p-2 rounded-lg bg-[#EEF2FF] flex justify-center items-center cursor-pointer hover:bg-green-100 transition"
                            >
                              <Eye size={15} />
                            </div>
                          </div>
                          {/* Topic + icon */}
                        </div>
                        <div className="flex justify-between items-center py-2 border-t border-gray-100 mt-2 pt-2">
                          {post.topic && post.topic.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {post.topic.map((item, index) => (
                                <span
                                  key={index}
                                  className="inline-block bg-gray-200 text-blue-700 text-xs px-3 py-1 rounded-full"
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

                          <div className="flex space-x-4">
                            <div className="flex items-center text-gray-700 text-xs">
                              <Heart className="w-4 h-4 mr-1 " />
                              {post.likesCount}
                            </div>
                            <div className="flex items-center text-gray-700 text-xs">
                              <MessageSquareMore className="w-4 h-4 mr-1 " />
                              {post.commentCount}
                            </div>
                            <div className="flex items-center text-gray-700 text-xs">
                              <Share2 className="w-4 h-4 mr-1 " />
                              {post.shares.length}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                  <div className="text-gray-400 text-6xl mb-4">📭</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No posts yet
                  </h3>
                  <p className="text-gray-500">Start sharing your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showFormPost && (
        <PostForm
          onClose={() => {
            setShowFormPost(false);
          }}
          initialPost={editingPost}
        />
      )}

      <ConfirmDeleteModal
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this post?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </div>
  );
};

export default MyPost;
