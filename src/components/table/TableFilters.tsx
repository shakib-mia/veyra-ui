import type { ReactNode } from "react";

import { Select } from "../select/select";
import type { DataTableFilter } from "./types";

interface TableFiltersProps<T extends object> {
	filters: DataTableFilter<T>[];
	values: Record<string, string>;
	onChange: (key: string, value: string) => void;
	disabled?: boolean;
	actions?: ReactNode;
}

export default function TableFilters<T extends object>({
	filters,
	values,
	onChange,
	disabled = false,
	actions,
}: TableFiltersProps<T>) {
	if (filters.length === 0 && !actions) {
		return null;
	}

	return (
		<div className="flex flex-wrap items-center gap-3">
			{filters.map((filter) => (
				<Select
					key={String(filter.key)}
					className="w-44"
					value={values[String(filter.key)] ?? ""}
					placeholder={filter.placeholder ?? filter.label}
					options={filter.options}
					isOptionDisabled={(option) => option.disabled === true}
					isDisabled={disabled}
					onChange={(value) => onChange(String(filter.key), value)}
				/>
			))}

			{actions}
		</div>
	);
}
