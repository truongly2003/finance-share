import { X, Facebook, Link2, Check } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";
import { postApi } from "@/services/community/PostService";
const SharePost = ({ postId, onClose, userId }) => {
  const [copied, setCopied] = useState(false);
  const handleShare = async (postId) => {
    try {
      await postApi.sharePost(postId, userId);
    } catch (error) {
      console.log(error);
    }
  };

  // const postUrl = `${window.location.origin}/community/detail-post/${postId}`;
  const postUrl = `https://your-temporary-domain.com/community/detail-post/${postId}`;
  // Hàm chia sẻ lên Facebook
  const shareToFacebook = () => {
    handleShare(postId);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      postUrl
    )}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  // Hàm copy link
  const copyToClipboard = async () => {
    handleShare(postId);
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Chia sẻ bài viết</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-3">
            {/* Facebook Share */}
            <button
              onClick={shareToFacebook}
              className="w-full flex items-center gap-3 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Facebook className="w-5 h-5" />
              <span className="font-medium">Chia sẻ lên Facebook</span>
            </button>

            {/* Copy Link */}
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center gap-3 p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-600">
                    Đã sao chép!
                  </span>
                </>
              ) : (
                <>
                  <Link2 className="w-5 h-5" />
                  <span className="font-medium">Sao chép liên kết</span>
                </>
              )}
            </button>
          </div>

          {/* URL */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Liên kết bài viết:</p>
            <p className="text-sm text-gray-700 break-all">{postUrl}</p>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

SharePost.propTypes = {
  postId: PropTypes.string.isRequired,
  userId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default SharePost;
