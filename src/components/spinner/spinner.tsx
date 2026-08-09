import type { HTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "../../lib/cn";

export type SpinnerSize = "sm" | "md" | "lg" | "xl";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
	size?: SpinnerSize;
}

const sizeStyles: Record<SpinnerSize, string> = {
	sm: "size-4",
	md: "size-5",
	lg: "size-7",
	xl: "size-10",
};

const Spinner = ({ size = "md", className, ...props }: SpinnerProps) => {
	return (
		<div
			role="status"
			aria-label="Loading"
			className={cn(
				"inline-flex shrink-0 items-center justify-center",
				className,
			)}
			{...props}
		>
			<Loader2
				aria-hidden="true"
				className={cn("animate-spin text-primary", sizeStyles[size])}
			/>
		</div>
	);
};

export { Spinner };
