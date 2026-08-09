import { forwardRef, type LabelHTMLAttributes, type ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";
import { labelVariants } from "./label.variants";

export interface LabelProps
	extends
		LabelHTMLAttributes<HTMLLabelElement>,
		VariantProps<typeof labelVariants> {
	required?: boolean;
	children: ReactNode;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
	({ className, size, required = false, children, ...props }, ref) => {
		return (
			<label
				ref={ref}
				className={cn(labelVariants({ size }), className)}
				{...props}
			>
				{children}

				{required && (
					<span aria-hidden="true" className="text-danger">
						*
					</span>
				)}
			</label>
		);
	},
);

Label.displayName = "Label";

export { Label };
