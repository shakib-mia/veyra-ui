import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const Card = ({ className, children, ...props }: CardProps) => {
	return (
		<div
			className={cn(
				"rounded-xl border border-border bg-card text-card-foreground shadow-sm",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const CardHeader = ({ className, children, ...props }: CardHeaderProps) => {
	return (
		<div
			className={cn(
				"flex flex-col gap-1.5 border-b border-border px-6 py-4",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
}

const CardTitle = ({ className, children, ...props }: CardTitleProps) => {
	return (
		<h3
			className={cn(
				"text-lg font-semibold leading-none tracking-tight text-foreground",
				className,
			)}
			{...props}
		>
			{children}
		</h3>
	);
};

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
	children: ReactNode;
}

const CardDescription = ({
	className,
	children,
	...props
}: CardDescriptionProps) => {
	return (
		<p
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		>
			{children}
		</p>
	);
};

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const CardContent = ({ className, children, ...props }: CardContentProps) => {
	return (
		<div className={cn("p-6", className)} {...props}>
			{children}
		</div>
	);
};

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const CardFooter = ({ className, children, ...props }: CardFooterProps) => {
	return (
		<div
			className={cn(
				"flex items-center justify-end gap-3 border-t border-border px-6 py-4",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
};
