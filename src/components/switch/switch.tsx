import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";
import { switchVariants } from "./switch.variants";

export interface SwitchProps
	extends
		Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
		VariantProps<typeof switchVariants> {
	label?: ReactNode;
	description?: ReactNode;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
	({ className, size, label, description, disabled, ...props }, ref) => {
		const trackSize = {
			sm: "h-5 w-9",
			md: "h-6 w-11",
			lg: "h-7 w-[52px]",
		}[size ?? "md"];

		const thumbSize = {
			sm: "size-3.5",
			md: "size-4.5",
			lg: "size-5.5",
		}[size ?? "md"];

		const thumbPosition = {
			sm: "peer-checked:translate-x-4",
			md: "peer-checked:translate-x-5",
			lg: "peer-checked:translate-x-6",
		}[size ?? "md"];

		return (
			<label
				className={cn(
					"group flex w-fit items-center gap-3",
					disabled ? "cursor-not-allowed" : "cursor-pointer",
				)}
			>
				<span
					className={cn(
						"relative inline-flex shrink-0 items-center rounded-full",
						"bg-secondary",
						"transition-colors duration-fast ease-default",
						"has-checked:bg-primary",
						trackSize,
						disabled && "opacity-50",
					)}
				>
					<input
						ref={ref}
						type="checkbox"
						role="switch"
						className={cn(switchVariants({ size }), className)}
						disabled={disabled}
						{...props}
					/>

					<span
						aria-hidden="true"
						className={cn(
							"pointer-events-none absolute left-0.5 top-1/2",
							"-translate-y-1/2",
							"rounded-full bg-white shadow-sm",
							"transition-transform duration-fast ease-default",
							thumbSize,
							thumbPosition,
						)}
					/>
				</span>

				{(label || description) && (
					<span className="flex flex-col">
						{label && (
							<span
								className={cn(
									"select-none text-sm font-medium text-foreground",
									"group-has-disabled:opacity-50",
								)}
							>
								{label}
							</span>
						)}

						{description && (
							<span
								className={cn(
									"mt-0.5 text-xs text-muted-foreground",
									"group-has-disabled:opacity-50",
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

Switch.displayName = "Switch";

export { Switch };
