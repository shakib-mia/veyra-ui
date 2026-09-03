import { useMemo, useState } from "react";

import Table from "./Table";
import TableFilters from "./TableFilters";
import TablePagination from "./TablePagination";
import TableSearch from "./TableSearch";

import FilterChips, { type FilterChip } from "../filter-chips/FilterChips";

import type { DataTableProps } from "./types";

const searchableString = (value: unknown): string => {
	if (value === null || value === undefined) {
		return "";
	}

	if (typeof value === "object") {
		if (Array.isArray(value)) {
			return value.map(searchableString).join(" ");
		}

		return Object.entries(value as Record<string, unknown>)
			.map(([key, value]) => `${key} ${searchableString(value)}`)
			.join(" ");
	}

	return String(value);
};

export default function DataTable<T extends object>({
	data,
	columns,
	loading = false,
	emptyMessage = "No records found.",
	onRowClick,
	pagination,

	searchable = false,
	searchPlaceholder = "Search...",
	searchMode = "client",
	searchValue = "",
	onSearchChange,

	filters = [],
	filterMode = "client",
	filterValues: externalFilterValues,
	onFilterChange,

	showFilterChips = false,
	filterChipsClearLabel = "Clear all",

	cellAlign,
	rowAlign,

	headerAlign,
	filterActions,
}: DataTableProps<T>) {
	/**
	 * Client-side state
	 */
	const [clientSearch, setClientSearch] = useState("");

	const [clientFilterValues, setClientFilterValues] = useState<
		Record<string, string>
	>({});

	const [clientPage, setClientPage] = useState(1);

	const [clientPageSize, setClientPageSize] = useState(
		pagination?.defaultPageSize ?? 10,
	);

	/**
	 * Modes
	 */
	const isPaginated = Boolean(pagination);

	const isServerPagination = pagination?.mode === "server";

	const isServerSearch = searchMode === "server";

	const isServerFilter = filterMode === "server";

	/**
	 * Active search
	 */
	const activeSearch = isServerSearch ? searchValue : clientSearch;

	/**
	 * Active filters
	 *
	 * Server:
	 * Parent owns the state.
	 *
	 * Client:
	 * DataTable owns the state.
	 */
	const activeFilterValues = useMemo(
		() =>
			isServerFilter ? (externalFilterValues ?? {}) : clientFilterValues,
		[clientFilterValues, externalFilterValues, isServerFilter],
	);

	/**
	 * Client-side search + filter
	 *
	 * Server search/filter skips local filtering.
	 */
	const filteredData = useMemo(() => {
		if (isServerSearch || isServerFilter) {
			return data;
		}

		const keyword = activeSearch.trim().toLowerCase();

		return data.filter((row) => {
			/**
			 * Search
			 */
			const matchesSearch =
				!keyword ||
				searchableString(row).toLowerCase().includes(keyword);

			/**
			 * Filters
			 */
			const matchesFilters = filters.every((filter) => {
				const selectedValue = activeFilterValues[String(filter.key)];

				if (!selectedValue || selectedValue === "all") {
					return true;
				}

				const rowValue = (row as Record<string, unknown>)[
					String(filter.key)
				];

				return (
					String(rowValue ?? "").toLowerCase() ===
					selectedValue.toLowerCase()
				);
			});

			return matchesSearch && matchesFilters;
		});
	}, [
		data,
		filters,
		activeSearch,
		activeFilterValues,
		isServerSearch,
		isServerFilter,
	]);

	/**
	 * Client pagination
	 */
	const clientTotal = filteredData.length;

	const clientTotalPages = Math.max(
		1,
		Math.ceil(clientTotal / clientPageSize),
	);

	/**
	 * Visible data
	 */
	const visibleData = useMemo(() => {
		/**
		 * Server pagination
		 *
		 * Backend already paginated.
		 */
		if (isServerPagination) {
			return data;
		}

		/**
		 * No pagination
		 */
		if (!isPaginated) {
			return filteredData;
		}

		const currentPage = Math.min(clientPage, clientTotalPages);

		const start = (currentPage - 1) * clientPageSize;

		const end = start + clientPageSize;

		return filteredData.slice(start, end);
	}, [
		data,
		filteredData,
		isPaginated,
		isServerPagination,
		clientPage,
		clientPageSize,
		clientTotalPages,
	]);

	/**
	 * Pagination state
	 */
	const currentPage = isServerPagination
		? (pagination?.page ?? 1)
		: Math.min(clientPage, clientTotalPages);

	const currentPageSize = isServerPagination
		? (pagination?.pageSize ?? 10)
		: clientPageSize;

	const total = isServerPagination
		? (pagination?.total ?? data.length)
		: clientTotal;

	const totalPages = isServerPagination
		? Math.max(1, pagination?.totalPages ?? 1)
		: clientTotalPages;

	/**
	 * Search action
	 */
	const handleSearchChange = (value: string) => {
		if (isServerSearch) {
			onSearchChange?.(value);

			/**
			 * Search should start from page 1.
			 */
			if (isServerPagination) {
				pagination?.onPageChange?.(1);
			}

			return;
		}

		setClientSearch(value);
		setClientPage(1);
	};

	/**
	 * Filter action
	 */
	const handleFilterChange = (key: string, value: string) => {
		/**
		 * Server-side filter
		 *
		 * Parent owns filter state.
		 */
		if (isServerFilter) {
			onFilterChange?.(key, value);

			/**
			 * Changing a filter should
			 * always start from page 1.
			 */
			if (isServerPagination) {
				pagination?.onPageChange?.(1);
			}

			return;
		}

		/**
		 * Client-side filter
		 */
		setClientFilterValues((previous) => ({
			...previous,
			[key]: value,
		}));

		setClientPage(1);
	};

	/**
	 * Active filter chips
	 */
	const activeFilterChips = useMemo<FilterChip[]>(() => {
		if (!showFilterChips) {
			return [];
		}

		const chips: FilterChip[] = [];

		/**
		 * Search chip
		 */
		if (activeSearch.trim()) {
			chips.push({
				key: "__search__",
				label: "Search",
				value: activeSearch,
				valueLabel: activeSearch,
			});
		}

		/**
		 * Filter chips
		 */
		chips.push(
			...filters.flatMap((filter) => {
				const key = String(filter.key);
				const value = activeFilterValues[key];

				if (!value || value === "all") {
					return [];
				}

				const selectedOption = filter.options?.find(
					(option) => option.value === value,
				);

				return [
					{
						key,
						label: filter.label,
						value,
						valueLabel: selectedOption?.label ?? value,
					},
				];
			}),
		);

		return chips;
	}, [activeSearch, filters, activeFilterValues, showFilterChips]);

	/**
	 * Remove one filter
	 */
	const handleRemoveFilter = (key: string) => {
		if (key === "__search__") {
			handleSearchChange("");

			return;
		}

		handleFilterChange(key, "");
	};

	/**
	 * Clear all filters
	 */
	const handleClearFilters = () => {
		/**
		 * Clear search
		 */
		if (isServerSearch) {
			onSearchChange?.("");

			if (isServerPagination) {
				pagination?.onPageChange?.(1);
			}
		} else {
			setClientSearch("");
			setClientPage(1);
		}

		/**
		 * Server mode filters
		 */
		if (isServerFilter) {
			filters.forEach((filter) => {
				const key = String(filter.key);
				const value = activeFilterValues[key];

				if (!value || value === "all") {
					return;
				}

				onFilterChange?.(key, "");
			});

			if (isServerPagination) {
				pagination?.onPageChange?.(1);
			}

			return;
		}

		/**
		 * Client mode filters
		 */
		setClientFilterValues({});
		setClientPage(1);
	};

	/**
	 * Page change
	 */
	const handlePageChange = (page: number) => {
		if (isServerPagination) {
			pagination?.onPageChange?.(page);

			return;
		}

		setClientPage(page);
	};

	/**
	 * Page size change
	 */
	const handlePageSizeChange = (pageSize: number) => {
		if (isServerPagination) {
			pagination?.onPageSizeChange?.(pageSize);

			return;
		}

		setClientPageSize(pageSize);
		setClientPage(1);
	};

	// useEffect(() => {
	// 	onFilteredDataChange?.(filteredData);
	// }, [filteredData, onFilteredDataChange]);

	const renderedFilterActions =
		typeof filterActions === "function"
			? filterActions(filteredData)
			: filterActions;

	return (
		<div className="space-y-4">
			{/* Search + Filters */}
			{(searchable || filters.length > 0) && (
				<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					{/* Search */}
					{searchable && (
						<div className="w-full md:max-w-sm">
							<TableSearch
								value={activeSearch}
								onChange={handleSearchChange}
								placeholder={searchPlaceholder}
								disabled={loading}
							/>
						</div>
					)}

					{/* Filters */}
					{filters.length > 0 && (
						<TableFilters
							filters={filters}
							values={activeFilterValues}
							onChange={handleFilterChange}
							disabled={loading}
							actions={renderedFilterActions}
						/>
					)}
				</div>
			)}

			{/* Filter Chips */}
			{showFilterChips && activeFilterChips.length > 0 && (
				<FilterChips
					filters={activeFilterChips}
					onRemove={handleRemoveFilter}
					onClear={handleClearFilters}
					clearLabel={filterChipsClearLabel}
				/>
			)}

			{/* Table */}
			<Table
				data={visibleData}
				columns={columns}
				loading={loading}
				emptyMessage={emptyMessage}
				onRowClick={onRowClick}
				cellAlign={cellAlign}
				rowAlign={rowAlign}
				headerAlign={headerAlign}
			/>

			{/* Pagination */}
			{isPaginated && (
				<TablePagination
					page={currentPage}
					totalPages={totalPages}
					pageSize={currentPageSize}
					total={total}
					pageSizeOptions={
						pagination?.pageSizeOptions ?? [10, 25, 50, 100]
					}
					disabled={loading}
					onPageChange={handlePageChange}
					onPageSizeChange={handlePageSizeChange}
				/>
			)}
		</div>
	);
}
