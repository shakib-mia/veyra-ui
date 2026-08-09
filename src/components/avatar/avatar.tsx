import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
	src?: string;
	alt?: string;
	fallback?: ReactNode;
	size?: AvatarSize;
}

const sizeStyles: Record<AvatarSize, string> = {
	sm: "size-7 text-xs",
	md: "size-9 text-sm",
	lg: "size-11 text-base",
	xl: "size-14 text-lg",
};

const Avatar = ({
	src,
	alt = "",
	fallback,
	size = "md",
	className,
	...props
}: AvatarProps) => {
	return (
		<div
			className={cn(
				"relative flex shrink-0 items-center justify-center",
				"overflow-hidden rounded-full",
				"bg-secondary text-secondary-foreground",
				"font-medium",
				sizeStyles[size],
				className,
			)}
			{...props}
		>
			{src ? (
				<img src={src} alt={alt} className="size-full object-cover" />
			) : (
				fallback
			)}
		</div>
	);
};

export { Avatar };
