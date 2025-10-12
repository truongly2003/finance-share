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

  // active comment
  activeCommentId,
  setActiveCommentId,
}) => {
  const [showChildren, setShowChildren] = useState(false);
  const timeFromNow = formatTime(time);
  const initial = userName[0]?.toUpperCase() || "";
  const isChatVisiable = activeCommentId === commentId;
  return (
    <div className="mt-3">
      <div className="flex items-start space-x-2">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm">
          {initial}
        </div>

        <div className="flex-1">
          <div className="bg-gray-100 rounded-2xl px-3 py-2 inline-block">
            <span className="block text-sm font-semibold text-blue-600">
              {userName}
            </span>
            <span className="text-sm text-gray-800">{content}</span>
          </div>

          <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1 ml-1">
            <span>{timeFromNow}</span>
            <button className="hover:underline">Thích</button>
            <button
              className="hover:underline"
              onClick={() =>
                setActiveCommentId(isChatVisiable ? null : commentId)
              }
            >
              Phản hồi
            </button>
          </div>

          {isChatVisiable && (
            <div className="ml-10 mt-2">
              <ChatInput postId={postId} commentId={commentId} />
            </div>
          )}

          {childrenComment.length > 0 && (
            <div className="ml-10 mt-1">
              {!showChildren ? (
                <button
                  onClick={() => setShowChildren(true)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Xem {childrenComment.length} phản hồi
                </button>
              ) : (
                <>
                  {childrenComment.map((child, i) => (
                    <CommentItem
                      key={i}
                      userName={child.userName}
                      time={child.createdAt}
                      content={child.content}
                      childrenComment={child.children}
                      postId={postId}
                      commentId={child.id}
                    />
                  ))}
                  <button
                    onClick={() => setShowChildren(false)}
                    className="text-sm text-blue-600 hover:underline ml-10"
                  >
                    Ẩn phản hồi
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function Comment({ postId, onClose }) {
  const [comments, setComments] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [activeCommentId, setActiveCommentId] = useState(null);

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
      debug: (msg) => console.log("STOMP Debug:", msg),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      client.subscribe(`/topic/comments/${postId}`, (message) => {
        const newComment = JSON.parse(message.body);
        if (newComment && newComment.id) {
          setComments((prev) => {
            newComment.children = newComment.children || [];
            if (newComment.parentCommentId) {
              return prev.map((comment) =>
                comment.id === newComment.parentCommentId
                  ? {
                      ...comment,
                      children: [
                        newComment,
                        ...comment.children.filter(
                          (c) => c.id !== newComment.id
                        ),
                      ],
                    }
                  : comment
              );
            }
            return [newComment, ...prev.filter((c) => c.id !== newComment.id)];
          });
        }
      });
    };

    client.onStompError = (error) => {
      console.error("Lỗi WebSocket:", error);
    };

    client.activate();
    setStompClient(client);
  };

  const disconnectWebSocket = () => {
    if (stompClient) stompClient.deactivate();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
     
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      />

      <div
        className="relative bg-white h-full w-full sm:w-[450px] md:w-[40%] shadow-2xl transform translate-x-0 animate-slide-left flex flex-col"
        style={{ animation: "slideLeft 0.3s ease-out" }}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Bình luận</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Danh sách bình luận */}
        <div className="flex-1 overflow-y-auto p-4">
          {comments.length === 0 ? (
            <p className="text-center text-gray-500 text-sm mt-5">
              Chưa có bình luận nào.
            </p>
          ) : (
            comments.map((item, index) => (
              <CommentItem
                key={index}
                userName={item.userName}
                time={item.createdAt}
                content={item.content}
                commentId={item.id}
                childrenComment={item.children}
                postId={postId}
                activeCommentId={activeCommentId}
                setActiveCommentId={setActiveCommentId}
              />
            ))
          )}
        </div>

        {/* Input bình luận */}
        <div className="p-4 border-t">
          <ChatInput postId={postId} />
        </div>
      </div>

      {/* Hiệu ứng CSS */}
      <style>
        {`
          @keyframes slideLeft {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

Comment.propTypes = {
  onClose: PropTypes.func,
  postId: PropTypes.string,
};

export default Comment;
