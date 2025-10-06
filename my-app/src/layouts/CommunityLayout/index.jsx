import PropTypes from "prop-types";

function CommunityLayout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen p=2 ">
      <div className="sticky top-0 z-20 bg-white ">
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold">
              B
            </div>
            <h1 className="text-xl font-semibold">BlogHub</h1>
          </div>
          <div className="space-x-2">
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
              Tạo bài
            </button>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
              Bài viết của tôi
            </button>
          </div>
        </header>
      </div>
      <div className="w-full p-4">
        <div className="flex-1  ">{children}</div>
      </div>
    </div>
  );
}
CommunityLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default CommunityLayout;
