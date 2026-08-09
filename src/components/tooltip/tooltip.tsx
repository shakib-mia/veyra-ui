import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { cn } from "../../lib/cn";

export interface TooltipProps {
	content: ReactNode;
	children: ReactNode;
	side?: "top" | "right" | "bottom" | "left";
	delay?: number;
	className?: string;
}

const Tooltip = ({
	content,
	children,
	side = "top",
	delay = 150,
	className,
}: TooltipProps) => {
	const [open, setOpen] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const tooltipId = useId();

	const show = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			setOpen(true);
		}, delay);
	};

	const hide = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}

		setOpen(false);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const positionStyles = {
		top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
		right: "left-full top-1/2 ml-2 -translate-y-1/2",
		bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
		left: "right-full top-1/2 mr-2 -translate-y-1/2",
	};

	return (
		<span
			className="relative inline-flex"
			onMouseEnter={show}
			onMouseLeave={hide}
		>
			<span
				tabIndex={0}
				aria-describedby={open ? tooltipId : undefined}
				onFocus={show}
				onBlur={hide}
				className="inline-flex"
			>
				{children}
			</span>

			{open && (
				<span
					id={tooltipId}
					role="tooltip"
					className={cn(
						"pointer-events-none absolute z-50",
						"whitespace-nowrap",
						"rounded-md bg-foreground",
						"px-2.5 py-1.5",
						"text-xs font-medium text-background",
						"shadow-sm",
						"animate-in fade-in zoom-in-95",
						"duration-fast",
						positionStyles[side],
						className,
					)}
				>
					{content}
				</span>
			)}
		</span>
	);
};

export { Tooltip };
