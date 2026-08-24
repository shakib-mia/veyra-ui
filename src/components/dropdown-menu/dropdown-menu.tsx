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

import { Check, ChevronRight } from "lucide-react";

import { cn } from "../../lib/cn";
import { createPortal } from "react-dom";

type DropdownContextValue = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

const useDropdown = () => {
	const context = useContext(DropdownContext);

	if (!context) {
		throw new Error(
			"Dropdown components must be used inside DropdownMenu.",
		);
	}

	return context;
};

export interface DropdownMenuProps {
	children: ReactNode;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

const DropdownMenu = ({
	children,
	open: controlledOpen,
	defaultOpen = false,
	onOpenChange,
}: DropdownMenuProps) => {
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
		<DropdownContext.Provider value={{ open, setOpen }}>
			<div className="relative inline-block">{children}</div>
		</DropdownContext.Provider>
	);
};

export interface DropdownMenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const DropdownMenuTrigger = ({
	children,
	className,
	...props
}: DropdownMenuTriggerProps) => {
	const { open, setOpen } = useDropdown();

	return (
		<button
			type="button"
			aria-haspopup="menu"
			aria-expanded={open}
			className={className}
			onClick={() => setOpen(!open)}
			{...props}
		>
			{children}
		</button>
	);
};

export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	align?: "start" | "center" | "end";
}

export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	align?: "start" | "center" | "end";
}

const DropdownMenuContent = ({
	children,
	className,
	align = "start",
	...props
}: DropdownMenuContentProps) => {
	const { open, setOpen } = useDropdown();

	const contentRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLElement | null>(null);

	const [position, setPosition] = useState({
		top: 0,
		left: 0,
	});

	useEffect(() => {
		if (!open) return;

		const trigger = document.activeElement;

		if (trigger instanceof HTMLElement) {
			triggerRef.current = trigger;
		}

		const updatePosition = () => {
			const triggerElement = triggerRef.current;

			if (!triggerElement) return;

			const rect = triggerElement.getBoundingClientRect();

			const gap = 8;

			let top = rect.bottom + gap;
			let left = rect.left;

			if (align === "center") {
				left = rect.left + rect.width / 2;
			}

			if (align === "end") {
				left = rect.right;
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
	}, [open, align]);

	useEffect(() => {
		if (!open) return;

		const handlePointerDown = (event: PointerEvent) => {
			const target = event.target;

			if (
				target instanceof Node &&
				!contentRef.current?.contains(target) &&
				!triggerRef.current?.contains(target)
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

	const alignmentClass =
		align === "start"
			? "-translate-x-0"
			: align === "center"
				? "-translate-x-1/2"
				: "-translate-x-full";

	return createPortal(
		<div
			ref={contentRef}
			role="menu"
			className={cn(
				"fixed z-9999 min-w-48",
				"rounded-lg border border-border",
				"bg-popover p-1",
				"shadow-md",
				alignmentClass,
				className,
			)}
			style={{
				top: position.top,
				left: position.left,
			}}
			{...props}
		>
			{children}
		</div>,
		document.body,
	);
};
interface DropdownMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	inset?: boolean;
}

const DropdownMenuItem = ({
	children,
	className,
	inset = false,
	disabled,
	onClick,
	...props
}: DropdownMenuItemProps) => {
	const { setOpen } = useDropdown();

	return (
		<button
			type="button"
			role="menuitem"
			disabled={disabled}
			className={cn(
				"flex w-full items-center gap-2",
				"rounded-md px-3 py-2",
				"text-sm text-foreground",
				"text-left",
				"outline-none",
				"transition-colors",
				"hover:bg-secondary",
				"focus-visible:bg-secondary",
				"disabled:pointer-events-none",
				"disabled:opacity-50",
				inset && "pl-8",
				className,
			)}
			onClick={(event) => {
				onClick?.(event);

				if (!event.defaultPrevented) {
					setOpen(false);
				}
			}}
			{...props}
		>
			{children}
		</button>
	);
};

interface DropdownMenuCheckboxItemProps extends Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	"checked"
> {
	children: ReactNode;
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
}

const DropdownMenuCheckboxItem = ({
	children,
	checked = false,
	onCheckedChange,
	className,
	...props
}: DropdownMenuCheckboxItemProps) => {
	return (
		<button
			type="button"
			role="menuitemcheckbox"
			aria-checked={checked}
			className={cn(
				"flex w-full items-center gap-2",
				"rounded-md px-3 py-2",
				"text-sm text-foreground",
				"text-left",
				"outline-none",
				"hover:bg-secondary",
				"focus-visible:bg-secondary",
				className,
			)}
			onClick={() => onCheckedChange?.(!checked)}
			{...props}
		>
			<span className="flex size-4 items-center justify-center">
				{checked && <Check size={14} aria-hidden="true" />}
			</span>

			{children}
		</button>
	);
};

interface DropdownMenuLabelProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const DropdownMenuLabel = ({
	children,
	className,
	...props
}: DropdownMenuLabelProps) => {
	return (
		<div
			className={cn(
				"px-3 py-2 text-xs font-semibold",
				"text-muted-foreground",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

const DropdownMenuSeparator = ({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			role="separator"
			className={cn("my-1 h-px bg-border", className)}
			{...props}
		/>
	);
};

interface DropdownMenuSubProps {
	children: ReactNode;
}

const DropdownMenuSub = ({ children }: DropdownMenuSubProps) => {
	return <div className="relative">{children}</div>;
};

interface DropdownMenuSubTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const DropdownMenuSubTrigger = ({
	children,
	className,
	...props
}: DropdownMenuSubTriggerProps) => {
	return (
		<button
			type="button"
			role="menuitem"
			className={cn(
				"flex w-full items-center justify-between",
				"rounded-md px-3 py-2",
				"text-sm text-foreground",
				"hover:bg-secondary",
				className,
			)}
			{...props}
		>
			{children}

			<ChevronRight size={16} aria-hidden="true" />
		</button>
	);
};

export {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
};
