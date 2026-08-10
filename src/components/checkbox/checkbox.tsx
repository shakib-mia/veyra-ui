import {
	forwardRef,
	type ChangeEvent,
	type InputHTMLAttributes,
	type ReactNode,
} from "react";
import type { VariantProps } from "class-variance-authority";
import { Check, Minus } from "lucide-react";

import { cn } from "../../lib/cn";
import { checkboxVariants } from "./checkbox.variants";

export interface CheckboxProps
	extends
		Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange">,
		VariantProps<typeof checkboxVariants> {
	label?: ReactNode;
	indeterminate?: boolean;
	onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	(
		{
			className,
			size,
			label,
			indeterminate = false,
			checked,
			defaultChecked,
			disabled,
			onCheckedChange,
			...props
		},
		ref,
	) => {
		const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
			onCheckedChange?.(event.target.checked);
		};

		return (
			<label
				className={cn(
					"group inline-flex w-fit items-center gap-2",
					disabled ? "cursor-not-allowed" : "cursor-pointer",
				)}
			>
				<span className="relative inline-flex shrink-0">
					<input
						ref={ref}
						type="checkbox"
						className={cn(
							"peer",
							checkboxVariants({ size }),
							className,
						)}
						checked={checked}
						defaultChecked={defaultChecked}
						disabled={disabled}
						onChange={handleChange}
						{...props}
					/>

					<span
						aria-hidden="true"
						className={cn(
							"pointer-events-none absolute inset-0 flex items-center justify-center",
							"text-primary-foreground",
							"opacity-0 transition-opacity duration-fast",
							"peer-checked:opacity-100",
						)}
					>
						{indeterminate ? (
							<Minus className="size-3" strokeWidth={2.5} />
						) : (
							<Check className="size-3" strokeWidth={2.5} />
						)}
					</span>
				</span>

				{label && (
					<span
						className={cn(
							"text-sm text-foreground",
							"select-none",
							"group-has-disabled:cursor-not-allowed",
							"group-has-disabled:opacity-50",
						)}
					>
						{label}
					</span>
				)}
			</label>
		);
	},
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
