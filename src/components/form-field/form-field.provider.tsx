import { createContext, useContext, type ReactNode } from "react";

import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { ZodType } from "zod";

interface FormSchemaContextValue {
	schema: ZodType;
}

const FormSchemaContext = createContext<FormSchemaContextValue | null>(null);

export interface FormProviderProps<
	TFieldValues extends FieldValues,
	TSchema extends ZodType = ZodType,
> {
	form: UseFormReturn<TFieldValues>;
	schema: TSchema;
	children: ReactNode;
}

export function FormProvider<
	TFieldValues extends FieldValues,
	TSchema extends ZodType,
>({ form, schema, children }: FormProviderProps<TFieldValues, TSchema>) {
	return (
		<FormSchemaContext.Provider value={{ schema }}>
			{children}
		</FormSchemaContext.Provider>
	);
}

export function useFormSchema(): ZodType {
	const context = useContext(FormSchemaContext);

	if (!context) {
		throw new Error("useFormSchema must be used inside FormProvider");
	}

	return context.schema;
}
