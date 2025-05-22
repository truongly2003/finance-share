import { useState } from "react";

function HomeCommunity() {
  const [searchTerm, setSearchTerm] = useState("");

  const posts = [
    {
      id: 1,
      author: "John Smith",
      title: "Financial Management Tips",
      role: "Financial Advisor",
      date: "January 8, 2024",
      readTime: "5 min read",
      content:
        "Managing your finances effectively requires careful planning and discipline. Here are some key strategies that can help you achieve your financial goals.",
      likes: 42,
      comments: 2,
    },
    {
      id: 2,
      author: "Sarah Johnson",
      title: "Top 5 Investment Strategies for 2025",
      role: "Investment Analyst",
      date: "March 15, 2025",
      readTime: "7 min read",
      content:
        "Investing in 2025 requires a strategic approach. Here are the top five strategies to maximize your returns this year.",
      likes: 78,
      comments: 5,
    },
    {
      id: 3,
      author: "Michael Lee",
      title: "How to Save for Retirement Early",
      role: "Retirement Planner",
      date: "April 10, 2025",
      readTime: "4 min read",
      content:
        "Starting early is key to a comfortable retirement. Learn the best ways to save and plan for your future.",
      likes: 23,
      comments: 1,
    },
    {
      id: 4,
      author: "Emily Davis",
      title: "Budgeting Tips for Beginners",
      role: "Personal Finance Coach",
      date: "May 1, 2025",
      readTime: "6 min read",
      content:
        "New to budgeting? These simple tips will help you manage your money and reach your financial goals.",
      likes: 56,
      comments: 3,
    },
  ];

  const trendingTopics = ["Finance", "Investment", "Retirement", "Budgeting","Other"];

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Posts Section */}
      <div className="flex-1 p-4 space-y-6 md:pr-[21rem] pr-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-gray-800 ">
            Community Posts
          </h1>
          <button>Create New Post</button>
        </div>
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div>
                <div className="text-purple-600 font-semibold">
                  {post.author}
                </div>
                <div className="text-gray-500 text-sm">{post.role}</div>
              </div>
            </div>
            <div className="text-gray-600 mt-2">
              <div className="text-sm text-gray-400">
                {post.date} • {post.readTime}
              </div>
              <h3 className="text-lg font-bold mt-2">{post.title}</h3>
              <p className="mt-2">{post.content}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-4 text-gray-500">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
              <div className="text-purple-600 cursor-pointer">🔊</div>
            </div>
          </div>
        ))}
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
    </div>
  );
}

export default HomeCommunity;
