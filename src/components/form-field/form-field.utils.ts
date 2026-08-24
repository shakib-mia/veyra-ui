import type { ZodObject, ZodType } from "zod";

export const getFieldSchema = (
	schema: ZodType,
	name: string,
): ZodType | undefined => {
	if (!(schema instanceof Object)) {
		return undefined;
	}

	const objectSchema = schema as ZodObject;

	return objectSchema.shape[name] as ZodType | undefined;
};

export const isFieldRequired = (schema: ZodType, name: string): boolean => {
	const fieldSchema = getFieldSchema(schema, name);

	if (!fieldSchema) {
		return false;
	}

	return !fieldSchema.isOptional();
};
