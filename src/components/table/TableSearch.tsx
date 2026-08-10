import { Search } from "lucide-react";

interface TableSearchProps {
	value: string;
	placeholder?: string;
	onChange: (value: string) => void;
	disabled?: boolean;
}

export default function TableSearch({
	value,
	placeholder = "Search...",
	onChange,
	disabled,
}: TableSearchProps) {
	return (
		<div className="relative w-full">
			<Search
				size={17}
				className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
			/>

			<input
				type="text"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				disabled={disabled}
				className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
			/>
		</div>
	);
}
