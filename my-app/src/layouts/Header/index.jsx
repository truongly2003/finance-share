import { ChevronDown, ChevronUp, BellRing, User, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "@/context/useAuth";
import NotificationDropdown from "@/components/NotificationDropdown";
import { notificationApi } from "@/services/notify/NotificationService";
import avatar from "@assets/avatar_1.jpg";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Header = () => {
  const { userId, userName } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShowNotifications, setIsShowNotifications] = useState(true);
  const stompClientRef = useRef(null);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    if (!userId) return;
    const res = await notificationApi.getAllNotificationByUserId(userId);
    if (res) setNotifications(res);
  };

  const connectWebSocket = () => {
    if (!userId || stompClientRef.current) return;
    const socket = new SockJS("http://localhost:2003/notification-service/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (msg) => console.log("STOMP Debug:", msg),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      client.subscribe(`/topic/notifications/${userId}`, (message) => {
        const newNotify = JSON.parse(message.body);
        setNotifications((prev) => {
          // Tìm thông báo cùng link và cùng type (cùng loại hành động)
          const existsIndex = prev.findIndex(
            (n) => n.link === newNotify.link && n.type === newNotify.type 
          );

          if (existsIndex !== -1) {
            // Nếu có rồi (ví dụ: A bình luận rồi, giờ B bình luận)
            // → thay thế thông báo cũ bằng cái mới từ backend (vì backend đã merge text như "A và 1 người khác...")
            const updated = [...prev];
            updated[existsIndex] = newNotify;
            return updated;
          } else {
            // Nếu chưa có → thêm mới lên đầu danh sách
            return [newNotify, ...prev];
          }
        });
      });
    };
    client.activate();
    stompClientRef.current = client;
  };
  const disconnectWebSocket = () => {
    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
      stompClientRef.current = null;
    }
  };

  useEffect(() => {
    if (!userId) return;

    fetchNotifications();
    connectWebSocket();

    return () => disconnectWebSocket();
  }, [userId]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const totalNotifications = notifications.length;

  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="flex justify-between items-center  bg-white ml-8 mr-8 w-full ">
      <div className=" font-bold w-64">
        <div>
          <h1 className="text-xl font-bold text-gray-800">MoneyShare</h1>
          <p className="text-xs text-gray-500">Quản lý & Chia sẻ</p>
        </div>
      </div>
      <div className="space-x-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive
                ? " text-purple-500"
                : "hover:text-gray-700 text-gray-700"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/community/post"
          className={({ isActive }) =>
            `${
              isActive
                ? " text-purple-500"
                : "hover:text-gray-700 text-gray-700"
            }`
          }
        >
          Blog
        </NavLink>
        <NavLink
          to="/finance"
          className={({ isActive }) =>
            ` ${
              isActive
                ? " text-purple-500"
                : "hover:text-gray-700 text-gray-700"
            }`
          }
        >
          Finance
        </NavLink>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            ` ${
              isActive
                ? " text-purple-500"
                : "hover:text-gray-700 text-gray-700"
            }`
          }
        >
          About us
        </NavLink>
      </div>
      <nav className="flex items-center gap-8">
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
                  className="relative  rounded-md hover:text-gray-700 text-gray-700 mt-[10px]  px-4"
                >
                  <BellRing size={22} />
                  {totalNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                      {totalNotifications > 9 ? "9+" : totalNotifications}
                    </span>
                  )}
                </button>
                {isShowNotifications && (
                  <div className="absolute right-0  w-64 bg-white  rounded-md shadow-lg transition-all duration-200">
                    <NotificationDropdown
                      notifications={notifications}
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
                  <span className="hover:text-gray-700 text-gray-700">
                    {userName}
                  </span>
                  <span className="hover:text-gray-700 text-gray-700">
                    {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                  </span>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                    <ul className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 space-x-4 py-3 hover:bg-purple-50 cursor-pointer transition-colors text-gray-700 hover:text-purple-600"
                      >
                        <User />
                        <span> Profile</span>
                      </Link>
                      <li
                        className="flex items-center space-x-4 px-4 py-3 hover:bg-red-50 cursor-pointer transition-colors text-gray-700 hover:text-red-600 border-t border-gray-100"
                        onClick={logout}
                      >
                        <LogOut />
                        <span> Log out</span>
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
            Đăng nhập
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
