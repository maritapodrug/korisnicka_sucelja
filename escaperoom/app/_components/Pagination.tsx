"use client";

import React from "react";
import { useQueryState, parseAsInteger } from "nuqs";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  className = "",
}) => {
  const [, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false })
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrev = () => {
    if (!isFirstPage) {
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      setPage(currentPage + 1);
    }
  };

  return (
    <div className={`w-full max-w-2xl mb-6 ${className}`}>
  <div className="bg-gray-900/80 rounded-lg border border-gray-700 shadow-sm p-4 flex justify-between items-center text-white">
    <button
      onClick={handlePrev}
      className={`px-4 py-2 rounded-md transition-colors duration-200 ${
        isFirstPage
          ? "bg-gray-800 text-gray-500 cursor-not-allowed"
          : "bg-purple-600 text-white hover:bg-purple-700"
      }`}
      disabled={isFirstPage}
    >
      Prev
    </button>

    <p className="text-white">
      Page{" "}
      <span className="font-semibold">{currentPage}</span> of{" "}
      <span className="font-semibold">{totalPages}</span>
    </p>

    <button
      onClick={handleNext}
      className={`px-4 py-2 rounded-md transition-colors duration-200 ${
        isLastPage
          ? "bg-gray-800 text-gray-500 cursor-not-allowed"
          : "bg-purple-600 text-white hover:bg-purple-700"
      }`}
      disabled={isLastPage}
    >
      Next
    </button>
  </div>
</div>

  );
};