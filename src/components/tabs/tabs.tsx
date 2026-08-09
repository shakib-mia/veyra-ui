import {
	createContext,
	useContext,
	useState,
	type ButtonHTMLAttributes,
	type HTMLAttributes,
	type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

interface TabsContextValue {
	value: string;
	setValue: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabs = () => {
	const context = useContext(TabsContext);

	if (!context) {
		throw new Error("Tabs components must be used inside Tabs.");
	}

	return context;
};

export interface TabsProps {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	children: ReactNode;
	className?: string;
}

const Tabs = ({
	value: controlledValue,
	defaultValue = "",
	onValueChange,
	children,
	className,
}: TabsProps) => {
	const [internalValue, setInternalValue] = useState(defaultValue);

	const isControlled = controlledValue !== undefined;

	const value = isControlled ? controlledValue : internalValue;

	const setValue = (nextValue: string) => {
		if (!isControlled) {
			setInternalValue(nextValue);
		}

		onValueChange?.(nextValue);
	};

	return (
		<TabsContext.Provider value={{ value, setValue }}>
			<div className={cn("w-full", className)}>{children}</div>
		</TabsContext.Provider>
	);
};

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const TabsList = ({ className, children, ...props }: TabsListProps) => {
	return (
		<div
			role="tablist"
			className={cn(
				"inline-flex items-center gap-1",
				"rounded-lg bg-secondary p-1",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	value: string;
	children: ReactNode;
}

const TabsTrigger = ({
	value,
	children,
	className,
	disabled,
	...props
}: TabsTriggerProps) => {
	const tabs = useTabs();

	const active = tabs.value === value;

	return (
		<button
			type="button"
			role="tab"
			aria-selected={active}
			disabled={disabled}
			className={cn(
				"inline-flex items-center justify-center",
				"rounded-md px-3 py-1.5",
				"text-sm font-medium",
				"whitespace-nowrap",
				"transition-colors",
				"outline-none",
				"focus-visible:ring-2",
				"focus-visible:ring-ring",
				active
					? "bg-card text-foreground shadow-sm"
					: "text-muted-foreground hover:text-foreground",
				"disabled:pointer-events-none",
				"disabled:opacity-50",
				className,
			)}
			onClick={() => tabs.setValue(value)}
			{...props}
		>
			{children}
		</button>
	);
};

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
	value: string;
	children: ReactNode;
}

const TabsContent = ({
	value,
	children,
	className,
	...props
}: TabsContentProps) => {
	const tabs = useTabs();

	if (tabs.value !== value) {
		return null;
	}

	return (
		<div
			role="tabpanel"
			tabIndex={0}
			className={cn("mt-4 outline-none", className)}
			{...props}
		>
			{children}
		</div>
	);
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
