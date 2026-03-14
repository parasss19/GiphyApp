import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, loading = false }) => {
  if (totalPages <= 1) return null;

  const handlePageClick = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-1.5 py-6 flex-wrap text-sm">
      <button
        type="button"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage <= 1 || loading}
        className="px-2.5 py-1.5 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        aria-label="Previous page"
      >
        Prev
      </button>

      {pages[0] > 1 && (
        <>
          <button
            type="button"
            onClick={() => handlePageClick(1)}
            disabled={loading}
            className="min-w-[1.75rem] px-2.5 py-1.5 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 disabled:opacity-50 transition-colors text-sm"
          >
            1
          </button>
          {pages[0] > 2 && <span className="text-gray-400 px-0.5 text-sm">…</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => handlePageClick(page)}
          disabled={loading}
          className={`min-w-[1.75rem] px-2.5 py-1.5 rounded-lg font-medium transition-colors text-sm ${
            page === currentPage
              ? "bg-teal-500 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
          }`}
        >
          {page}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="text-gray-400 px-0.5 text-sm">…</span>
          )}
          <button
            type="button"
            onClick={() => handlePageClick(totalPages)}
            disabled={loading}
            className="min-w-[1.75rem] px-2.5 py-1.5 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 disabled:opacity-50 transition-colors text-sm"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage >= totalPages || loading}
        className="px-2.5 py-1.5 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
