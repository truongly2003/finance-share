import useAuth from "@/context/useAuth";
import {
  getAllNotificationByUserId,
  markReadNotification,
  markReadNotificationDetail,
} from "@/services/NotificationService";

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
export default function NotificationDropdown({ onClose }) {
  const { userId } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [read, setRead] = useState(false);
  const navigate = useNavigate();
  const fetchNotifications = useCallback(async () => {
    const res = await getAllNotificationByUserId(userId);
    if (res) {
      setNotifications(res);
    }
  }, [userId]);
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const getIconColor = (type) => {
    switch (type) {
      case "reminder":
        return "bg-yellow-500";
      case "warning":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };
  const getRelativeTime = (createdAt) => {
    const now = new Date(); // Thời gian hiện tại
    const notificationTime = new Date(createdAt); // Chuyển chuỗi ISO thành Date
    const diffMs = now - notificationTime; // Khoảng cách thời gian (ms)

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30); // Giả định 1 tháng = 30 ngày

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
  const handleMarkRead = async () => {
    try {
      await markReadNotification(userId);
      setRead(true);
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleNotificationClick = (notifiaction) => {
    if (notifiaction.link) {
      navigate(`/${notifiaction.link}`);
    }
    onClose();
    try {
      markReadNotificationDetail(notifiaction.id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative">
      {/* Dropdown */}
      <div className="absolute right-0 z-50 w-80 bg-white rounded-lg shadow-xl overflow-hidden transition-opacity duration-300">
        <div>
          <div className="p-3 font-semibold text-gray-700 flex justify-between bg-gray-100 border-b border-gray-200">
            <span>Thông báo</span>
            <button
              className="ml-2 text-sm text-blue-600 hover:underline"
              onClick={handleMarkRead}
            >
              {read ? "Đã xem" : "Đánh dấu đã xem"}
            </button>
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notif, index) => (
                <li
                  key={index}
                  className="flex items-start px-4 py-3 text-gray-800 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleNotificationClick(notif)}
                >
                  <div className="flex items-center w-full">
                    {/* Icon bo tròn với màu động */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full ${getIconColor(
                        notif.type
                      )} flex items-center justify-center mr-3`}
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    {/* Nội dung thông báo */}
                    <div className="flex-1">
                      <p className="text-sm text-orange-400">{notif.title}</p>
                      <p className="text-sm text-gray-800">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {/* {new Date(notif.createdAt).toLocaleString("vi-VN")} */}
                        {getRelativeTime(notif.createdAt)}
                      </p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-gray-500 text-center">
                Không có thông báo mới
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
NotificationDropdown.propTypes = {
  onClose: PropTypes.func,
};
