import { ChevronRight, Home } from "lucide-react";
import type { ReactNode } from "react";

export interface BreadcrumbItem {
	label: ReactNode;
	href?: string;
}

interface BreadcrumbProps {
	items: BreadcrumbItem[];
	showHome?: boolean;
	homeHref?: string;

	/**
	 * Allows the consuming application to
	 * provide its own router link component.
	 *
	 * React Router:
	 * renderLink={({ href, children, className }) => (
	 *   <Link to={href} className={className}>
	 *     {children}
	 *   </Link>
	 * )}
	 *
	 * Next.js:
	 * renderLink={({ href, children, className }) => (
	 *   <Link href={href} className={className}>
	 *     {children}
	 *   </Link>
	 * )}
	 */
	renderLink?: (props: {
		href: string;
		children: ReactNode;
		className?: string;
	}) => ReactNode;
}

export default function Breadcrumb({
	items,
	showHome = true,
	homeHref = "/",
	renderLink,
}: BreadcrumbProps) {
	const linkClassName =
		"truncate text-muted-foreground transition-colors hover:text-foreground";

	const renderNavigationLink = (
		href: string,
		children: ReactNode,
		className?: string,
	) => {
		if (renderLink) {
			return renderLink({
				href,
				children,
				className,
			});
		}

		return (
			<a href={href} className={className}>
				{children}
			</a>
		);
	};

	return (
		<nav
			aria-label="Breadcrumb"
			className="flex min-w-0 items-center gap-1.5 text-sm"
		>
			{showHome && (
				<>
					{renderNavigationLink(
						homeHref,
						<Home size={15} />,
						"flex shrink-0 items-center text-muted-foreground transition-colors hover:text-foreground",
					)}

					<ChevronRight
						size={15}
						className="shrink-0 text-muted-foreground/60"
					/>
				</>
			)}

			{items.map((item, index) => {
				const isLast = index === items.length - 1;

				return (
					<div
						key={index}
						className="flex min-w-0 items-center gap-1.5"
					>
						{item.href && !isLast ? (
							renderNavigationLink(
								item.href,
								item.label,
								linkClassName,
							)
						) : (
							<span
								className={
									isLast
										? "truncate font-medium text-foreground"
										: "truncate text-muted-foreground"
								}
								aria-current={isLast ? "page" : undefined}
							>
								{item.label}
							</span>
						)}

						{!isLast && (
							<ChevronRight
								size={15}
								className="shrink-0 text-muted-foreground/60"
							/>
						)}
					</div>
				);
			})}
		</nav>
	);
}
