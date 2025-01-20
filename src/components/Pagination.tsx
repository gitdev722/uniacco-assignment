import React from "react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	return (
		<div className="mt-4 flex justify-center items-center gap-2">
			<button
				className="px-4 py-2 bg-gray-300 rounded"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}>
				Previous
			</button>
			{Array.from({ length: totalPages }, (_, index) => (
				<button
					key={index + 1}
					className={`rounded px-4 py-2 ${
						currentPage === index + 1
							? "bg-blue-500 text-white"
							: "bg-gray-300"
					}`}
					onClick={() => onPageChange(index + 1)}>
					{index + 1}
				</button>
			))}
			<button
				className="px-4 py-2 bg-gray-300 rounded"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}>
				Next
			</button>
		</div>
	);
};

export default Pagination;
