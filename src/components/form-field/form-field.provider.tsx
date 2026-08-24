import {
	FormProvider as RHFFormProvider,
	type FieldValues,
	type UseFormReturn,
} from "react-hook-form";

import { FormSchemaContext } from "./form-field.context";

import type { z } from "zod";
import type { ReactNode } from "react";

export interface FormProviderProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	schema: z.ZodTypeAny;
	children: ReactNode;
}

export function FormProvider<TFieldValues extends FieldValues>({
	form,
	schema,
	children,
}: FormProviderProps<TFieldValues>) {
	return (
		<FormSchemaContext.Provider value={{ schema }}>
			<RHFFormProvider {...form}>{children}</RHFFormProvider>
		</FormSchemaContext.Provider>
	);
}
