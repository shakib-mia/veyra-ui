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

const DropdownMenuContent = ({
	children,
	className,
	align = "start",
	...props
}: DropdownMenuContentProps) => {
	const { open, setOpen } = useDropdown();

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
			role="menu"
			className={cn(
				"absolute z-50 mt-2 min-w-48",
				"rounded-lg border border-border",
				"bg-popover p-1",
				"shadow-md",
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
