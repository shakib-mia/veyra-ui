import type { FormHTMLAttributes, ReactNode } from "react";

import { Button } from "../button/button";

import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../dialog/dialog";

export interface FormDialogProps extends Omit<
	FormHTMLAttributes<HTMLFormElement>,
	"onSubmit"
> {
	open: boolean;
	onOpenChange: (open: boolean) => void;

	title: string;
	description?: string;

	children: ReactNode;

	onSubmit?: () => void;

	submitLabel?: string;
	cancelLabel?: string;

	loading?: boolean;
	disabled?: boolean;

	showClose?: boolean;
	showFooter?: boolean;
}

export default function FormDialog({
	open,
	onOpenChange,
	title,
	description,
	children,
	onSubmit,
	submitLabel = "Save",
	cancelLabel = "Cancel",
	loading = false,
	disabled = false,
	showClose = true,
	showFooter = true,
	className,
	...formProps
}: FormDialogProps) {
	const handleOpenChange = (nextOpen: boolean) => {
		// Prevent closing while submitting
		if (!nextOpen && loading) {
			return;
		}

		onOpenChange(nextOpen);
	};

	const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (loading || disabled) {
			return;
		}

		onSubmit?.();
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent showClose={showClose} className="max-w-2xl">
				<form
					className={className}
					onSubmit={handleSubmit}
					{...formProps}
				>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>

						{description && (
							<DialogDescription>{description}</DialogDescription>
						)}
					</DialogHeader>

					<DialogBody>{children}</DialogBody>

					{showFooter && (
						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								disabled={loading}
								onClick={() => handleOpenChange(false)}
							>
								{cancelLabel}
							</Button>

							<Button
								type="submit"
								disabled={disabled || loading}
								loading={loading}
							>
								{submitLabel}
							</Button>
						</DialogFooter>
					)}
				</form>
			</DialogContent>
		</Dialog>
	);
}
