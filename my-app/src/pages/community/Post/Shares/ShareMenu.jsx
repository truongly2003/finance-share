import { Facebook, Twitter, Mail, Link2, Flag } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";
import { postApi } from "@/services/community/PostService";

const ShareMenu = ({ postId, onClose, userId }) => {
  const [copied, setCopied] = useState(false);
  console.log(postId)
  const postUrl = `${window.location.origin}/community/detail-post/${postId}`;

  // Hàm ghi nhận lượt chia sẻ
  const handleShare = async () => {
    try {
      if (postId && userId) {
        await postApi.sharePost(postId, userId);
      }
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  // Chia sẻ Facebook
  const shareToFacebook = async () => {
    await handleShare();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      postUrl
    )}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
    onClose?.();
  };

  // Chia sẻ Twitter
  const shareToTwitter = async () => {
    await handleShare();
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      postUrl
    )}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
    onClose?.();
  };

  // Chia sẻ qua Email
  const shareToEmail = async () => {
    await handleShare();
    window.location.href = `mailto:?subject=Chia sẻ bài viết&body=${postUrl}`;
    onClose?.();
  };

  // Sao chép liên kết
  const copyToClipboard = async () => {
    await handleShare();
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Báo cáo bài viết
  const handleReport = () => {
    alert("Đã gửi báo cáo!");
    onClose?.();
  };

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fadeIn">
      <button
        onClick={shareToFacebook}
        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 w-full text-gray-700"
      >
        <Facebook size={16} /> Chia sẻ lên Facebook
      </button>

      <button
        onClick={shareToTwitter}
        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 w-full text-gray-700"
      >
        <Twitter size={16} /> Chia sẻ lên Twitter
      </button>

      <button
        onClick={shareToEmail}
        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 w-full text-gray-700"
      >
        <Mail size={16} /> Chia sẻ tới Email
      </button>

      <button
        onClick={copyToClipboard}
        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 w-full text-gray-700"
      >
        <Link2 size={16} /> {copied ? "Đã sao chép!" : "Sao chép liên kết"}
      </button>

      <button
        onClick={handleReport}
        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 w-full text-red-500"
      >
        <Flag size={16} /> Báo cáo bài viết
      </button>
    </div>
  );
};

ShareMenu.propTypes = {
  postId: PropTypes.string.isRequired,
  userId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ShareMenu;
