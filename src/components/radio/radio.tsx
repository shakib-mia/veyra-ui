import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { Circle } from "lucide-react";

import { cn } from "../../lib/cn";
import { radioVariants } from "./radio.variants";

export interface RadioProps
	extends
		Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
		VariantProps<typeof radioVariants> {
	label?: ReactNode;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
	({ className, size, label, disabled, ...props }, ref) => {
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
						type="radio"
						className={cn(radioVariants({ size }), className)}
						disabled={disabled}
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
						<Circle
							className="size-2 fill-current"
							strokeWidth={0}
						/>
					</span>
				</span>

				{label && (
					<span
						className={cn(
							"select-none text-sm text-foreground",
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

Radio.displayName = "Radio";

export { Radio };
