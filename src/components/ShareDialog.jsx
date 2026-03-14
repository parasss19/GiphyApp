import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";
import { FaReddit, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiInstagram } from "react-icons/si";
import { toast } from "react-hot-toast";

const ShareDialog = ({ isOpen, onClose, gif, shareUrlOverride }) => {
  if (!isOpen) return null;

  const shareUrl =
    shareUrlOverride ||
    (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = gif?.title || "Check out this GIF!";
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);
  const gifImageUrl =
    gif?.images?.downsized_medium?.url ||
    gif?.images?.fixed_width?.url ||
    gif?.images?.original?.url;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const openShare = (url) => {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const handleInstagram = async () => {
    await copyLink();
    toast.success("Paste in Instagram to share.");
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60">
      <div className="relative w-full max-w-xs rounded-2xl bg-gray-800 border border-gray-600/80 shadow-2xl shadow-black/50 overflow-hidden ring-1 ring-white/5">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <CgClose className="w-5 h-5" />
        </button>

        <div className="p-4 pt-10">
          {gifImageUrl && (
            <div className="rounded-xl overflow-hidden bg-black/40 mb-4 aspect-video flex items-center justify-center ring-1 ring-gray-600/50">
              <img
                src={gifImageUrl}
                alt={shareTitle}
                className="w-full h-full object-contain"
              />
            </div>
          )}

          <p className="text-center text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">
            Share
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openShare(shareLinks.twitter)}
              className="p-3 rounded-full bg-gray-700/90 hover:bg-[#1da1f2]/20 text-gray-300 hover:text-[#1da1f2] transition-all duration-200 hover:scale-110"
              aria-label="Share on X"
            >
              <FaXTwitter className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => openShare(shareLinks.reddit)}
              className="p-3 rounded-full bg-gray-700/90 hover:bg-[#ff4500]/20 text-gray-300 hover:text-[#ff4500] transition-all duration-200 hover:scale-110"
              aria-label="Share on Reddit"
            >
              <FaReddit className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleInstagram}
              className="p-3 rounded-full bg-gray-700/90 hover:bg-[#e1306c]/20 text-gray-300 hover:text-[#e1306c] transition-all duration-200 hover:scale-110"
              aria-label="Share on Instagram"
            >
              <SiInstagram className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => openShare(shareLinks.linkedin)}
              className="p-3 rounded-full bg-gray-700/90 hover:bg-[#0a66c2]/20 text-gray-300 hover:text-[#0a66c2] transition-all duration-200 hover:scale-110"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ShareDialog;
