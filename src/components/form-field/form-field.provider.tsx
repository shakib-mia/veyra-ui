import { createContext, useContext, type ReactNode } from "react";

import type { FieldValues, UseFormReturn } from "react-hook-form";

interface FormSchemaContextValue {
	schema: unknown;
}

const FormSchemaContext = createContext<FormSchemaContextValue | null>(null);

export interface FormProviderProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	schema: unknown;
	children: ReactNode;
}

export function FormProvider<TFieldValues extends FieldValues>({
	form,
	schema,
	children,
}: FormProviderProps<TFieldValues>) {
	return (
		<FormSchemaContext.Provider value={{ schema }}>
			{children}
		</FormSchemaContext.Provider>
	);
}

export function useFormSchema(): unknown {
	const context = useContext(FormSchemaContext);

	if (!context) {
		throw new Error("useFormSchema must be used inside FormProvider");
	}

	return context.schema;
}
