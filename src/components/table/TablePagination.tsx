import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
	page: number;
	totalPages: number;
	pageSize: number;
	total: number;

	pageSizeOptions: number[];

	disabled?: boolean;

	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
}

export default function TablePagination({
	page,
	totalPages,
	pageSize,
	total,
	pageSizeOptions,
	disabled = false,
	onPageChange,
	onPageSizeChange,
}: TablePaginationProps) {
	const start = total === 0 ? 0 : (page - 1) * pageSize + 1;

	const end = Math.min(page * pageSize, total);

	const getPages = (): (number | "...")[] => {
		if (totalPages <= 7) {
			return Array.from({ length: totalPages }, (_, index) => index + 1);
		}

		const pages: (number | "...")[] = [1];

		if (page > 3) {
			pages.push("...");
		}

		const startPage = Math.max(2, page - 1);
		const endPage = Math.min(totalPages - 1, page + 1);

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		if (page < totalPages - 2) {
			pages.push("...");
		}

		pages.push(totalPages);

		return pages;
	};

	return (
		<div className="flex flex-col gap-4 border-t border-border pt-4 lg:flex-row lg:items-center lg:justify-between">
			<div className="flex flex-wrap items-center gap-4">
				<p className="text-sm text-muted-foreground">
					Showing{" "}
					<span className="font-medium text-foreground">{start}</span>{" "}
					to{" "}
					<span className="font-medium text-foreground">{end}</span>{" "}
					of{" "}
					<span className="font-medium text-foreground">{total}</span>{" "}
					entries
				</p>

				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground">Rows</span>

					<select
						disabled={disabled}
						value={pageSize}
						onChange={(event) =>
							onPageSizeChange(Number(event.target.value))
						}
						className="h-9 rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
					>
						{pageSizeOptions.map((size) => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="flex items-center gap-1">
				<button
					type="button"
					disabled={disabled || page <= 1}
					onClick={() => onPageChange(page - 1)}
					className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
				>
					<ChevronLeft size={16} />
				</button>

				{getPages().map((item, index) =>
					item === "..." ? (
						<span
							key={`ellipsis-${index}`}
							className="px-2 text-sm text-muted-foreground"
						>
							...
						</span>
					) : (
						<button
							type="button"
							key={item}
							disabled={disabled}
							onClick={() => onPageChange(item)}
							className={
								page === item
									? "inline-flex h-9 min-w-9 items-center justify-center rounded-md bg-primary px-2 text-sm text-primary-foreground disabled:opacity-50"
									: "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
							}
						>
							{item}
						</button>
					),
				)}

				<button
					type="button"
					disabled={disabled || page >= totalPages}
					onClick={() => onPageChange(page + 1)}
					className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
				>
					<ChevronRight size={16} />
				</button>
			</div>
		</div>
	);
}
