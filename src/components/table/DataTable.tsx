import { useMemo, useState } from "react";

import Table from "./Table";
import TableFilters from "./TableFilters";
import TablePagination from "./TablePagination";
import TableSearch from "./TableSearch";

import type { DataTableProps } from "./types";

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

	const isPaginated = Boolean(pagination);

	const isServerPagination = pagination?.mode === "server";

	const isServerSearch = searchMode === "server";

	const isServerFilter = filterMode === "server";

	/**
	 * Search value
	 */
	const activeSearch = isServerSearch ? searchValue : clientSearch;

	/**
	 * Filter values
	 */
	const activeFilterValues = useMemo(
		() =>
			isServerFilter ? (externalFilterValues ?? {}) : clientFilterValues,
		[clientFilterValues, externalFilterValues, isServerFilter],
	);

	/**
	 * Client-side search + filter.
	 *
	 * Server mode skips these because
	 * backend already returns filtered data.
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
				Object.values(row)
					.map((value) => String(value ?? ""))
					.join(" ")
					.toLowerCase()
					.includes(keyword);

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
	 * Client-side pagination
	 */
	const clientTotal = filteredData.length;

	const clientTotalPages = Math.max(
		1,
		Math.ceil(clientTotal / clientPageSize),
	);

	const visibleData = useMemo(() => {
		/**
		 * Server pagination:
		 * backend already paginated the data.
		 */
		if (isServerPagination) {
			return data;
		}

		/**
		 * No pagination.
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
	 * Search
	 */
	const handleSearchChange = (value: string) => {
		if (isServerSearch) {
			onSearchChange?.(value);
			return;
		}

		setClientSearch(value);
		setClientPage(1);
	};

	/**
	 * Filter
	 */
	const handleFilterChange = (key: string, value: string) => {
		if (isServerFilter) {
			onFilterChange?.(key, value);
			return;
		}

		setClientFilterValues((previous) => ({
			...previous,
			[key]: value,
		}));

		setClientPage(1);
	};

	/**
	 * Page
	 */
	const handlePageChange = (page: number) => {
		if (isServerPagination) {
			pagination?.onPageChange?.(page);
			return;
		}

		setClientPage(page);
	};

	/**
	 * Page size
	 */
	const handlePageSizeChange = (pageSize: number) => {
		if (isServerPagination) {
			pagination?.onPageSizeChange?.(pageSize);
			return;
		}

		setClientPageSize(pageSize);
		setClientPage(1);
	};

	return (
		<div className="space-y-4">
			{(searchable || filters.length > 0) && (
				<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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

					{filters.length > 0 && (
						<TableFilters
							filters={filters}
							values={activeFilterValues}
							onChange={handleFilterChange}
							disabled={loading}
						/>
					)}
				</div>
			)}

			<Table
				data={visibleData}
				columns={columns}
				loading={loading}
				emptyMessage={emptyMessage}
				onRowClick={onRowClick}
			/>

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
