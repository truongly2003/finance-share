import { NavLink } from "react-router-dom";
function Header() {
  return (
    <div className=" bg-white ml-8 mr-8">
      <header className="bg-white  p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <NavLink
            to="/"
            className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold"
          >
            F
          </NavLink>
          <h1 className="text-xl font-semibold"></h1>
        </div>
        <div className="space-x-2">
          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive
                ? "bg-purple-600 text-white px-4 py-2 rounded-lg"
                : "border px-4 py-2 rounded-lg "
            }
          >
            Bài viết
          </NavLink>

          <NavLink
            to="/post/create"
            className={({ isActive }) =>
              isActive
                ? "bg-purple-600 text-white px-4 py-2 rounded-lg"
                : " border px-4 py-2 rounded-lg "
            }
          >
            Tạo bài
          </NavLink>

          <NavLink
            to="/my-post"
            className={({ isActive }) =>
              isActive
                ? "bg-purple-600 text-white px-4 py-2 rounded-lg"
                : "border px-4 py-2 rounded-lg "
            }
          >
            Bài viết của tôi
          </NavLink>
        </div>
      </header>
    </div>
  );
}

export default Header;
