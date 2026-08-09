import {
	createContext,
	forwardRef,
	useContext,
	useId,
	useState,
	type InputHTMLAttributes,
	type ReactNode,
} from "react";

import { cn } from "../../lib/cn";
import { radioGroupItemVariants } from "./radio-group.variants";

type RadioGroupContextValue = {
	value?: string;
	onValueChange: (value: string) => void;
	name: string;
	disabled?: boolean;
	size: "sm" | "md" | "lg";
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	name?: string;
	disabled?: boolean;
	size?: "sm" | "md" | "lg";
	className?: string;
	children: ReactNode;
}

export const RadioGroup = ({
	value,
	defaultValue = "",
	onValueChange,
	name,
	disabled = false,
	size = "md",
	className,
	children,
}: RadioGroupProps) => {
	const generatedName = useId();
	const [internalValue, setInternalValue] = useState(defaultValue);

	const isControlled = value !== undefined;
	const selectedValue = isControlled ? value : internalValue;

	const handleValueChange = (nextValue: string) => {
		if (disabled) return;

		if (!isControlled) {
			setInternalValue(nextValue);
		}

		onValueChange?.(nextValue);
	};

	return (
		<RadioGroupContext.Provider
			value={{
				value: selectedValue,
				onValueChange: handleValueChange,
				name: name ?? generatedName,
				disabled,
				size,
			}}
		>
			<div
				role="radiogroup"
				className={cn("flex flex-col gap-3", className)}
			>
				{children}
			</div>
		</RadioGroupContext.Provider>
	);
};

export interface RadioGroupItemProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"type" | "name" | "size"
> {
	value: string;
	label?: ReactNode;
	description?: ReactNode;
}

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
	({ value, label, description, className, disabled, id, ...props }, ref) => {
		const context = useContext(RadioGroupContext);

		const generatedId = useId();

		if (!context) {
			throw new Error("RadioGroupItem must be used inside RadioGroup.");
		}

		const itemId = id ?? generatedId;

		const descriptionId = description ? `${itemId}-description` : undefined;

		const isDisabled = context.disabled || disabled;
		const isChecked = context.value === value;

		const indicatorSize = {
			sm: "size-1.5",
			md: "size-2",
			lg: "size-2.5",
		}[context.size];

		return (
			<label
				htmlFor={itemId}
				className={cn(
					"group flex items-start gap-3",
					isDisabled ? "cursor-not-allowed" : "cursor-pointer",
				)}
			>
				<span className="relative mt-0.5 grid shrink-0 place-items-center">
					<input
						{...props}
						ref={ref}
						id={itemId}
						type="radio"
						name={context.name}
						value={value}
						checked={isChecked}
						disabled={isDisabled}
						aria-describedby={descriptionId}
						className={cn(
							radioGroupItemVariants({
								size: context.size,
							}),
							"appearance-none",
							className,
						)}
						onChange={() => context.onValueChange(value)}
					/>

					<span
						aria-hidden="true"
						className={cn(
							"pointer-events-none absolute rounded-full bg-primary",
							"scale-0 transition-transform duration-fast",
							isChecked && "scale-100",
							indicatorSize,
						)}
					/>
				</span>

				{(label || description) && (
					<span className="flex flex-col">
						{label && (
							<span
								className={cn(
									"text-sm font-medium text-foreground",
									isDisabled && "opacity-50",
								)}
							>
								{label}
							</span>
						)}

						{description && (
							<span
								id={descriptionId}
								className={cn(
									"mt-0.5 text-xs text-muted-foreground",
									isDisabled && "opacity-50",
								)}
							>
								{description}
							</span>
						)}
					</span>
				)}
			</label>
		);
	},
);

RadioGroupItem.displayName = "RadioGroupItem";
