import { notificationApi } from "@/services/notify/NotificationService";

// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  MessageCircle,
  Reply,
  Heart,
  Wallet,
  PiggyBank,
  Bell,
  MoreHorizontal,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MenuNotification from "./MenuNotification";
export default function NotificationDropdown({ notifications, onClose }) {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef();
  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, []);

  const navigate = useNavigate();
  const getNotificationStyle = (type) => {
    switch (type) {
      case "reply":
        return {
          icon: <Reply className="w-5 h-5 text-white" />,
          color: "bg-gradient-to-br from-yellow-400 to-orange-500",
        };
      case "post":
        return {
          icon: <MessageCircle className="w-5 h-5 text-white" />,
          color: "bg-gradient-to-br from-red-400 to-red-600",
        };
      case "like":
        return {
          icon: <Heart className="w-5 h-5 text-white" />,
          color: "bg-gradient-to-br from-pink-400 to-rose-600",
        };
      case "transaction":
        return {
          icon: <Wallet className="w-5 h-5 text-white" />,
          color: "bg-gradient-to-br from-green-400 to-emerald-600",
        };
      case "budget":
        return {
          icon: <PiggyBank className="w-5 h-5 text-white" />,
          color: "bg-gradient-to-br from-purple-400 to-indigo-600",
        };
      default:
        return {
          icon: <Bell className="w-5 h-5 text-white" />,
          color: "bg-gradient-to-br from-blue-400 to-blue-600",
        };
    }
  };

  const getRelativeTime = (createdAt) => {
    const now = new Date();
    const notificationTime = new Date(createdAt);
    const diffMs = now - notificationTime;

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffMonths > 0) {
      return `${diffMonths} tháng trước`;
    } else if (diffDays > 0) {
      return `${diffDays} ngày trước`;
    } else if (diffHours > 0) {
      return `${diffHours} giờ trước`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} phút trước`;
    } else if (diffSeconds > 0) {
      return `${diffSeconds} giây trước`;
    } else {
      return "Vừa xong";
    }
  };

  const handleNotificationClick = (notifiaction) => {
    if (notifiaction.link) {
      navigate(`${notifiaction.link}`);
    }
    onClose();
    try {
      notificationApi.markReadNotificationDetail(notifiaction.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <div className="absolute right-0 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="px-5 py-4 bg-purple-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <h3 className="font-semibold text-white text-lg">Notification</h3>
              {notifications.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-medium bg-white/20 text-white rounded-full">
                  {notifications.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Danh sách thông báo */}
        <ul className="max-h-96  overflow-y-hidden">
          {notifications.length > 0 ? (
            notifications.map((notif, index) => {
              const { icon, color } = getNotificationStyle(notif.type);
              return (
                <li
                  key={index}
                  className="group relative px-5 py-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/30 cursor-pointer border-b border-gray-100 last:border-b-0 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    
                    <div
                      className={`flex-shrink-0 w-11 h-11 rounded-xl 
                       flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200
                       ${color}
                       `}
                    >
                      {icon}
                    </div>

                    {/* Nội dung thông báo */}
                    <div
                      onClick={() => handleNotificationClick(notif)}
                      className="flex-1 min-w-0"
                    >
                      <div className="grid grid-cols-[auto_1fr] gap-x-1 items-start">
                        <span className=" text-gray-700 leading-relaxed line-clamp-3">
                          <span className="font-semibold">
                            {notif.actorName}
                          </span>{" "}
                          {notif.message}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        <p className="text-xs text-gray-500 font-medium">
                          {getRelativeTime(notif.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10" ref={menuRef}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          setActiveMenuId(
                            activeMenuId === notif.id ? null : notif.id
                          );
                        }}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                      >
                        <MoreHorizontal size={20} />
                      </button>
                      {activeMenuId === notif.id && (
                        <MenuNotification
                          notificationId={notif.id}
                          onClose={() => setActiveMenuId(null)}
                        />
                      )}
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">
                Không có thông báo mới
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Bạn đã xem tất cả thông báo
              </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

NotificationDropdown.propTypes = {
  onClose: PropTypes.func,
  notifications: PropTypes.array,
};
