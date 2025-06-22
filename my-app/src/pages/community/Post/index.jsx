import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, updatePostLikes } from "@/features/post/postSlice";
import PostForm from "@/components/PostForm";
import { Heart, MessageSquareMore, Share2, Volume2 } from "lucide-react";
import Comment from "../Comment";
import { formatTime } from "@/utils/timeUtils";
import useAuth from "@/context/useAuth";
import { postApi } from "@/services/community/PostService";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
function Post() {
  const { userId } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
 
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const trendingTopics = [
    "Finance",
    "Investment",
    "Retirement",
    "Budgeting",
    "Other",
  ];
  const handleLike = async (postId) => {
    try {
      await postApi.likePost(postId, userId);
    } catch (error) {
      console.error(error);
    }
  };
 useEffect(() => {
    const socket = new SockJS("http://localhost:8082/community-service/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (msg) => console.log("STOMP Debug:", msg),
    });

    const subscriptions = [];

    client.onConnect = () => {
      console.log("Đã kết nối WebSocket");
      posts.forEach((post) => {
        const subscription = client.subscribe(
          `/topic/post/likes/${post.id}`,
          (message) => {
            const likesCount = JSON.parse(message.body);
            console.log(`Likes count for post ${post.id}:`, likesCount);
            dispatch(updatePostLikes({postId: post.id,likesCount}))
          }
        );
        subscriptions.push(subscription);
      });
    };

    client.onStompError = (error) => {
      console.error("Lỗi kết nối WebSocket:", error);
    };

    client.activate();

    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
      client.deactivate().then(() => console.log("Đã ngắt kết nối WebSocket"));
    };
  }, [posts,dispatch]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Posts Section */}
      <div className="flex-1 p-4 space-y-6 md:pr-[21rem] pr-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-gray-800 ">Community Posts</h1>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            onClick={() => setShowForm(true)}
          >
            Create New Post
          </button>
        </div>
        {filteredPosts.map((post, index) => {
          const timeFromNow = formatTime(post.createdAt);
          const initial = post.userName[0]?.toUpperCase() || "";
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full border flex items-center justify-center  font-semibold">
                  {initial}
                </div>
                <div>
                  <div className="text-purple-600 font-semibold">
                    {post.userName}
                  </div>
                  <div className="text-sm text-gray-400">{timeFromNow}</div>
                </div>
              </div>
              <div className="text-gray-600 mt-4">
                <h3 className="text-lg font-bold mt-2">{post.title}</h3>
                <p className="mt-2">{post.content}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-4 text-gray-500">
                  <div className="cursor-pointer flex items-center gap-x-2">
                    <span onClick={() => handleLike(post.id)}>
                      <Heart
                        className={`${
                          post.likesCount !== 0
                            ? "text-red-700 fill-red-700"
                            : ""
                        }`}
                      />
                    </span>
                    {post.likesCount === 0 ? "" : post.likesCount}
                  </div>
                  <div
                    className="cursor-pointer flex items-center gap-x-2"
                    onClick={() => {
                      setSelectedPostId(post.id);
                      setShowComment(true);
                    }}
                  >
                    <MessageSquareMore />
                    {post.commentCount === 0 ? "" : post.commentCount}
                  </div>
                  <span>
                    <Share2 />
                  </span>
                </div>
                <div className="text-purple-600 cursor-pointer">
                  <Volume2 />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Right Sidebar: Search and Trending Topics */}
      <div className="hidden md:block w-80 p-4 mt-24 bg-white shadow-md rounded-lg h-screen overflow-y-auto fixed top-0 right-4 z-10">
        {/* Search Bar */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Tìm kiếm</h2>
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search community posts"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-200"
          />
        </div>
        {/* Trending Topics */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Chủ đề hot
          </h2>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic, index) => (
              <button
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 hover:text-purple-800 transition duration-200"
                aria-label={`Filter by ${topic}`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
      {showForm && <PostForm onClose={() => setShowForm(false)} />}
      {showComment && (
        <Comment
          postId={selectedPostId}
          onClose={() => {
            setShowComment(false);
            setSelectedPostId(null);
          }}
        />
      )}
    </div>
  );
}

export default Post;
