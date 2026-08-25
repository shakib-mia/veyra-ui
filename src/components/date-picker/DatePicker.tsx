import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";

import "react-day-picker/style.css";
import { cn } from "../../lib/cn";

interface DatePickerProps {
	value?: Date;
	defaultValue?: Date;

	onChange?: (date: Date | undefined) => void;

	placeholder?: string;
	disabled?: boolean;

	minDate?: Date;
	maxDate?: Date;

	className?: string;
}

export default function DatePicker({
	value,
	defaultValue,
	onChange,
	placeholder = "Select date",
	disabled = false,
	minDate,
	maxDate,
	className,
}: DatePickerProps) {
	const [internalValue, setInternalValue] = useState<Date | undefined>(
		defaultValue,
	);

	const buttonRef = useRef<HTMLButtonElement>(null);
	const calendarRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({
		top: 0,
		left: 0,
	});

	const [open, setOpen] = useState(false);

	const updatePosition = () => {
		if (!buttonRef.current || !calendarRef.current) return;

		const buttonRect = buttonRef.current.getBoundingClientRect();
		const calendarRect = calendarRef.current.getBoundingClientRect();

		const gap = 8;

		let top = buttonRect.bottom + gap;
		let left = buttonRect.left;

		// --------------------------------
		// Vertical positioning
		// --------------------------------

		const spaceBelow = window.innerHeight - buttonRect.bottom;
		const spaceAbove = buttonRect.top;

		// নিচে পুরো calendar না ধরলে
		// এবং উপরে বেশি জায়গা থাকলে → উপরে দেখাবে
		if (
			spaceBelow < calendarRect.height + gap &&
			spaceAbove >= calendarRect.height + gap
		) {
			top = buttonRect.top - calendarRect.height - gap;
		}

		// --------------------------------
		// Horizontal positioning
		// --------------------------------

		// Right edge-এর বাইরে চলে গেলে
		if (left + calendarRect.width > window.innerWidth - gap) {
			left = window.innerWidth - calendarRect.width - gap;
		}

		// Left edge-এর বাইরে চলে গেলে
		if (left < gap) {
			left = gap;
		}

		// --------------------------------
		// Final vertical safety
		// --------------------------------

		if (top < gap) {
			top = gap;
		}

		if (top + calendarRect.height > window.innerHeight - gap) {
			top = window.innerHeight - calendarRect.height - gap;
		}

		setPosition({
			top,
			left,
		});
	};

	useEffect(() => {
		if (!open) return;

		requestAnimationFrame(() => {
			updatePosition();
		});

		window.addEventListener("resize", updatePosition);
		window.addEventListener("scroll", updatePosition, true);

		return () => {
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition, true);
		};
	}, [open]);

	/**
	 * Controlled vs uncontrolled
	 *
	 * If value is provided by parent,
	 * use parent's value.
	 *
	 * Otherwise use internal state.
	 */
	const selectedDate = value !== undefined ? value : internalValue;

	const handleChange = (date: Date | undefined) => {
		// Update internal state when uncontrolled
		if (value === undefined) {
			setInternalValue(date);
		}

		// Notify parent
		onChange?.(date);

		// Close calendar
		setOpen(false);
	};

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
						selectedDate
							? "text-foreground"
							: "text-muted-foreground",
					)}
				>
					{selectedDate
						? format(selectedDate, "dd MMM yyyy")
						: placeholder}
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
						selected={selectedDate}
						onSelect={handleChange}
						disabled={[
							...(minDate ? [{ before: minDate }] : []),
							...(maxDate ? [{ after: maxDate }] : []),
						]}
					/>
				</div>
			)}
		</div>
	);
}
