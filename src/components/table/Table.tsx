import { cn } from "../../lib/cn";

interface TableColumn<T> {
	key: string;
	header: string;

	accessor?: (row: T) => unknown;

	render?: (params: {
		row: T;
		value: unknown;
		index: number;
	}) => React.ReactNode;

	className?: string;
	headerClassName?: string;
}

interface TableProps<T extends object> {
	data: T[];
	columns: TableColumn<T>[];

	loading?: boolean;
	emptyMessage?: string;

	onRowClick?: (row: T) => void;
}

export default function Table<T extends object>({
	data,
	columns,
	loading = false,
	emptyMessage = "No records found.",
	onRowClick,
}: TableProps<T>) {
	return (
		<div className="w-full overflow-x-auto rounded-xl border border-border">
			<table className="w-full min-w-max border-collapse">
				<thead className="bg-accent">
					<tr className="border-b border-border/50 bg-muted/50">
						{columns.map((column) => (
							<th
								key={column.key}
								className={cn(
									"whitespace-nowrap px-5 py-3.5 text-left text-sm font-semibold text-foreground",
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
										className="px-5 py-4"
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
						data.map((row, rowIndex) => (
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
											? (row as Record<string, unknown>)[
													column.key
												]
											: undefined;

									return (
										<td
											key={column.key}
											className={cn(
												"px-5 py-4 align-middle text-sm text-foreground",
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
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
