import { forwardRef, type InputHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";
import { inputVariants } from "./input.variants";

export interface InputProps
	extends
		Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
		VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, size, ...props }, ref) => {
		return (
			<input
				ref={ref}
				className={cn(
					inputVariants({
						size,
					}),
					className,
				)}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";

export { Input };
