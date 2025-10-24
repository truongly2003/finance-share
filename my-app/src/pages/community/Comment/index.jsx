/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { commentApi } from "@/services/community/CommentService";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import PropTypes from "prop-types";
import ChatInput from "./ChatInput";
import { formatTime } from "@/utils/timeUtils";
import useAuth from "@/context/useAuth";
import { postApi } from "@/services/community/PostService";
import ModalLikes from "../Post/Likes/ModalLikes";
import useNotification from "@/context/useNotification";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

// từng cái comment
const CommentItem = ({
  userName,
  time,
  content,
  childrenComment = [],
  postId,
  commentId,
  commentUserId,
  likes,
  // active comment
  activeCommentId,
  setActiveCommentId,
}) => {
  const [showChildren, setShowChildren] = useState(false);
  const timeFromNow = formatTime(time);
  const initial = userName[0]?.toUpperCase() || "";
  const isChatVisiable = activeCommentId === commentId;

  const [showMenu, setShowMenu] = useState(false);
  const { userId } = useAuth();
  const [localLikes, setLocalLikes] = useState(likes || []);
  const [showLikesModal, setShowLikesModal] = useState(false);

  // like comment
  const handleLike = async (a_commentId, b_userId) => {
    try {
      await postApi.likeComment(a_commentId, b_userId);
      setLocalLikes((prev) => {
        if (prev.includes(b_userId)) {
          return prev.filter((id) => id !== b_userId);
        } else {
          return [...prev, b_userId];
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  // xóa comment
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const { notify } = useNotification();
  const handleDeleteComment = async () => {
    let res;
    try {
      res = await commentApi.deleteComment(selectedComment);
      setOpenConfirm(false);
    } catch (error) {
      console.log(error);
    }
    notify(res.message, "success");
    setShowMenu(false);
  };
  return (
    <div className="mt-3">
      <div className="flex items-start space-x-2">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm">
          {initial}
        </div>

        <div className="">
          <div className="bg-gray-100 rounded-2xl px-3 py-2 flex justify-between">
            <div>
              <span className="block text-sm font-semibold text-blue-600">
                {userName}
              </span>
              <span className="text-sm text-gray-800">{content}</span>
            </div>
            {/* start menu comment delete, edit */}
            <div>
              {commentUserId === userId && (
                <div className="relative">
                  <button
                    onClick={() => setShowMenu((prev) => !prev)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    ...
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 mt-1 bg-white border rounded-md shadow-md z-50 w-28">
                      <button
                        className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100"
                        onClick={() => {
                          alert("Chỉnh sửa:", commentId);
                          // TODO: Gọi hàm mở chế độ chỉnh sửa
                        }}
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        className="w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-gray-100"
                        onClick={() => {
                          // alert("Xóa:", commentId);
                          // TODO: Gọi API xóa comment
                          setSelectedComment(commentId);
                          setOpenConfirm(true);
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* end menu comment delete, edit */}
          </div>
          {/* start reply */}
          <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1 ml-1">
            <span>{timeFromNow}</span>
            <div className=" space-x-2">
              <div className="cursor-pointer flex items-center gap-x-2">
                <span
                  onClick={() => handleLike(commentId, userId)}
                  className={`${
                    localLikes.includes(userId)
                      ? "text-red-700 fill-red-700"
                      : ""
                  }`}
                >
                  Thích
                </span>
                <span onClick={() => setShowLikesModal(true)}>
                  {localLikes?.length > 0 ? localLikes.length : 0}
                </span>
              </div>
            </div>
            <button
              className="hover:underline"
              onClick={() => {
                setActiveCommentId(isChatVisiable ? null : commentId);
                setShowChildren(true);
              }}
            >
              Phản hồi
            </button>
          </div>
          {/* end reply */}

          {/* show chat */}
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
                      activeCommentId={activeCommentId}
                      setActiveCommentId={setActiveCommentId}
                      commentUserId={child.userId}
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

      {showLikesModal && (
        <ModalLikes
          id={commentId}
          type="comment"
          show={showLikesModal}
          onClose={() => setShowLikesModal(false)}
        />
      )}

      <ConfirmDeleteModal
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDeleteComment}
        title="Xác nhận xóa bình luận"
        description={`Bạn có chắc muốn xóa bình luận này không?`}
        confirmLabel="Xóa"
        cancelLabel="Hủy"
      />
    </div>
  );
};
//  giao diện comment
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
  //  hàm đệ quy hiện comment
  const addReplyRecursive = (comments, newComment) => {
    return comments.map((comment) => {
      if (comment.id === newComment.parentCommentId) {
        return {
          ...comment,
          children: [
            newComment,
            ...(comment.children || []).filter((c) => c.id !== newComment.id),
          ],
        };
      }
      if (comment.children && comment.children.length > 0) {
        return {
          ...comment,
          children: addReplyRecursive(comment.children, newComment),
        };
      }

      return comment;
    });
  };
  const connectWebSocket = () => {
    const socket = new SockJS("http://localhost:2001/community-service/ws");
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
              return addReplyRecursive(prev, newComment);
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
  const countAllComments = (comments) => {
    return comments.reduce((total, commet) => {
      const childCount = commet.children
        ? countAllComments(commet.children)
        : 0;
      return total + 1 + childCount;
    }, 0);
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
          <h2 className="text-lg font-semibold text-gray-800 tracking-wide flex items-center gap-2">
            <span>Comment ({countAllComments(comments)})</span>
          </h2>
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
              No comments yet.
            </p>
          ) : (
            comments.map((item, index) => (
              <CommentItem
                key={index}
                userName={item.userName}
                time={item.createdAt}
                content={item.content}
                likes={item.likes}
                commentId={item.id}
                childrenComment={item.children}
                postId={postId}
                commentUserId={item.userId}
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
