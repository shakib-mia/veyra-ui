import {
	Controller,
	useFormContext,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { useFormSchema } from "./use-form-schema";
import { isFieldRequired } from "./form-field.utils";
import type { FormFieldProps, FormFieldRenderProps } from "./form-field.types";
import { Textarea } from "../textarea";
import { Input } from "../input";
import { FileUpload } from "../file-upload";
import { Label } from "../label";
import { Select } from "../select";
export function FormField<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
>({
	name,
	label,
	control: controlProp,
	type = "text",
	textarea = false,
	placeholder,
	disabled = false,
	required: requiredProp,
	className,
	id,
	rows = 3,
	accept,
	options = [],
	render,
}: FormFieldProps<TFieldValues, TName>) {
	const formContext = useFormContext<TFieldValues>();
	const schema = useFormSchema();
	const control = controlProp ?? formContext.control;
	const generatedId = id ?? String(name);
	const schemaRequired = isFieldRequired(schema, String(name));
	const required = requiredProp ?? schemaRequired;
	return (
		<div className={`space-y-2 ${className ?? ""}`}>
			{" "}
			{label && (
				<Label htmlFor={generatedId}>
					{" "}
					{label}{" "}
					{required && (
						<span className="ml-1 text-red-500">*</span>
					)}{" "}
				</Label>
			)}{" "}
			<Controller
				name={name}
				control={control}
				render={({ field, fieldState }) => {
					const renderField: FormFieldRenderProps<
						TFieldValues,
						TName
					> = {
						value: field.value,
						onChange: field.onChange,
						onBlur: field.onBlur,
						name: field.name,
						ref: field.ref,
					};
					let fieldComponent: React.ReactNode;
					if (render) {
						fieldComponent = render(renderField);
					} else if (type === "file") {
						fieldComponent = (
							<FileUpload
								value={field.value ? [field.value] : []}
								onChange={(files) => field.onChange(files[0])}
								multiple={false}
								maxFiles={1}
								accept={accept}
								preview
								disabled={disabled}
							/>
						);
					} else if (type === "select") {
						fieldComponent = (
							<Select
								value={field.value}
								onChange={field.onChange}
								options={options}
								placeholder={
									placeholder ??
									`Select ${label?.toLowerCase()}`
								}
								isDisabled={disabled}
							/>
						);
					} else if (textarea) {
						fieldComponent = (
							<Textarea
								{...field}
								id={generatedId}
								placeholder={placeholder}
								rows={rows}
								disabled={disabled}
							/>
						);
					} else {
						fieldComponent = (
							<Input
								{...field}
								id={generatedId}
								type={type}
								placeholder={placeholder}
								disabled={disabled}
							/>
						);
					}
					return (
						<>
							{" "}
							{fieldComponent}{" "}
							{fieldState.error?.message && (
								<p className="text-sm text-red-500">
									{" "}
									{fieldState.error.message}{" "}
								</p>
							)}{" "}
						</>
					);
				}}
			/>{" "}
		</div>
	);
}
