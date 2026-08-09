import {
	forwardRef,
	type ComponentPropsWithoutRef,
	type ElementType,
	type ReactNode,
	type Ref,
} from "react";
import type { VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "../../lib/cn";
import { buttonVariants } from "./button.variants";

type ButtonOwnProps = VariantProps<typeof buttonVariants> & {
	children: ReactNode;
	loading?: boolean;
	className?: string;
};

export type ButtonProps<T extends ElementType = "button"> = ButtonOwnProps & {
	as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps | "as">;

type ButtonComponent = <T extends ElementType = "button">(
	props: ButtonProps<T> & {
		ref?: Ref<Element>;
	},
) => ReactNode;

const Button = forwardRef<
	HTMLElement,
	ButtonOwnProps & {
		as?: ElementType;
	}
>(
	(
		{
			as: Component = "button",
			variant,
			size,
			loading = false,
			children,
			className,
			...props
		},
		ref,
	) => {
		const isButton = Component === "button";

		if (isButton) {
			const buttonProps = props as ComponentPropsWithoutRef<"button">;

			return (
				<button
					{...buttonProps}
					ref={ref as Ref<HTMLButtonElement>}
					disabled={buttonProps.disabled || loading}
					aria-busy={loading || undefined}
					className={cn(
						buttonVariants({
							variant,
							size,
						}),
						className,
					)}
				>
					{loading && (
						<Loader2
							size={16}
							aria-hidden="true"
							className="shrink-0 animate-spin"
						/>
					)}

					{children}
				</button>
			);
		}

		return (
			<Component
				{...props}
				ref={ref}
				className={cn(
					buttonVariants({
						variant,
						size,
					}),
					className,
				)}
			>
				{children}
			</Component>
		);
	},
) as ButtonComponent;

export { Button };
