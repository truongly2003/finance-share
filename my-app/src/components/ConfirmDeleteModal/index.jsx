import PropTypes from "prop-types";
import { useState, useEffect } from "react";
// ConfirmDeleteModal.jsx
// Props:
// - isOpen (bool): hiển thị modal
// - onClose () => void: đóng modal
// - onConfirm () => Promise|void: hành động khi xác nhận
// - title (string): tiêu đề (mặc định: "Bạn có chắc muốn xóa?")
// - description (string): mô tả nhỏ
// - confirmLabel (string): nhãn nút xác nhận (mặc định: "Xóa")
// - cancelLabel (string): nhãn nút hủy (mặc định: "Hủy")
// - loading (bool): trạng thái đang xử lý (nếu onConfirm trả về Promise, component sẽ tự set loading nếu trả về Promise)
// - danger (bool): nếu true, dùng màu cảnh báo cho nút xác nhận

export default function ConfirmDeleteModal({
  isOpen = false,
  onClose = () => {},
  onConfirm = () => {},
  title = "Bạn có chắc muốn xóa?",
  description = "Hành động này không thể hoàn tác.",
  confirmLabel = "Xóa",
  cancelLabel = "Hủy",
  loading: externalLoading = false,
  danger = true,
}) {
  const [loading, setLoading] = useState(false);

  // Nếu parent truyền loading ngoài, ưu tiên hiển thị
  useEffect(() => {
    setLoading(Boolean(externalLoading));
  }, [externalLoading]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      // nếu parent không quản lý loading, tự set
      if (!externalLoading) setLoading(true);
      const res = onConfirm();
      if (res && typeof res.then === "function") await res;
    } catch (err) {
      // swallow - parent có thể hiện lỗi
      console.error(err);
    } finally {
      if (!externalLoading) setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-title"
        className="relative w-[min(92%,540px)] mx-4 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 p-6 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="confirm-delete-title" className="text-lg font-semibold">
          {title}
        </h3>

        <p className="mt-2 text-sm text-gray-600">{description}</p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50"
            disabled={loading}
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center justify-center disabled:opacity-60 ${
              danger
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <svg
                className="w-4 h-4 animate-spin mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : null}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmDeleteModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  loading: PropTypes.bool,
  danger: PropTypes.bool,
};
