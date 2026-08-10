import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";

import "react-day-picker/style.css";
import { cn } from "../../lib/cn";

interface DatePickerProps {
	value?: Date;
	onChange?: (date: Date | undefined) => void;

	placeholder?: string;
	disabled?: boolean;

	minDate?: Date;
	maxDate?: Date;

	className?: string;
}

export default function DatePicker({
	value,
	onChange,
	placeholder = "Select date",
	disabled = false,
	minDate,
	maxDate,
	className,
}: DatePickerProps) {
	const [open, setOpen] = useState(false);
	console.log(value);

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
						value ? "text-foreground" : "text-muted-foreground",
					)}
				>
					{value ? format(value, "dd MMM yyyy") : placeholder}
				</span>

				<CalendarDays size={17} className="text-muted-foreground" />
			</button>

			{open && !disabled && (
				<div className="absolute left-0 top-full z-50 mt-2 rounded-lg border border-border bg-background p-3 shadow-lg">
					<DayPicker
						mode="single"
						selected={value}
						onSelect={(date) => {
							onChange?.(date);
							setOpen(false);
						}}
						disabled={[
							...(minDate
								? [
										{
											before: minDate,
										},
									]
								: []),

							...(maxDate
								? [
										{
											after: maxDate,
										},
									]
								: []),
						]}
					/>
				</div>
			)}
		</div>
	);
}
