import type { HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

const Skeleton = ({ className, ...props }: SkeletonProps) => {
	return (
		<div
			aria-hidden="true"
			className={cn("animate-pulse rounded-md bg-secondary", className)}
			{...props}
		/>
	);
};

export { Skeleton };
