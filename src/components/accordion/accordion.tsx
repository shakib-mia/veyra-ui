import {
	createContext,
	useContext,
	useState,
	type ButtonHTMLAttributes,
	type HTMLAttributes,
	type ReactNode,
} from "react";

import { cn } from "../../lib/cn";
import { ChevronDown } from "lucide-react";

interface AccordionContextValue {
	value: string | null;
	setValue: (value: string | null) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordion = () => {
	const context = useContext(AccordionContext);

	if (!context) {
		throw new Error("Accordion components must be used inside Accordion.");
	}

	return context;
};

export interface AccordionProps {
	defaultValue?: string;
	value?: string;
	onValueChange?: (value: string | null) => void;
	children: ReactNode;
	className?: string;
}

const Accordion = ({
	defaultValue = "",
	value: controlledValue,
	onValueChange,
	children,
	className,
}: AccordionProps) => {
	const [internalValue, setInternalValue] = useState<string | null>(
		defaultValue || null,
	);

	const isControlled = controlledValue !== undefined;

	const currentValue = isControlled ? controlledValue || null : internalValue;

	const setValue = (nextValue: string | null) => {
		if (!isControlled) {
			setInternalValue(nextValue);
		}

		onValueChange?.(nextValue);
	};

	return (
		<AccordionContext.Provider
			value={{
				value: currentValue,
				setValue,
			}}
		>
			<div
				className={cn(
					"w-full divide-y divide-border rounded-lg border border-border bg-card",
					className,
				)}
			>
				{children}
			</div>
		</AccordionContext.Provider>
	);
};

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
	value: string;
	children: ReactNode;
}

const AccordionItem = ({
	// value,
	children,
	className,
	...props
}: AccordionItemProps) => {
	return (
		<div className={cn("w-full", className)} {...props}>
			{children}
		</div>
	);
};

export interface AccordionTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	value: string;
	children: ReactNode;
}

const AccordionTrigger = ({
	value,
	children,
	className,
	...props
}: AccordionTriggerProps) => {
	const { value: currentValue, setValue } = useAccordion();

	const isOpen = currentValue === value;

	return (
		<button
			type="button"
			aria-expanded={isOpen}
			className={cn(
				"flex w-full items-center justify-between",
				"px-4 py-3",
				"text-left text-sm font-medium",
				"text-foreground",
				"transition-colors",
				"hover:bg-secondary/60",
				"focus-visible:outline-none",
				"focus-visible:ring-2",
				"focus-visible:ring-inset",
				"focus-visible:ring-ring",
				className,
			)}
			onClick={() => setValue(isOpen ? null : value)}
			{...props}
		>
			<span>{children}</span>

			<span
				aria-hidden="true"
				className={cn(
					"text-muted-foreground transition-transform duration-normal",
					isOpen && "rotate-180",
				)}
			>
				<ChevronDown />
			</span>
		</button>
	);
};

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
	value: string;
	children: ReactNode;
}

const AccordionContent = ({
	value,
	children,
	className,
	...props
}: AccordionContentProps) => {
	const { value: currentValue } = useAccordion();

	if (currentValue !== value) {
		return null;
	}

	return (
		<div
			role="region"
			className={cn(
				"border-t border-border",
				"px-4 py-4",
				"text-sm text-foreground",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
