import { createContext } from "react";
import type { z } from "zod";

export interface FormSchemaContextValue {
	schema: z.ZodTypeAny;
}

export const FormSchemaContext = createContext<FormSchemaContextValue | null>(
	null,
);
