import React from "react";

const LoadMore = ({ onClick, loading, hasMore, className = "" }) => {
  if (!hasMore) return null;

  return (
    <div className={`flex justify-center py-6 ${className}`}>
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="px-6 py-3 rounded-xl bg-teal-500/20 text-teal-400 font-semibold border border-teal-500/40 hover:bg-teal-500/30 hover:border-teal-400/60 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Loading..." : "Load more"}
      </button>
    </div>
  );
};

export default LoadMore;
