import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

	const buttonRef = useRef<HTMLButtonElement>(null);
	const calendarRef = useRef<HTMLDivElement>(null);

	const [position, setPosition] = useState({
		top: 0,
		left: 0,
	});

	useEffect(() => {
		if (!open || !buttonRef.current) return;

		const updatePosition = () => {
			const rect = buttonRef.current!.getBoundingClientRect();

			const calendarWidth = 320;
			const calendarHeight = 360;
			const gap = 8;

			let top = rect.bottom + gap;
			let left = rect.left;

			// Prevent going outside right edge
			if (left + calendarWidth > window.innerWidth) {
				left = window.innerWidth - calendarWidth - gap;
			}

			// Prevent going outside left edge
			if (left < gap) {
				left = gap;
			}

			// If there isn't enough space below,
			// show calendar above the button
			if (top + calendarHeight > window.innerHeight) {
				top = rect.top - calendarHeight - gap;
			}

			// Prevent going outside top edge
			if (top < gap) {
				top = gap;
			}

			setPosition({
				top,
				left,
			});
		};

		updatePosition();

		window.addEventListener("resize", updatePosition);
		window.addEventListener("scroll", updatePosition, true);

		return () => {
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition, true);
		};
	}, [open]);

	useEffect(() => {
		if (!open) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (
				buttonRef.current?.contains(target) ||
				calendarRef.current?.contains(target)
			) {
				return;
			}

			setOpen(false);
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open]);

	return (
		<div className="relative w-full">
			<button
				ref={buttonRef}
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
				<div
					ref={calendarRef}
					className="fixed z-9999 rounded-lg border border-border bg-background p-3 shadow-lg"
					style={{
						top: position.top,
						left: position.left,
					}}
				>
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
