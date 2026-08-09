import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";

export interface PaginationProps {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	siblingCount?: number;
	className?: string;
	disabled?: boolean;
}

const getPaginationItems = (
	page: number,
	totalPages: number,
	siblingCount: number,
): Array<number | "ellipsis"> => {
	const totalVisiblePages = siblingCount * 2 + 5;

	if (totalPages <= totalVisiblePages) {
		return Array.from({ length: totalPages }, (_, index) => index + 1);
	}

	const leftSibling = Math.max(page - siblingCount, 1);

	const rightSibling = Math.min(page + siblingCount, totalPages);

	const showLeftEllipsis = leftSibling > 2;
	const showRightEllipsis = rightSibling < totalPages - 1;

	if (!showLeftEllipsis && showRightEllipsis) {
		const leftItems = Array.from(
			{ length: 3 + siblingCount * 2 },
			(_, index) => index + 1,
		);

		return [...leftItems, "ellipsis", totalPages];
	}

	if (showLeftEllipsis && !showRightEllipsis) {
		const start = totalPages - (2 + siblingCount * 2);

		const rightItems = Array.from(
			{ length: totalPages - start + 1 },
			(_, index) => start + index,
		);

		return [1, "ellipsis", ...rightItems];
	}

	const middleItems = Array.from(
		{ length: rightSibling - leftSibling + 1 },
		(_, index) => leftSibling + index,
	);

	return [1, "ellipsis", ...middleItems, "ellipsis", totalPages];
};

interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	active?: boolean;
	children: ReactNode;
}

const PaginationButton = ({
	active = false,
	className,
	children,
	...props
}: PaginationButtonProps) => {
	return (
		<button
			type="button"
			className={cn(
				"inline-flex size-9 items-center justify-center",
				"rounded-md text-sm font-medium",
				"transition-colors",
				"focus-visible:outline-none",
				"focus-visible:ring-2",
				"focus-visible:ring-ring",
				active
					? "bg-primary text-primary-foreground"
					: "text-foreground hover:bg-secondary",
				"disabled:pointer-events-none",
				"disabled:opacity-50",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};

const Pagination = ({
	page,
	totalPages,
	onPageChange,
	siblingCount = 1,
	className,
	disabled = false,
}: PaginationProps) => {
	if (totalPages <= 0) {
		return null;
	}

	const items = getPaginationItems(page, totalPages, siblingCount);

	return (
		<nav
			aria-label="Pagination"
			className={cn("flex items-center justify-end gap-1", className)}
		>
			<PaginationButton
				aria-label="Previous page"
				disabled={disabled || page <= 1}
				onClick={() => onPageChange(page - 1)}
			>
				<ChevronLeft aria-hidden="true" className="size-4" />
			</PaginationButton>

			{items.map((item, index) => {
				if (item === "ellipsis") {
					return (
						<span
							key={`ellipsis-${index}`}
							className="flex size-9 items-center justify-center text-muted-foreground"
							aria-hidden="true"
						>
							<MoreHorizontal className="size-4" />
						</span>
					);
				}

				return (
					<PaginationButton
						key={item}
						active={item === page}
						aria-current={item === page ? "page" : undefined}
						disabled={disabled}
						onClick={() => onPageChange(item)}
					>
						{item}
					</PaginationButton>
				);
			})}

			<PaginationButton
				aria-label="Next page"
				disabled={disabled || page >= totalPages}
				onClick={() => onPageChange(page + 1)}
			>
				<ChevronRight aria-hidden="true" className="size-4" />
			</PaginationButton>
		</nav>
	);
};

export { Pagination };
