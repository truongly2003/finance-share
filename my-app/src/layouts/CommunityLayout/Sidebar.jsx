import { NavLink } from "react-router-dom";
import { FileText, BookOpen } from "lucide-react";
function Sidebar() {
  return (
    <div className="h-full px-4 ">
      {/* Logo */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <NavLink
            to="/"
            className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold text-lg"
          >
            F
          </NavLink>
          <div>
            <h1 className="text-base font-semibold text-gray-900">
              Smart Spending
            </h1>
            <p className="text-sm text-gray-500">Share your insights</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col space-y-3">
        <NavLink
          end
          to="/community/post"
          className={({ isActive }) =>
            `flex items-center px-4 gap-3 py-2 rounded-lg transition-colors ${
              isActive
                ? " text-white bg-purple-500"
                : "hover:bg-purple-100 text-gray-700"
            }`
          }
        >
          <FileText size={18} />
          Posts
        </NavLink>

        <NavLink
          end
          to="/community/post/my-post"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "text-white bg-purple-500"
                : "hover:bg-purple-100 text-gray-700"
            }`
          }
        >
          <BookOpen size={18} /> My Posts
        </NavLink>
      </nav>

      {/* Phần footer nhỏ trong sidebar */}
      <div className="mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Smart Spending
      </div>
    </div>
  );
}

export default Sidebar;
