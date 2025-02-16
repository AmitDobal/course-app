import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const siblingCount = 1; // How many pages to show on each side of the current page
  const totalPageNumbers = siblingCount * 2 + 5; // first, last, current, and 2 ellipsis slots

  // Helper to generate pagination range with ellipsis
  const getPaginationRange = () => {
    if (totalPages === 0) return [];
    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }
    const firstPageIndex = 0;
    const lastPageIndex = totalPages - 1;
    const leftSiblingIndex = Math.max(currentPage - siblingCount, firstPageIndex);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPageIndex);

    const pages = [];
    // Always include first page
    pages.push(firstPageIndex);

    // Add left ellipsis if needed
    if (leftSiblingIndex > firstPageIndex + 1) {
      pages.push("ellipsis");
    }

    // Add middle pages (excluding first and last)
    for (let i = Math.max(leftSiblingIndex, firstPageIndex + 1); i <= Math.min(rightSiblingIndex, lastPageIndex - 1); i++) {
      pages.push(i);
    }

    // Add right ellipsis if needed
    if (rightSiblingIndex < lastPageIndex - 1) {
      pages.push("ellipsis");
    }

    // Always include last page if totalPages > 1
    if (lastPageIndex > firstPageIndex) {
      pages.push(lastPageIndex);
    }
    return pages;
  };

  const paginationRange = getPaginationRange();

  const handlePrevPage = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="join">
        <button
          className="join-item btn"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          «
        </button>
        {paginationRange.map((item, idx) => {
          if (item === "ellipsis") {
            return (
              <button key={idx} className="join-item btn btn-disabled">
                ...
              </button>
            );
          } else {
            return (
              <button
                key={idx}
                className={`join-item btn ${currentPage === item ? "btn-active" : ""}`}
                onClick={() => onPageChange(item)}
              >
                {item + 1}
              </button>
            );
          }
        })}
        <button
          className="join-item btn"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
        >
          »
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
