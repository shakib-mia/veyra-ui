import type { Control, FieldPath, FieldValues } from "react-hook-form";

export type FormFieldType =
	| "text"
	| "email"
	| "password"
	| "number"
	| "tel"
	| "url"
	| "search"
	| "file";

export interface FormFieldRenderProps<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
> {
	value: TFieldValues[TName];
	onChange: (...event: unknown[]) => void;
	onBlur: () => void;
	name: TName;
	ref: (instance: unknown) => void;
}

export interface FormFieldProps<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
> {
	name: TName;
	label?: string;
	control?: Control<TFieldValues>;
	type?: FormFieldType;
	textarea?: boolean;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	className?: string;
	id?: string;
	rows?: number;
	accept?: string;
	render?: (
		field: FormFieldRenderProps<TFieldValues, TName>,
	) => React.ReactNode;
}
