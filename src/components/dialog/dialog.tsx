import {
	createContext,
	forwardRef,
	useContext,
	useEffect,
	type HTMLAttributes,
	type ReactNode,
} from "react";

import { X } from "lucide-react";

import { cn } from "../../lib/cn";

// -----------------------------------------------------------------------------
// Dialog Context
// -----------------------------------------------------------------------------

interface DialogContextValue {
	onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

const useDialogContext = () => {
	const context = useContext(DialogContext);

	if (!context) {
		throw new Error("Dialog components must be used inside a <Dialog>.");
	}

	return context;
};

// -----------------------------------------------------------------------------
// Dialog
// -----------------------------------------------------------------------------

export interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
	useEffect(() => {
		if (!open) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onOpenChange(false);
			}
		};

		const originalOverflow = document.body.style.overflow;

		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = originalOverflow;
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open, onOpenChange]);

	if (!open) return null;

	return (
		<DialogContext.Provider value={{ onOpenChange }}>
			<div
				className="fixed inset-0 z-50 flex items-center justify-center p-4"
				aria-modal="true"
				role="dialog"
			>
				<div
					aria-hidden="true"
					className="absolute inset-0 h-screen bg-slate-950/40 backdrop-blur-[2px]"
					onMouseDown={() => onOpenChange(false)}
				/>

				{children}
			</div>
		</DialogContext.Provider>
	);
};

// -----------------------------------------------------------------------------
// Dialog Content
// -----------------------------------------------------------------------------

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	showClose?: boolean;
}

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
	({ className, children, showClose = true, ...props }, ref) => {
		const { onOpenChange } = useDialogContext();

		return (
			<div
				ref={ref}
				className={cn(
					"relative z-10 flex max-h-[90vh] w-full overflow-y-hidden max-w-lg flex-col",
					"rounded-xl border border-border",
					"bg-card text-card-foreground",
					"shadow-lg",
					"animate-in fade-in zoom-in-95",
					"duration-normal",
					className,
				)}
				onMouseDown={(event) => event.stopPropagation()}
				{...props}
			>
				{showClose && (
					<button
						type="button"
						aria-label="Close dialog"
						onClick={() => onOpenChange(false)}
						className={cn(
							"absolute right-4 top-4",
							"inline-flex size-8 items-center justify-center",
							"rounded-md",
							"text-muted-foreground",
							"transition-colors",
							"hover:bg-secondary",
							"hover:text-foreground",
							"focus-visible:outline-none",
							"focus-visible:ring-2",
							"focus-visible:ring-ring",
						)}
					>
						<X size={18} aria-hidden="true" />
					</button>
				)}

				{children}
			</div>
		);
	},
);

DialogContent.displayName = "DialogContent";

// -----------------------------------------------------------------------------
// Dialog Header
// -----------------------------------------------------------------------------

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const DialogHeader = ({ className, children, ...props }: DialogHeaderProps) => {
	return (
		<div
			className={cn(
				"flex flex-col gap-1.5",
				"border-b border-border",
				"px-6 py-5",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

// -----------------------------------------------------------------------------
// Dialog Title
// -----------------------------------------------------------------------------

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
}

const DialogTitle = ({ className, children, ...props }: DialogTitleProps) => {
	return (
		<h2
			className={cn(
				"pr-8 text-lg font-semibold",
				"leading-none text-foreground",
				className,
			)}
			{...props}
		>
			{children}
		</h2>
	);
};

// -----------------------------------------------------------------------------
// Dialog Description
// -----------------------------------------------------------------------------

export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
	children: ReactNode;
}

const DialogDescription = ({
	className,
	children,
	...props
}: DialogDescriptionProps) => {
	return (
		<p
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		>
			{children}
		</p>
	);
};

// -----------------------------------------------------------------------------
// Dialog Body
// -----------------------------------------------------------------------------

export interface DialogBodyProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const DialogBody = ({ className, children, ...props }: DialogBodyProps) => {
	return (
		<div
			className={cn(
				"min-h-0 flex-1 overflow-y-auto px-6 py-5",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

// -----------------------------------------------------------------------------
// Dialog Footer
// -----------------------------------------------------------------------------

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const DialogFooter = ({ className, children, ...props }: DialogFooterProps) => {
	return (
		<div
			className={cn(
				"flex items-center justify-end gap-3",
				"border-t border-border",
				"px-6 py-4",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogBody,
	DialogFooter,
};
