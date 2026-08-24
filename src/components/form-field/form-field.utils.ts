import { z } from "zod";

export const getFieldSchema = (
	schema: z.ZodTypeAny,
	name: string,
): z.ZodTypeAny | undefined => {
	if (!(schema instanceof z.ZodObject)) {
		return undefined;
	}

	return schema.shape[name] as z.ZodTypeAny | undefined;
};

export const isFieldRequired = (
	schema: z.ZodTypeAny,
	name: string,
): boolean => {
	const fieldSchema = getFieldSchema(schema, name);

	if (!fieldSchema) {
		return false;
	}

	return !fieldSchema.isOptional();
};
