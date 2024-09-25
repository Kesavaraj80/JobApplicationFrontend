import { ArrowLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState, ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

const PageButtons = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pagesToShow = 2; // Number of pages to show before and after current page
  const renderPageNumbers = [];
  const [enteredPageNum, setEnteredPageNum] = useState(1);

  if (totalPages <= pagesToShow * 2 + 1) {
    // Show all pages if there are fewer or equal pages than twice the visible range + 1
    renderPageNumbers.push(
      ...Array.from({ length: totalPages }, (_, i) => i + 1)
    );
  } else if (currentPage <= pagesToShow + 1) {
    // If current page is within the first few pages
    renderPageNumbers.push(
      ...Array.from({ length: pagesToShow * 2 + 1 }, (_, i) => i + 1)
    );
    renderPageNumbers.push("...");
    renderPageNumbers.push(totalPages);
  } else if (currentPage >= totalPages - pagesToShow) {
    // If current page is within the last few pages
    renderPageNumbers.push(1);
    renderPageNumbers.push("...");
    renderPageNumbers.push(
      ...Array.from(
        { length: pagesToShow * 2 + 1 },
        (_, i) => totalPages - pagesToShow * 2 + i
      )
    );
  } else {
    // If current page is in the middle
    renderPageNumbers.push(1);
    renderPageNumbers.push("...");
    renderPageNumbers.push(
      ...Array.from(
        { length: pagesToShow * 2 + 1 },
        (_, i) => currentPage - pagesToShow + i
      )
    );
    renderPageNumbers.push("...");
    renderPageNumbers.push(totalPages);
  }

  return (
    <div className="flex items-center space-x-[2px] ">
      {renderPageNumbers.map((page, index) => (
        <div
          className={twMerge(
            "rounded-lg p-2 md:p-3 text-xs md:text-sm",
            page === "..."
              ? "cursor-default"
              : "hover:bg-[#EFF8FF] cursor-pointer",
            currentPage === page ? "bg-[#EFF8FF]" : "text-[#667085]"
          )}
          key={index}
          onClick={() => (page === "..." ? null : onPageChange?.(Number(page)))}
        >
          <p
            className={twMerge(
              "font-medium leading-5",
              currentPage === page ? "text-primary" : "text-[#667085]"
            )}
          >
            {page === "..." ? "..." : page}
          </p>
        </div>
      ))}
      <div className="w-16 md:w-20 flex items-center">
        <input
          className="border w-12 md:w-14 h-8 appearance-none outline-none text-xs md:text-sm ml-2 p-1 rounded-sm"
          type="number"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setEnteredPageNum(Number(event.target.value));
          }}
        />
        <button
          className="ml-1"
          onClick={() => {
            if (enteredPageNum >= 1 && enteredPageNum <= totalPages) {
              onPageChange?.(enteredPageNum);
            }
          }}
        >
          <MagnifyingGlassIcon className="h-4 md:h-5" />
        </button>
      </div>
    </div>
  );
};

export const Pagination = ({
  currentPage,
  totalPages: tp,
  onPageChange,
}: {
  currentPage?: number;
  totalPages?: number;
  perPage?: number;
  onPageChange: (page: number) => void;
}) => {
  const totalPages = tp || 0;
  return (
    <div className="h-[68px] flex items-center justify-between w-full px-4 md:px-6 pt-3 md:pt-[11px] pb-2 md:pb-4">
      {currentPage && (
        <div
          className={twMerge(
            "border border-[#D0D5DD] shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)] rounded-lg px-3 md:px-[14px] py-2 md:py-3 flex items-center justify-center space-x-3 cursor-pointer hover:bg-background",
            currentPage === 1 && "opacity-0"
          )}
          onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
        >
          <ArrowLeftIcon className="w-4 h-4 md:w-5 md:h-5" />
          <p className="text-xs md:text-sm font-medium leading-5">Previous</p>
        </div>
      )}
      {currentPage ? (
        <div>
          <PageButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      ) : null}
      {currentPage && totalPages > 1 && totalPages > currentPage ? (
        <div
          className="border border-[#D0D5DD] shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)] rounded-lg px-3 md:px-[14px] py-2 md:py-2 flex items-center justify-center space-x-3 cursor-pointer hover:bg-background"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <p className="text-xs md:text-sm font-medium leading-5">Next</p>
          <ArrowLeftIcon className="w-4 h-4 md:w-5 md:h-5 rotate-180" />
        </div>
      ) : (
        <div className="w-[68px] md:w-[94px]" />
      )}
    </div>
  );
};
