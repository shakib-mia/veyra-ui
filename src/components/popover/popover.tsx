import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
	type ButtonHTMLAttributes,
	type HTMLAttributes,
	type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

interface PopoverContextValue {
	open: boolean;
	setOpen: (open: boolean) => void;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

const usePopover = () => {
	const context = useContext(PopoverContext);

	if (!context) {
		throw new Error("Popover components must be used inside Popover.");
	}

	return context;
};

export interface PopoverProps {
	children: ReactNode;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

const Popover = ({
	children,
	open: controlledOpen,
	defaultOpen = false,
	onOpenChange,
}: PopoverProps) => {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

	const isControlled = controlledOpen !== undefined;

	const open = isControlled ? controlledOpen : uncontrolledOpen;

	const setOpen = (nextOpen: boolean) => {
		if (!isControlled) {
			setUncontrolledOpen(nextOpen);
		}

		onOpenChange?.(nextOpen);
	};

	return (
		<PopoverContext.Provider value={{ open, setOpen }}>
			<div className="relative inline-block">{children}</div>
		</PopoverContext.Provider>
	);
};

export interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const PopoverTrigger = ({
	children,
	className,
	...props
}: PopoverTriggerProps) => {
	const { open, setOpen } = usePopover();

	return (
		<button
			type="button"
			aria-haspopup="dialog"
			aria-expanded={open}
			className={className}
			onClick={() => setOpen(!open)}
			{...props}
		>
			{children}
		</button>
	);
};

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	align?: "start" | "center" | "end";
	side?: "top" | "bottom";
}

const PopoverContent = ({
	children,
	className,
	align = "start",
	side = "bottom",
	...props
}: PopoverContentProps) => {
	const { open, setOpen } = usePopover();

	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;

		const handlePointerDown = (event: PointerEvent) => {
			const target = event.target;

			if (
				target instanceof Node &&
				!contentRef.current?.contains(target)
			) {
				setOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpen(false);
			}
		};

		document.addEventListener("pointerdown", handlePointerDown);

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("pointerdown", handlePointerDown);

			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open, setOpen]);

	if (!open) return null;

	return (
		<div
			ref={contentRef}
			role="dialog"
			className={cn(
				"absolute z-50 w-72",
				"rounded-lg border border-border",
				"bg-popover p-4 text-popover-foreground",
				"shadow-md",
				side === "bottom" ? "top-full mt-2" : "bottom-full mb-2",
				align === "start" && "left-0",
				align === "center" && "left-1/2 -translate-x-1/2",
				align === "end" && "right-0",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export interface PopoverHeaderProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const PopoverHeader = ({
	children,
	className,
	...props
}: PopoverHeaderProps) => {
	return (
		<div className={cn("mb-3 flex flex-col gap-1", className)} {...props}>
			{children}
		</div>
	);
};

export interface PopoverTitleProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
}

const PopoverTitle = ({ children, className, ...props }: PopoverTitleProps) => {
	return (
		<h3
			className={cn("text-sm font-semibold text-foreground", className)}
			{...props}
		>
			{children}
		</h3>
	);
};

export interface PopoverDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
	children: ReactNode;
}

const PopoverDescription = ({
	children,
	className,
	...props
}: PopoverDescriptionProps) => {
	return (
		<p
			className={cn("text-xs text-muted-foreground", className)}
			{...props}
		>
			{children}
		</p>
	);
};

export {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverTitle,
	PopoverDescription,
};
