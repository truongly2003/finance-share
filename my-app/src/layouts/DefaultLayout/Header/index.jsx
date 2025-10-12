import { ChevronDown, ChevronUp, BellRing } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "@/context/useAuth";
import NotificationDropdown from "@/components/NotificationDropdown";
import avatar from "@assets/avatar_1.jpg";
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShowNotifications, setIsShowNotifications] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="flex justify-between items-center p-4  bg-white ml-8 mr-8 ">
      <div className=" font-bold">
        <Link to="/">
          <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold">
            F
          </div>
        </Link>
      </div>
      <nav className="flex items-center gap-8">
        <Link to="/transaction">Giao dịch</Link>
        <Link to="/community">Bài viết</Link>
        <Link>Về chúng tôi</Link>
        {isAuthenticated() ? (
          <div>
            <div className="flex items-center space-x-4 cursor-pointer">
              {/* notify */}
              <div
                className="relative "

                // onMouseLeave={() => setIsShowNotifications(false)}
              >
                <button
                  onClick={() => setIsShowNotifications(!isShowNotifications)}
                  className="relative  rounded-md text-purple-500 mt-[10px]  px-4"
                >
                  <BellRing size={22} />
                </button>
                {isShowNotifications && (
                  <div className="absolute right-0  w-64 bg-white  rounded-md shadow-lg transition-all duration-200">
                    <NotificationDropdown
                      onClose={() => setIsShowNotifications(false)}
                    />
                  </div>
                )}
              </div>
              {/* user */}
              <div className="relative">
                <div
                  className="flex space-x-2 items-center"
                  onClick={toggleDropdown}
                >
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full border"
                  />
                  <span className="text-purple-500 font-medium">Hello</span>
                  <span className="text-purple-500 text-sm">
                    {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                  </span>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <ul className="py-2">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={logout}
                      >
                        Log out
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-purple-500 tex-[#333] px-5 py-2 rounded-full text-base "
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
