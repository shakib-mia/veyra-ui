import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";
import { badgeVariants } from "./badge.variants";

export interface BadgeProps
	extends
		HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof badgeVariants> {}

const Badge = ({ variant, className, children, ...props }: BadgeProps) => {
	return (
		<span
			className={cn(
				badgeVariants({
					variant,
				}),
				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
};

export { Badge };
