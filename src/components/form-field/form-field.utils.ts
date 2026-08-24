import { z } from "zod";
export const getFieldSchema = (
	schema: z.ZodType,
	name: string,
): z.ZodType | undefined => {
	if (!(schema instanceof z.ZodObject)) {
		return undefined;
	}
	return schema.shape[name] as z.ZodType | undefined;
};
export const isFieldRequired = (schema: z.ZodType, name: string): boolean => {
	const fieldSchema = getFieldSchema(schema, name);
	if (!fieldSchema) {
		return false;
	}
	return !fieldSchema.isOptional();
};
