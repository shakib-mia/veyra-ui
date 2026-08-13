import { cn } from "../../lib/cn";

export type TableAlign = "left" | "center" | "right";

export interface TableColumn<T> {
	key: string;
	header: string;

	accessor?: (row: T) => unknown;

	render?: (params: {
		row: T;
		value: unknown;
		index: number;
	}) => React.ReactNode;

	/**
	 * Default alignment for this column.
	 *
	 * Priority:
	 * cellAlign > rowAlign > column.align > left
	 */
	align?: TableAlign;

	className?: string;

	headerClassName?: string;
}

export interface TableProps<T extends object> {
	data: T[];
	columns: TableColumn<T>[];

	loading?: boolean;
	emptyMessage?: string;

	onRowClick?: (row: T) => void;

	/**
	 * Alignment for the entire row.
	 *
	 * Can be:
	 * - static: "center"
	 * - dynamic: (row, index) => "center"
	 */
	rowAlign?: TableAlign | ((row: T, index: number) => TableAlign | undefined);

	/**
	 * Alignment for an individual cell.
	 *
	 * Can be dynamically determined from row/column.
	 */
	cellAlign?: (
		row: T,
		column: TableColumn<T>,
		index: number,
	) => TableAlign | undefined;

	/**
	 * Alignment for the entire header.
	 */
	headerAlign?: TableAlign;
}

const alignClasses: Record<TableAlign, string> = {
	left: "text-left",
	center: "text-center",
	right: "text-right",
};

export default function Table<T extends object>({
	data,
	columns,
	loading = false,
	emptyMessage = "No records found.",
	onRowClick,
	rowAlign,
	cellAlign,
	headerAlign,
}: TableProps<T>) {
	/**
	 * Resolve row alignment.
	 *
	 * Supports both:
	 *
	 * rowAlign="center"
	 *
	 * and:
	 *
	 * rowAlign={(row, index) => "center"}
	 */
	const getRowAlignment = (row: T, index: number): TableAlign | undefined => {
		if (typeof rowAlign === "function") {
			return rowAlign(row, index);
		}

		return rowAlign;
	};

	return (
		<div className="w-full overflow-x-auto rounded-xl border border-border">
			<table className="w-full min-w-max border-collapse">
				<thead className="bg-accent">
					<tr className="border-b border-border/50 bg-muted/50">
						{columns.map((column) => (
							<th
								key={column.key}
								className={cn(
									"whitespace-nowrap px-5 py-3.5 text-sm font-semibold text-foreground",

									alignClasses[
										column.align ?? headerAlign ?? "left"
									],

									column.headerClassName,
								)}
							>
								{column.header}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{loading ? (
						Array.from({ length: 10 }).map((_, rowIndex) => (
							<tr
								key={rowIndex}
								className="border-b border-border/30 last:border-0"
							>
								{columns.map((column) => (
									<td
										key={`${column.key}-${rowIndex}`}
										className={cn(
											"px-5 py-4 align-middle text-sm",

											alignClasses[
												column.align ?? "left"
											],
										)}
									>
										<div className="h-4 w-full animate-pulse rounded-md bg-gray-300" />
									</td>
								))}
							</tr>
						))
					) : data.length === 0 ? (
						<tr>
							<td
								colSpan={columns.length}
								className="px-5 py-16 text-center text-sm text-muted-foreground"
							>
								{emptyMessage}
							</td>
						</tr>
					) : (
						data.map((row, rowIndex) => {
							const rowAlignment = getRowAlignment(row, rowIndex);

							return (
								<tr
									key={rowIndex}
									onClick={() => onRowClick?.(row)}
									className={cn(
										"border-b border-border/30 last:border-0",

										onRowClick &&
											"cursor-pointer transition-colors hover:bg-muted/50",
									)}
								>
									{columns.map((column) => {
										const value = column.accessor
											? column.accessor(row)
											: column.key in row
												? (
														row as Record<
															string,
															unknown
														>
													)[column.key]
												: undefined;

										/**
										 * Alignment priority:
										 *
										 * 1. Cell
										 * 2. Row
										 * 3. Column
										 * 4. Default
										 */
										const cellAlignment =
											cellAlign?.(
												row,
												column,
												rowIndex,
											) ??
											rowAlignment ??
											column.align ??
											"left";

										return (
											<td
												key={column.key}
												className={cn(
													"px-5 py-4 align-middle text-sm text-foreground",

													alignClasses[cellAlignment],

													column.className,
												)}
											>
												{column.render
													? column.render({
															row,
															value,
															index: rowIndex,
														})
													: String(value ?? "-")}
											</td>
										);
									})}
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
}
