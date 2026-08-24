import {
	FormProvider as RHFFormProvider,
	type FieldValues,
	type UseFormReturn,
} from "react-hook-form";
import type { ZodType } from "zod";

import { FormSchemaContext } from "./form-field.context";

interface FormProviderProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	schema: ZodType;
	children: React.ReactNode;
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
