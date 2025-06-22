/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { commentApi } from "@/services/community/CommentService";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import PropTypes from "prop-types";
import ChatInput from "./ChatInput";
import { formatTime } from "@/utils/timeUtils";

const CommentItem = ({
  userName,
  time,
  content,
  childrenComment = [],
  postId,
  commentId,
}) => {
  const timeFromNow = formatTime(time)
  const [showChildren, setShowChildren] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const handleViewAllComments = () => {
    setShowChildren(!showChildren);
  };

  const initial = userName[0]?.toUpperCase() || "";
  return (
    <div className="flex items-start space-x-2 p-2 max-w-xl">
      <div className="w-8 h-8 rounded-full border flex items-center justify-center  font-semibold">
        {initial}
      </div>
      <div>
        <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-xs">
          <p className="font-semibold text-sm">{userName}</p>
          <p className="text-sm">{content}</p>
        </div>

        {/* Thời gian, thích, trả lời */}
        <div className="flex space-x-3 text-xs text-gray-500 mt-1 ml-1">
          <span>{timeFromNow}</span>
          <span className="cursor-pointer hover:underline">Thích</span>
          <span
            className="cursor-pointer hover:underline"
            onClick={() => setShowChat(true)}
          >
            Trả lời
          </span>
          {showChat && (
            <div className="ml-10">
              <ChatInput postId={postId} commentId={commentId} />
            </div>
          )}
        </div>

        {childrenComment.length > 0 && (
          <div className="text-xs text-gray-500 mt-1 ml-1">
            <button className="hover:underline" onClick={handleViewAllComments}>
              {!showChildren
                ? `View all ${childrenComment.length} comments`
                : `hide ${childrenComment.length} comments`}
            </button>
          </div>
        )}

        {/* Render child comments */}
        {showChildren && childrenComment.length > 0 && (
          <div className="ml-10 mt-2">
            {childrenComment.map((child, index) => (
              <CommentItem
                key={index}
                userName={child.userName || "giao su"}
                time={child.createdAt}
                content={child.content}
                commentId={child.id}
                childrenComment={child.children}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function Comment({ postId, onClose }) {
  const [comments, setComments] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await commentApi.getAllCommentByPostId(postId);
      setComments(response || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
    connectWebSocket();
    return () => disconnectWebSocket();
  }, [postId]);

  const connectWebSocket = () => {
    const socket = new SockJS("http://localhost:8082/community-service/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (msg) => console.log("STOMP Debug:", msg), // Debug chi tiết
      reconnectDelay: 5000, // Tự động thử lại sau 5 giây nếu mất kết nối
    });

    client.onConnect = () => {
      console.log("Đã kết nối WebSocket");
      client.subscribe(`/topic/comments/${postId}`, (message) => {
        const newComment = JSON.parse(message.body);
        if (newComment && newComment.id) {
          setComments((prev) => {
            newComment.children = newComment.children || [];
            if (newComment.parentCommentId) {
              return prev.map((comment) =>
                comment.id === newComment.parentCommentId
                  ? { ...comment, children: [newComment, ...comment.children.filter(c=>c.id!==newComment.id)] }
                  : comment
              );
            }
            return [newComment, ...prev.filter((c) => c.id !== newComment.id)];
          });
        }
      });
    };

    client.onStompError = (error) => {
      console.error("Lỗi kết nối WebSocket:", error);
    };

    client.activate(); // Kích hoạt kết nối
    setStompClient(client);
  };
  //
  const disconnectWebSocket = () => {
    if (stompClient) {
      stompClient.deactivate(() => console.log("Đã ngắt kết nối WebSocket"));
    }
  };

  // render
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative">
        <div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <h2 className="text-lg font-semibold mb-4">Comments</h2>
          <div className="max-h-96 overflow-y-auto">
            {comments.map((item, index) => {
              return (
                <CommentItem
                  key={index}
                  userName={item.userName || "giao su"}
                  time={item.createdAt}
                  content={item.content}
                  commentId={item.id}
                  childrenComment={item.children}
                  postId={postId}
                />
              );
            })}
          </div>
        </div>
        <ChatInput postId={postId} />
      </div>
    </div>
  );
}
Comment.propTypes = {
  onClose: PropTypes.func,
  postId: PropTypes.string,
};
export default Comment;
