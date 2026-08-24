import { createContext } from "react";
import type { ZodType } from "zod";

export interface FormSchemaContextValue {
	schema: ZodType;
}

export const FormSchemaContext = createContext<FormSchemaContextValue | null>(
	null,
);
