import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";

import "react-day-picker/style.css";
import { cn } from "../../main";

interface DateRangePickerProps {
	value?: DateRange;
	onChange?: (range: DateRange | undefined) => void;

	placeholder?: string;
	disabled?: boolean;

	minDate?: Date;
	maxDate?: Date;

	className?: string;
}

export default function DateRangePicker({
	value,
	onChange,
	placeholder = "Select date range",
	disabled = false,
	minDate,
	maxDate,
	className,
}: DateRangePickerProps) {
	const [open, setOpen] = useState(false);

	const displayValue = () => {
		if (!value?.from) {
			return placeholder;
		}

		if (!value.to) {
			return format(value.from, "dd MMM yyyy");
		}

		return `${format(value.from, "dd MMM yyyy")} - ${format(
			value.to,
			"dd MMM yyyy",
		)}`;
	};

	const disabledDays = [
		...(minDate ? [{ before: minDate }] : []),

		...(maxDate ? [{ after: maxDate }] : []),
	];

	return (
		<div className="relative w-full">
			<button
				type="button"
				disabled={disabled}
				onClick={() => setOpen((previous) => !previous)}
				className={cn(
					"flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors",
					"hover:border-primary/50",
					"focus:border-primary focus:ring-2 focus:ring-primary/20",
					"disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
			>
				<span
					className={cn(
						value?.from
							? "text-foreground"
							: "text-muted-foreground",
					)}
				>
					{displayValue()}
				</span>

				<CalendarDays size={17} className="text-muted-foreground" />
			</button>

			{open && !disabled && (
				<div className="absolute left-0 top-full z-50 mt-2 rounded-lg border border-border bg-background p-3 shadow-lg">
					<DayPicker
						mode="range"
						selected={value}
						onSelect={(range) => {
							onChange?.(range);

							if (range?.from && range?.to) {
								setOpen(false);
							}
						}}
						disabled={disabledDays}
					/>
				</div>
			)}
		</div>
	);
}
