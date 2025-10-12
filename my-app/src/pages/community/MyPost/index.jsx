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
const MyPost = () => {
  const { userId } = useAuth();
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Mới nhất");

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

  const summary = posts.reduce(
    (acc, post) => {
      acc.totalPosts += 1;
      acc.totalLikes += post.likesCount || 0;
      acc.totalComments += post.commentCount || 0;
      return acc;
    },
    { totalPosts: 0, totalLikes: 0, totalComments: 0 }
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
      if (sortOrder === "Mới nhất") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  if (loading)
  return (
    <LoadingSpinner/>
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="  p-6 ml-8 mr-8">
      <h2 className="text-2xl font-bold mb-4">Bài viết đã đăng</h2>
      <div className="text-sm text-gray-600 mb-6">
        Quản lý và theo dõi bài viết của bạn
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg  flex justify-center space-x-8 items-center">
          <div className="p-2 rounded-lg bg-[#EEF2FF]">
            <File />
          </div>
          <div>
            <div className="text-2xl">{summary.totalPosts}</div>
            <div className="">Tổng bài viết</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg  flex justify-center space-x-8 items-center">
          <div className="p-2 rounded-lg bg-[#ECFDF5]">
            <Heart />
          </div>
          <div>
            <div className="text-2xl">{summary.totalLikes}</div>
            <div className="">Lượt thích</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg  flex justify-center space-x-8 items-center">
          <div className="p-2 rounded-lg bg-[#FEF3C7]">
            <MessageCircle />
          </div>
          <div>
            <div className="text-2xl">{summary.totalComments}</div>
            <div className="">Bình luận</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg  flex justify-center space-x-8 items-center">
          <div className="p-2 rounded-lg bg-[#FEF2F2]">
            <Share2 />
          </div>
          <div>
            <div className="text-2xl">{summary.totalComments}</div>
            <div className="">Bình luận</div>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg flex items-center justify-center space-x-2">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Tìm kiếm bài viết..."
          className="flex-1 p-2 rounded-lg w-5/6 border border-gray-300 focus:outline-none focus:ring-2 "
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 "
        >
          <option>Mới nhất</option>
          <option>Cũ nhất</option>
        </select>
      </div>

      <div className="space-y-4 mt-6  rounded-lg">
        {filterPost.length > 0 ? (
          filterPost.map((post, index) => {
            const timeFromNow = formatTime(post.createdAt);
            const initial = post.userName[0]?.toUpperCase() || "";
            return (
              <div
                key={index}
                className=" p-4 bg-white rounded-lg flex items-center justify-between"
              >
                <div>
                  <div className=" text-center  content-center ">
                    <h3 className="text-2xl font-bold  text-gray-800 px-4">
                      {posts.topic}
                    </h3>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                          {initial}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{post.userName}</p>
                          <p className="text-xs text-gray-500">{timeFromNow}</p>
                        </div>
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
                    </div>
                    {/* action post */}
                    <div className=" flex space-x-2 rounded-lg p-1">
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
                </div>
                {/* action post delete, edit, view */}
                <div className="flex flex-col items-center  space-y-3 text-gray-600">
                  <div className="p-2 rounded-lg bg-[#EEF2FF] flex justify-center items-center">
                    <button className="hover:text-blue-600 transition">
                      <Edit size={20} />
                    </button>
                  </div>
                  <div className="p-2 rounded-lg bg-[#EEF2FF] flex justify-center items-center">
                    <button className="hover:text-red-600 transition">
                      <Trash2 size={20} />
                    </button>
                  </div>{" "}
                  <div
                    onClick={() => {
                      navigate(`/community/detail-post/${post.id}`, {
                        state: { post },
                      });
                    }}
                    className="p-2 rounded-lg bg-[#EEF2FF] flex justify-center items-center"
                  >
                    <button className="hover:text-green-600 transition">
                      <Eye size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div> bạn chưa có bài viết nào</div>
        )}
      </div>
    </div>
  );
};

export default MyPost;
