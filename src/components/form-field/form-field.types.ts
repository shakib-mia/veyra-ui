import type {
	FieldPath,
	FieldValues,
	ControllerRenderProps,
} from "react-hook-form";

export interface FormFieldOption {
	label: string;
	value: string;
}

export interface FormFieldRenderProps<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
> {
	value: ControllerRenderProps<TFieldValues, TName>["value"];
	onChange: ControllerRenderProps<TFieldValues, TName>["onChange"];
	onBlur: ControllerRenderProps<TFieldValues, TName>["onBlur"];
	name: ControllerRenderProps<TFieldValues, TName>["name"];
	ref: ControllerRenderProps<TFieldValues, TName>["ref"];
}

export interface FormFieldProps<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
> {
	name: TName;
	label?: string;

	control?: import("react-hook-form").Control<TFieldValues>;

	type?: "text" | "email" | "tel" | "number" | "password" | "file" | "select";

	textarea?: boolean;

	placeholder?: string;
	disabled?: boolean;
	required?: boolean;

	className?: string;
	id?: string;
	rows?: number;
	accept?: string;

	options?: FormFieldOption[];

	render?: (
		field: FormFieldRenderProps<TFieldValues, TName>,
	) => React.ReactNode;
}
