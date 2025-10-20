import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import { postApi } from "@/services/community/PostService";

const ModalShares = ({ onClose, id }) => {
  const [shareUsers, setShareUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShare = async () => {
      try {
        let response;
        await new Promise((resolve) => setTimeout(resolve, 2000));

        response = await postApi.getSharePost(id);

        setShareUsers(response || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách like:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShare();
  }, [id]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[400px] h-[400px] relative flex flex-col animate-fadeIn">
        {/* Nút đóng */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X />
        </button>

        <h3 className="text-lg font-semibold text-center mt-4 mb-2">
          Người dùng chia sẻ bài viết
        </h3>
        <div className="mx-auto mt-2 w-full border-b border-gray-300"></div>

        {/* Nội dung */}
        {loading ? (
          <p className="text-gray-500 text-center mt-8 text-sm">
            ⏳ Đang tải danh sách...
          </p>
        ) : (
          <div
            className="flex-1 overflow-y-auto px-4 pb-4"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#d1d5db #f3f4f6",
            }}
          >
            {shareUsers.length > 0 ? (
              shareUsers.map((user, index) => (
                <div
                  key={index}
                  className="py-2 border-b border-gray-200 flex items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {user[0]?.toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-700">{user}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-8 text-sm">
                Chưa có ai thích bài viết này
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ModalShares.propTypes = {
  onClose: PropTypes.func,
  id: PropTypes.string,
};

export default ModalShares;
