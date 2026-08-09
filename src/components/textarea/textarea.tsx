import { forwardRef, type TextareaHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";
import { textareaVariants } from "./textarea.variants";

export interface TextareaProps
	extends
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		VariantProps<typeof textareaVariants> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, size, ...props }, ref) => {
		return (
			<textarea
				ref={ref}
				className={cn(
					textareaVariants({
						size,
					}),
					className,
				)}
				{...props}
			/>
		);
	},
);

Textarea.displayName = "Textarea";

export { Textarea };
