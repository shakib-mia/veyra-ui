import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface FilterChip {
	key: string;
	label: string;
	value: string;
	valueLabel?: ReactNode;
}

interface FilterChipsProps {
	filters: FilterChip[];
	onRemove: (key: string) => void;
	onClear?: () => void;
	clearLabel?: string;
	className?: string;
}

export default function FilterChips({
	filters,
	onRemove,
	onClear,
	clearLabel = "Clear all",
	className,
}: FilterChipsProps) {
	if (filters.length === 0) {
		return null;
	}

	return (
		<div className={cn("flex flex-wrap items-center gap-2", className)}>
			{filters.map((filter) => (
				<div
					key={filter.key}
					className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2.5 py-1.5 text-sm"
				>
					<span className="shrink-0 text-muted-foreground">
						{filter.label}:
					</span>

					<span className="truncate font-medium text-foreground">
						{filter.valueLabel ?? filter.value}
					</span>

					<button
						type="button"
						onClick={() => onRemove(filter.key)}
						className="ml-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
						aria-label={`Remove ${filter.label} filter`}
					>
						<X size={14} />
					</button>
				</div>
			))}

			{onClear && filters.length > 0 && (
				<button
					type="button"
					onClick={onClear}
					className="px-1 text-sm font-medium text-primary hover:underline"
				>
					{clearLabel}
				</button>
			)}
		</div>
	);
}
