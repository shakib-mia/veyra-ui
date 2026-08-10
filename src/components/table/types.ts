import type { ReactNode } from "react";

export interface DataTableColumn<T> {
	key: string;
	header: string;

	accessor?: (row: T) => unknown;

	render?: (params: { row: T; value: unknown; index: number }) => ReactNode;

	className?: string;
	headerClassName?: string;
}

export interface DataTablePagination {
	mode: "client" | "server";

	page?: number;
	pageSize?: number;
	total?: number;
	totalPages?: number;

	defaultPageSize?: number;
	pageSizeOptions?: number[];

	onPageChange?: (page: number) => void;
	onPageSizeChange?: (pageSize: number) => void;
}

export interface DataTableFilterOption {
	label: string;
	value: string;
	disabled?: boolean;
}

export interface DataTableFilter<T> {
	key: keyof T | string;
	label: string;
	type: "select";
	options: DataTableFilterOption[];
	placeholder?: string;
}

export interface DataTableProps<T extends object> {
	data: T[];
	columns: DataTableColumn<T>[];

	loading?: boolean;
	emptyMessage?: string;

	onRowClick?: (row: T) => void;

	pagination?: DataTablePagination;

	/**
	 * Search
	 */
	searchable?: boolean;
	searchPlaceholder?: string;

	searchMode?: "client" | "server";
	searchValue?: string;
	onSearchChange?: (value: string) => void;

	/**
	 * Filters
	 */
	filters?: DataTableFilter<T>[];

	filterMode?: "client" | "server";
	filterValues?: Record<string, string>;
	onFilterChange?: (key: string, value: string) => void;

	showFilterChips?: boolean;
	filterChipsClearLabel?: string;
}
