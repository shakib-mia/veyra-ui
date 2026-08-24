import type { ReactNode } from "react";

import { Button, type ButtonProps } from "../button";

import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../dialog";

export interface ConfirmDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;

	title?: string;
	description?: string;
	message?: ReactNode;

	cancelText?: string;
	confirmText?: string;

	confirmVariant?: ButtonProps["variant"];

	loading?: boolean;

	onConfirm: () => void | Promise<void>;
}

export const ConfirmDialog = ({
	open,
	onOpenChange,

	title = "Are you sure?",
	description = "This action cannot be undone.",
	message,

	cancelText = "Cancel",
	confirmText = "Confirm",

	confirmVariant = "primary",

	loading = false,

	onConfirm,
}: ConfirmDialogProps) => {
	const handleConfirm = async () => {
		await onConfirm();
	};

	const handleCancel = () => {
		if (loading) {
			return;
		}

		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>

					{description && (
						<DialogDescription>{description}</DialogDescription>
					)}
				</DialogHeader>

				{message && <DialogBody>{message}</DialogBody>}

				<DialogFooter>
					<Button
						variant="outline"
						disabled={loading}
						onClick={handleCancel}
					>
						{cancelText}
					</Button>

					<Button
						variant={confirmVariant}
						loading={loading}
						onClick={handleConfirm}
					>
						{confirmText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ConfirmDialog;
